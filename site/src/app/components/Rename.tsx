"use client";
import React, { useState, useEffect } from "react";
import { useReadContract, useAccount } from "wagmi";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { abi } from "../../../../hardhat/artifacts-zk/contracts/Boogers.sol/Boogers.json";
import ProfileToken from "./ProfileToken";

const Rename: NextPage = () => {
  const [tokenIds, setTokenIds] = useState<number[]>([]); // Token IDs as an array of numbers
  const { address } = useAccount();

  const { data: balanceOf } = useReadContract({
    address: "0x1F486199338EecA2E1e2aad555B9384e785efeCf",
    abi,
    functionName: "balanceOf",
    args: [address],
  }) as { data: bigint | undefined }; // Expecting `bigint` for balanceOf

  const { data: tokensOfOwner } = useReadContract({
    address: "0x1F486199338EecA2E1e2aad555B9384e785efeCf",
    abi,
    functionName: "tokensOfOwner",
    args: [address],
    // enabled: !!balanceOf && balanceOf > 0n, // Use the `enabled` property instead of `shouldExecute`
  }) as { data: number[] | undefined }; // Expecting an array of token IDs

  useEffect(() => {
    if (tokensOfOwner) {
      setTokenIds(tokensOfOwner);
    }
  }, [tokensOfOwner]);

  return (
    <>
      {tokenIds.map((tokenId) => (
        <ProfileToken key={tokenId} tokenId={tokenId} />
      ))}
    </>
  );
};

export default Rename;
