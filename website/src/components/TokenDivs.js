import React, { useState, useEffect } from "react";
import { useContractRead, useAccount } from "wagmi";
import ABI from "../abi/BoboABI.json";
import Token from "./Token";

const TokenDivs = () => {
  const [tokenIds, setTokenIds] = useState([]);
  const { address } = useAccount();

  const { data: balanceOf } = useContractRead({
    address: "0x0D390E21A4a7568d7a1e9344C53EFa9f2Cc1866D",
    abi: ABI,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: tokensOfOwner } = useContractRead({
    address: "0x0D390E21A4a7568d7a1e9344C53EFa9f2Cc1866D",
    abi: ABI,
    functionName: "tokensOfOwner",
    args: [address],
    shouldExecute: balanceOf?.gt(0),
  });

  useEffect(() => {
    if (tokensOfOwner) {
      setTokenIds(tokensOfOwner);
    }
  }, [tokensOfOwner]);

  return (
    <>
      {tokenIds.map((tokenId) => (
        <Token key={tokenId} tokenId={tokenId} />
      ))}
    </>
  );
};

export default TokenDivs;
