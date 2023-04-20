require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

module.exports = {
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url: process.env.INFURA_SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./@contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    apiKey: {
      goerli: process.env.API_KEY
    }
  }
}