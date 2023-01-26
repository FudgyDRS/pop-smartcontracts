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
    const MainNFT = await ethers.getContractFactory("MainNFT");
    const MainToken = await ethers.getContractFactory("MainToken");
    const MainGame = await ethers.getContractFactory("MainGame");
    
    const mainNFT = await MainNFT.deploy(
      config.ERC721.Name[networkName],
      config.ERC721.Symbol[networkName]
    );

    const mainToken = await MainToken.deploy(
      config.ERC20.Name[networkName],
      config.ERC20.Symbol[networkName]
    );

    // Wait for the contracts to be deployed
    await mainNFT.deployed();
    console.log(`TestNFT to ${mainNFT.address}`);
    await mainToken.deployed();
    console.log(`TestNFT to ${mainToken.address}`);

    const mainGame = await MainGame.deploy(
      mainNFT.address,
      mainToken.address
    );

    await mainGame.deployed();
    console.log(`TestNFT to ${mainGame.address}`);

    // Set baseURI
    let tx = await mainNFT.setBaseURI("ipfs://Qmewtrq4SELrrmN1SAQV1y7WFcafGxhCdTdA2wZCEjRmre/");
    await tx.wait();
    console.log(`Base URI for PoP NFT set to "ipfs://Qmewtrq4SELrrmN1SAQV1y7WFcafGxhCdTdA2wZCEjRmre/"`);

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
