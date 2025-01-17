import { HardhatUserConfig } from "hardhat/config";

import "@matterlabs/hardhat-zksync";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: "abstractTestnet",
  networks: {
    abstractTestnet: {
      url: "https://api.testnet.abs.xyz",
      ethNetwork: "sepolia",
      zksync: true,
      verifyURL:
        "https://api-explorer-verify.testnet.abs.xyz/contract_verification",
      chainId: 11124,
    },
    inMemoryNode: {
      url: "http://127.0.0.1:8011",
      ethNetwork: "localhost", // in memory node doesn't support eth node
      zksync: true,
    },
    hardhat: {
      zksync: true,
    },
  },
  zksolc: {
    version: "1.5.7",
    settings: {
      enableEraVMExtensions: true,
    },
  },
  etherscan: {
    apiKey: {
      abstractTestnet: "TACK2D1RGYX9U7MC31SZWWQ7FCWRYQ96AD",
    },
    customChains: [
      {
        network: "abstractTestnet",
        chainId: 11124,
        urls: {
          apiURL: "https://api-sepolia.abscan.org/api",
          browserURL: "https://sepolia.abscan.org/",
        },
      },
    ],
  },
  solidity: {
    version: "0.8.24",
  },
};

export default config;
