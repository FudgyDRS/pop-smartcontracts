import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  // Get network data from Hardhat config (see hardhat.config.ts).
  const networkName = network.name;

  // Check if the network is supported.

  if (networkName === "testnet1" || networkName === "testnet2") {
    console.log(`Deploying to ${networkName} network...`);


    // Compile contracts.
    await run("compile");
    console.log("Compiled contracts...");

    // Deploy contracts.
    const TestNFT = await ethers.getContractFactory("TestNFT");
    const testNFT = await TestNFT.deploy(
      config.ERC721.Name[networkName],
      config.ERC721.Symbol[networkName],
      config.ERC721.Supply.Total[networkName]
    );

    // Wait for the contract to be deployed
    await testNFT.deployed();
    console.log(`TestNFT to ${testNFT.address}`);

    const NFTSale = await ethers.getContractFactory("NFTSale");

    const nftSale = await NFTSale.deploy(
      testNFT.address,
      config.ERC721.Supply.Reserve[networkName]
    );

    // Wait for the contract to be deployed
    await nftSale.deployed();
    console.log(`NFTSale to ${nftSale.address}`);

    // Transfer ownership of TestNFT to NFTSale contract
    let tx = await testNFT.transferOwnership(nftSale.address);
    await tx.wait();
    console.log(`Ownership of TestNFT transferred to ${nftSale.address}`);

  } else {
    console.log(`Deploying to ${networkName} network is not supported...`);
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
