import React, { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import ABI from "../abi/BoboABI.json";
import Token from "./Token";

const TotalTokenDivs = () => {
  const [tokenIds, setTokenIds] = useState([]);

  const { data: totalSupply } = useContractRead({
    address: "0x0D390E21A4a7568d7a1e9344C53EFa9f2Cc1866D",
    abi: ABI,
    functionName: "totalSupply",
  });

  useEffect(() => {
    if (totalSupply) {
      const tokens = [];
      for (let i = 0; i < totalSupply.toNumber(); i++) {
        tokens.push(i);
      }
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

export default TotalTokenDivs;