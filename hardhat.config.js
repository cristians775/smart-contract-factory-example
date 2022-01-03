require("dotenv").config();
require('@symblox/hardhat-abi-gen');
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require('@nomiclabs/hardhat-ethers');


const privateKey = process.env.PRIVATE_KEY || "01234567890123456789";
// infuraId is optional if you are using Infura RPC
const alchemyId = process.env.ALCHEMY_ID || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      // Alchemy
      url: `https://polygon-mumbai.g.alchemy.com/v2/${alchemyId}`,
      accounts: [privateKey]
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};