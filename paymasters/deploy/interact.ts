import * as hre from "hardhat";
import { getWallet, LOCAL_RICH_WALLETS } from "./utils";
import { ethers, parseEther } from "ethers";
import { getPaymasterParams } from "zksync-ethers/build/paymaster-utils";

// Address of the contract to interact with
const CONTRACT_ADDRESS = "0x82e2b359fE20A4D02CC9Bd9AF859C7dBeFC6F7eB";
if (!CONTRACT_ADDRESS) throw "⛔️ Provide address of the contract to interact with!";

// An example of a script to interact with the contract
export default async function () {
  console.log(`Running script to interact with contract ${CONTRACT_ADDRESS}`);

  const wallet = getWallet();

  // 1. Send some ETH to the contract
  await (await wallet.sendTransaction({
    to: CONTRACT_ADDRESS,
    value: parseEther("0.05"),
  })).wait();

  console.log("Balance Before:", (await wallet.getBalance()).toString());

  // 2. Send an example txn utilizing our paymaster to cover the gas fees
  const tx = await wallet.sendTransaction({
    to: LOCAL_RICH_WALLETS[3].address,
    data: "0x69",
    customData: {
      paymasterParams: getPaymasterParams(
        CONTRACT_ADDRESS,
        {
          type: "General",
          innerInput: "0x",
        })
    }
  })

  const resp = await tx.wait();

  console.log("Balance Before:", (await wallet.getBalance()).toString());
  console.log(resp);
}
