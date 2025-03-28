import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFT = buildModule("BoogersModule", (m) => {
  // Deploy the Boogers contract; no constructor parameters are needed.
  const nft = m.contract("NFT");
  return { nft };
});

export default NFT;
