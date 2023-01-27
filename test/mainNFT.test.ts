import { assert, expect } from "chai";
import { artifacts, contract, ethers } from "hardhat";
import { BN, constants, expectEvent, expectRevert, ether, time, balance, send } from "@openzeppelin/test-helpers";
import { parseEther, formatUnits } from "ethers/lib/utils";
import { transferableAbortController } from "util";
//import { time } from "@nomicfoundation/hardhat-network-helpers";

const MainGame = artifacts.require("MainGame");
const MainNFT = artifacts.require("MainNFT");
const MainToken = artifacts.require("MainToken");




let users = new Array<String>(5);

  
contract("Main NFT", ([owner, operator, ...users]) => {
  
  let baseURI;
  let tokenURI;
  
  let maxSupply, totalSupply;

  let startTimestamp;
  let maxPerAddress;
  let maxPerTransaction;

  let beforeBalance, beforeBalanceOwner;
  let changedBalance, changedBalanceOwner;

  let _balance;
  let div10 = "10000000000";
  let div18 = "100000000000000000";
  let div10bn = BN(div10);
  let div18bn = BN(div18);


  before(async () => {
    const mainNFT = await MainNFT.new("PoP NFT", "POPNFT", { from: owner });
    const mainToken = await MainToken.new("PoP Token", "POPTKN", { from: owner });
    const mainGame = await MainGame.new(mainNFT.contract._address, mainToken.contract._address, { from: owner });

    await mainToken.grantMint(mainGame._address, { from: owner });
  });

  describe("#1 - Test normal NFT functions", async () => {
    it("Admin Mint", async () => {
      let totalSupply = await MainNFT.totalSupply({ from: owner })
      await MainNFT.mint(users[0], totalSupply, { from: owner });
      let balance = formatUnits(await MainNFT.balanceOf(owner, { from: owner }), 0);
      expect("1" == balance)

      expectRevert(await MainNFT.mint(users[0], totalSupply, { from: users[0] }), "");
    });

    it("Normal Mint", async () => {
      let totalSupply = await MainNFT.totalSupply({ from: owner })
      await MainNFT.mint({ from: users[0] });
      let balance = formatUnits(await MainNFT.balanceOf(owner, { from: users[0] }), 0);
      expect("1" == balance)

      expectRevert(await MainNFT.mint(users[0], totalSupply, { from: users[0] }), "");
    });

    it("Burn", async () => {
      await MainNFT.burn(0, { from: owner });
      expectRevert(await MainNFT.burn(1, { from: owner }), "ERC721: caller is not token owner or approved");
      await MainNFT.burn(1, { from: users[0] });
    });

    it("TransferFrom", async () => {
      let totalSupply = await MainNFT.totalSupply({ from: owner })
      await MainNFT.mint({ from: users[0] });
      let balance = formatUnits(await MainNFT.balanceOf(owner, { from: users[0] }), 0);
      expect("1" == balance)

      expectRevert(await MainNFT.transferFrom(users[0], users[1], totalSupply, { from: owner}), "ERC721: caller is not token owner or approved");
      await MainNFT.transferFrom(users[0], users[1], totalSupply, { from: users[0]});
      await MainNFT.ownerOf(totalSupply, { from: users[0] });
      expect(users[1] == await MainNFT.ownerOf(totalSupply, { from: users[0] }));
    });
  });

  describe("#2 - Test normal token functions", async () => {
    it("Mint", async () => {
      expectRevert(await MainNFT.mint(users[0], 20000, { from: users[0] }), "Ownable: caller is not the owner");
      MainNFT.mint(users[0], 20000, { from: owner })
      
      let balance = formatUnits(await MainToken.balanceOf(users[0], { from: users[0] }))
      expect(balance == "20000")
    });

    it("Burn", async () => {
      expectRevert(await MainNFT.burn(20000, { from: owner }), "ERC20: burn amount exceeds balance");
      await MainNFT.burn(10000, { from: users[0] })

      let balance = formatUnits(await MainToken.balanceOf(users[0], { from: users[0] }))
      expect(balance == "10000")
    });

    it("TransferFrom", async () => {
      expectRevert(await MainNFT.transferFrom(users[0], users[1], 10000, { from: owner }), "ERC20: insufficient allowance");
      await MainNFT.transferFrom(users[0], users[1], 10000, { from: users[0] })

      let balance = formatUnits(await MainToken.balanceOf(users[0], { from: users[0] }))
      expect(balance == "0")

      balance = formatUnits(await MainToken.balanceOf(users[0], { from: users[1] }))
      expect(balance == "10000")
    });
  });

  describe("#3 - Test game contract", async () => {
    it("Playing the game", async () => {
      await MainNFT.mint({ from: users[0] });
      await MainNFT.mint({ from: users[0] });
    });

    it("Making claims", async () => {
    });
  });
});
