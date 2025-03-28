import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFT = buildModule("BoogersModule", (m) => {
  const name = m.getParameter("name", "My NFT Collection");
  const symbol = m.getParameter("symbol", "MYNFT");
  const owner = m.getParameter("owner", "0xOwnersAddress");
  const nft = m.contract("NFT", [name, symbol, owner]);
  return { nft };
});

export default NFT;
