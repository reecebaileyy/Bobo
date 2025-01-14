import { HardhatUserConfig } from "hardhat/config";
import "@matterlabs/hardhat-zksync";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  zksolc: {
    settings: {
      // Note: This must be true to call NonceHolder & ContractDeployer system contracts
      enableEraVMExtensions: true,
    },
  },
  defaultNetwork: "abstractTestnet",
  networks: {
    abstractTestnet: {
      url: "https://api.testnet.abs.xyz",
      ethNetwork: "sepolia",
      zksync: true,
      verifyURL: "https://api-explorer-verify.testnet.abs.xyz/contract_verification",
    },
  },
};

export default config;
