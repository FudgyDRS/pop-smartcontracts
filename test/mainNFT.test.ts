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
const mainNFT = await MainNFT.new("PoP NFT", "POPNFT", { from: owner });
const mainToken = await MainToken.new("PoP Token", "POPTKN", { from: owner });
  
contract("Main NFT", ([owner, operator, ...users]) => {
  let mainGame;
  
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
    mainGame = await MainGame.new(mainNFT.contract._address, mainToken.contract._address, { from: owner });
  });

  describe("#1 - Normal behavior", async () => {
    it("Test fucntion #1", async () => {
    });

    it("Test fucntion #2", async () => {
    });

    it("Test fucntion #3", async () => {
    });
  });

  describe("#2 - Trades", async () => {
    it("Test fucntion #1", async () => {
    });

    it("Test fucntion #2", async () => {
    });
  });
});
