# Deployment Steps

This basically demonstrates how to deploy using hardhat ignition :D 

## Run the following in terminal

### Step 1
```shell
cd hardhat
npm install
npx hardhat compile
```

### Step 2
Ensure that the deployer contract adress is pasted in place of "0xOwnersAddress" in ignition/modules/NFT.ts
```shell
npx hardhat ignition deploy ./ignition/modules/NFT.ts --network <your-network>
```

# Verification Steps

This step is optional and only needed if you want your NFT to be verified onchain.
```shell
npx hardhat verify --network <your-network> <contract-address> "My NFT Collection" "MYNFT" <owner-address>
```

