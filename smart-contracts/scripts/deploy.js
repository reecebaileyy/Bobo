const hre = require("hardhat");

async function main() {

  const Boogers = await hre.ethers.getContractFactory("Boogers");
  const lock = await Boogers.deploy();

  await lock.deployed();

  console.log("Smart Contract Deployed to: ", lock.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});