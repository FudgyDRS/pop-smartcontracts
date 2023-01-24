import { assert } from "chai";
import { artifacts, contract } from "hardhat";
import { BN, constants, expectEvent, expectRevert, ether, time, balance, send } from "@openzeppelin/test-helpers";
import { parseEther, formatUnits } from "ethers/lib/utils";
import { transferableAbortController } from "util";
//import { time } from "@nomicfoundation/hardhat-network-helpers";

const MainNFT = artifacts.require("TestNFT");

let users = new Array<String>(5);
contract("Main NFT", ([owner, operator, ...users]) => {
  let mainNFT;
  let mockERC721Sale;
  let baseURI;
  let tokenURI;
  let n = 0;
  let maxSupply, maxReserveSupply, totalSupply;

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

  let beforeStake;
  let afterStake;

  before(async () => {
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
