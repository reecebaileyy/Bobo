import React, { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { abi } from "../../../../hardhat/artifacts-zk/contracts/Boogers.sol/Boogers.json";
import Token from "./Token";

const TokenDivs: React.FC = () => {
  const [tokenIds, setTokenIds] = useState<number[]>([]); // Token IDs as an array of numbers

  const { data: totalSupply } = useReadContract({
    address: "0x1F486199338EecA2E1e2aad555B9384e785efeCf",
    abi,
    functionName: "totalSupply",
  }) as { data: bigint | undefined }; // `totalSupply` returns a bigint or undefined

  useEffect(() => {
    if (totalSupply) {
      const tokens: number[] = Array.from({ length: Number(totalSupply) }, (_, i) => i);
      setTokenIds(tokens);
    }
  }, [totalSupply]);

  return (
    <>
      {tokenIds.map((tokenId) => (
        <Token key={tokenId} tokenId={tokenId} />
      ))}
    </>
  );
};

export default TokenDivs;
