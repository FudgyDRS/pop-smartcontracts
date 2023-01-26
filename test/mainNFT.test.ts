import { assert } from "chai";
import { artifacts, contract } from "hardhat";
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
  });

  describe("#1 - Test normal NFT functions", async () => {
    it("Mint", async () => {
    });

    it("Burn", async () => {
    });

    it("TransferFrom", async () => {
    });

    it("SetBaseUri", async () => {
    });
  });

  describe("#2 - Test normal token functions", async () => {
    it("Mint", async () => {
    });

    it("Burn", async () => {
    });

    it("TransferFrom", async () => {
    });
  });

  describe("#3 - Test game contract", async () => {
    it("Playing the game", async () => {
    });

    it("Making claims", async () => {
    });
  });
});
