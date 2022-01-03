require("dotenv").config();
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Game items", function () {
  it("Should return all token's owner", async function () {
    
    const [owner, owner2, owner3] = await ethers.getSigners();
    const GameItemFactory = await ethers.getContractFactory("GameItemFactory");
    const gameItemContract = await ethers.getContractFactory("GameItem");
    const contract = await GameItemFactory.attach(process.env.CONTRACT_ADDRESS);

    const SWORD = 1;
    const SHIELD = 2;
    const BOW = 3;
    const RING = 4;

    const address = process.env.ADDRESS_ACCOUNT_1 || owner2.address;

    console.time("createNftCollection");
    await contract.createNftCollection(address, SWORD, 10);
    await contract.createNftCollection(address, SHIELD, 5);
    await contract.createNftCollection(address, BOW, 15);
    await contract.createNftCollection(address, RING, 15);
    console.timeEnd("createNftCollection");

    console.time("getCollectionByOwnerAddress");
    const ownerAddresses = await contract.getCollectionByOwnerAddress(address);
    console.timeEnd("getCollectionByOwnerAddress");

    console.time("getAnything");
    const urisData = await Promise.allSettled(
      ownerAddresses.map(async (address) => {
        const contract = await gameItemContract.attach(address);
        const data = await contract.uri(1);
        return data;
      })
    );
    console.timeEnd("getAnything");

    console.log(urisData);
  }).timeout(90000);
});
