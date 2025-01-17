// home.tsx
"use client";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAccount, useDisconnect, useReadContract } from "wagmi";
import { getGeneralPaymasterInput } from "viem/zksync";
import { BigNumber } from "ethers";
import { parseEther } from 'viem'
import { abi } from "../../../../hardhat/artifacts-zk/contracts/Boogers.sol/Boogers.json";
import ReactHowler from "react-howler";
import headgif from "../../../public/assets/png_gif/spinhead.gif";
import BoboVision from "../../../public/assets/png_gif/BoboVision2.png";
import twitter from "../../../public/assets/png_gif/twitter.gif";
import lore from "../../../public/assets/png_gif/lore.gif";
import OSicon from "../../../public/assets/png_gif/OSicon.gif";
import chat from "../../../public/assets/png_gif/chat.gif";
import profile from "../../../public/assets/png_gif/Identification.gif";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import mintImage from "../../../public/assets/png_gif/mint.gif";
import etherscan from "../../../public/assets/png_gif/etherscan.gif";
import {
  useLoginWithAbstract,
  useWriteContractSponsored,
} from "@abstract-foundation/agw-react";

const HomePage: NextPage = () => {
  // ------------------ MISC ------------------
  const [playing, setPlaying] = useState<boolean>(false);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [mintAmount, setMintAmount] = useState<number>(0);
  const router = useRouter();

  const playSound = () => {
    setPlaying(true);
  };

  const pauseSound = () => {
    setPlaying(false);
  };

  const [hovered, setHovered] = useState(false);

  // ------------------ WAGMI HOOKS ------------------
  const { login } = useLoginWithAbstract();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { writeContractSponsoredAsync } = useWriteContractSponsored();

  const { data: maxSupplyData } = useReadContract({
    abi,
    address: "0x1F486199338EecA2E1e2aad555B9384e785efeCf",
    functionName: "_maxSupply",
  });

  const { data: isSaleActiveData } = useReadContract({
    abi,
    address: "0x1F486199338EecA2E1e2aad555B9384e785efeCf",
    functionName: "isSaleActive",
  });

  const { data: currentIndexData } = useReadContract({
    abi,
    address: "0x1F486199338EecA2E1e2aad555B9384e785efeCf",
    functionName: "totalSupply",
  });

  const { data: balanceOf, isPending: pendingBalanceOf } = useReadContract({
    abi,
    args: [address],
    address: "0x1F486199338EecA2E1e2aad555B9384e785efeCf",
    functionName: "balanceOf",
  });

  const maxSupply = maxSupplyData
    ? BigNumber.from(maxSupplyData).toString()
    : null;
  const isSaleActive = isSaleActiveData || false;
  const currentIndex = currentIndexData
    ? BigNumber.from(currentIndexData).toNumber()
    : null;

  // MINTING
  // Corrected mint function
  const mint = async () => {
    console.log("ABI:", abi);
    if (!address) return;
    try {
      const hash = await writeContractSponsoredAsync({
        abi,
        address: "0x1F486199338EecA2E1e2aad555B9384e785efeCf",
        functionName: "_mint",
        args: [mintAmount],
        value: balanceOf && BigNumber.from(balanceOf).gt(0) ? parseEther((mintAmount * 0.0069).toString()) : undefined,
        paymaster: "0x82e2b359fE20A4D02CC9Bd9AF859C7dBeFC6F7eB",
        paymasterInput: getGeneralPaymasterInput({
          innerInput: "0x",
        }),
      });
      console.log("Mint successful! Transaction hash:", hash);
    } catch (error) {
      console.error("Minting error:", error);
    }
  };

  // Reload page when currentIndex increases by 1
  useEffect(() => {
    if (
      currentIndex !== null &&
      prevIndex !== null &&
      currentIndex === prevIndex + 1
    ) {
      router.refresh(); // Reload the page
    }
    setPrevIndex(currentIndex);
  }, [currentIndex, prevIndex, router]);

  // CONTRACT ARGUMENTS FOR MINTING

  return (
    <>
      <Head>
        <title>BoboVision</title>
        <meta name="description" content="Its all Bobo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="tv-border bg-cover bg-center min-h-screen flex items-start justify-start">
        <div className="fixed w-4/5 h-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between">
          <div className="sm:hidden flex justify-between items-center">
            <div className="z-10 flex flex-col-reverse justify-center items-center">
              {isSaleActive ? (
                <h2 className="font-pressStart text-center">
                  {currentIndex || 0}/{maxSupply || "Loading..."} Bobos Minted
                </h2>
              ) : (
                <>
                  <p className="font-pressStart text-center text-xs animate-pulse">
                    Mint coming soon Bobos!!
                  </p>
                  <h2 className="font-pressStart text-center">Stay Tuned</h2>
                </>
              )}
              <Link className="" href="/">
                <Image
                  alt="BoboVision"
                  className="items-center"
                  src={BoboVision}
                  width={500}
                  height={500}
                />
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <Link href="/home">
                <Image
                  alt="BoboVision"
                  className="md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden"
                  src={BoboVision}
                  width={500}
                  height={500}
                />
              </Link>
              <button
                onClick={() => (address ? disconnect() : login())}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="bg-black ml-20 hover:bg-gray-800 text-white font-pressStart rounded px-6 py-2 transition-all"
              >
                {address
                  ? hovered
                    ? "Disconnect"
                    : `${address.substring(0, 6)}...${address.substring(
                        address.length - 4
                      )}`
                  : "Connect"}
              </button>
            </div>
          </div>
          <div className="z-10 gap-1 flex flex-col items-center md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden">
            <Link href="/">
              <Image
                alt="BoboVision"
                className=""
                src={BoboVision}
                width={500}
                height={500}
              />
            </Link>
            <button
              onClick={() => (address ? disconnect() : login())}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="bg-black hover:bg-gray-800 text-white font-pressStart rounded px-6 py-2 transition-all"
            >
              {address
                ? hovered
                  ? "Disconnect"
                  : `${address.substring(0, 6)}...${address.substring(
                      address.length - 4
                    )}`
                : "Connect"}
            </button>
          </div>
          {/* <div className="z-10 gap-1 flex flex-col items-center md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden">
            <Link href="/">
              <Image
                alt="BoboVision"
                className=""
                src={BoboVision}
                width={500}
                height={500}
              ></Image>
            </Link>
            <h2 className="font-pressStart text-center">
               Bobos Minted
            </h2>
          </div> */}
          <div className="z-0 grid-container absolute inset-x-0 bottom-10 py-10 h-4/5 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
            <div className="z-30 flex flex-col items-center">
              <div className="w-full flex justify-center">
                <button onClick={mint} className="focus:outline-none">
                  <Image
                    alt="Mint Medal"
                    src={mintImage}
                    className="w-44 sm:w-20 md:w-32 cursor-pointer"
                  />
                </button>
              </div>
              <div className="flex items-center justify-center mt-2">
                <button
                  className="bg-black text-white rounded-l-md px-3 py-1"
                  onClick={() => setMintAmount((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <input
                  className="z-50 bg-black rounded-none font-pressStart text-white text-center h-8 py-2"
                  min="1"
                  value={mintAmount}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!isNaN(value) && value >= 1) {
                      setMintAmount(value);
                    }
                  }}
                  style={{
                    width: `${Math.max(
                      45,
                      mintAmount.toString().length * 8
                    )}px`,
                    padding: "0 4px",
                    appearance: "none",
                    MozAppearance: "textfield",
                  }}
                />
                <button
                  className="bg-black text-white rounded-r-md px-3 py-1"
                  onClick={() => setMintAmount((prev) => Math.max(1, prev + 1))}
                >
                  +
                </button>
              </div>
            </div>

            {1 >= 1 ? (
              <div className="flex flex-col items-center">
                <Link href="/profile" className="flex flex-col items-center">
                  <Image
                    alt="Profile"
                    src={profile}
                    className="w-44 sm:w-20 md:w-32"
                  />
                  <h1 className="font-pressStart text-3xl sm:text-xl md:text-2xl mt-2">
                    Profile
                  </h1>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Link
                  href="/home"
                  onClick={() => {
                    window.alert("YOU NEED SOME BOBOS FIRST!!!!");
                  }}
                >
                  <Image
                    alt="Profile"
                    src={profile}
                    className="w-44 sm:w-20 md:w-32"
                  />
                  <h1 className="font-pressStart text-3xl sm:text-xl md:text-2xl mt-2">
                    Profile
                  </h1>
                </Link>
              </div>
            )}

            <div className="flex flex-col items-center">
              <Link href="/bobos" className="flex flex-col items-center">
                <Image
                  alt="Da Memes"
                  src={headgif}
                  className="w-44 sm:w-20 md:w-32"
                />
                <h1 className="font-pressStart text-3xl sm:text-xl md:text-2xl mt-2">
                  Bobos
                </h1>
              </Link>
            </div>

            <div className="flex flex-col items-center">
              <Link href="/chat">
                <Image
                  alt="Da Chat"
                  src={chat}
                  className="w-44 sm:w-20 md:w-32"
                />
                <h1 className="font-pressStart text-3xl sm:text-xl md:text-2xl mt-2 text-center">
                  Chat
                </h1>
              </Link>
            </div>

            <div className="flex flex-col items-center">
              <Link
                href="https://etherscan.io"
                target="_blank"
                className="flex flex-col items-center"
              >
                <Image
                  alt="Da Contract"
                  src={etherscan}
                  className="w-44 sm:w-20 md:w-32"
                />
                <h1 className="font-pressStart text-3xl sm:text-xl md:text-2xl mt-2">
                  Contract
                </h1>
              </Link>
            </div>

            <div className="flex flex-col items-center">
              <Link
                href="https://twitter.com/itsallbobo"
                target="_blank"
                className="flex flex-col items-center"
              >
                <Image
                  alt="Da Twitter"
                  src={twitter}
                  className="w-44 sm:w-20 md:w-32"
                />
                <h1 className="font-pressStart text-3xl sm:text-xl md:text-2xl mt-2">
                  Twitter
                </h1>
              </Link>
            </div>

            <div className="flex flex-col items-center">
              <Link href="/lore" className="flex flex-col items-center">
                <Image
                  alt="Bobo's big ass cranium"
                  src={lore}
                  className="w-44 sm:w-20 md:w-32"
                />
                <h1 className="font-pressStart text-3xl sm:text-xl md:text-2xl mt-2">
                  Lore
                </h1>
              </Link>
            </div>

            <div className="flex flex-col items-center">
              <Link href="/" className="flex flex-col items-center">
                <Image
                  alt="BoboVision"
                  src={OSicon}
                  className="w-44 sm:w-20 md:w-32"
                />
                <h1 className="font-pressStart text-3xl sm:text-xl md:text-2xl mt-2">
                  Opensea
                </h1>
              </Link>
            </div>
          </div>

          <div className="sm:flex sm:flex-row">
            <ReactHowler
              playing={playing}
              src={["/assets/audio/bobo.mp3"]}
              volume={0.5}
            />
            {playing ? (
              <button
                className="z-10 absolute bottom-0 right-0"
                onClick={pauseSound}
              >
                <HiVolumeUp />
              </button>
            ) : (
              <button
                className="z-10 absolute bottom-0 right-0"
                onClick={playSound}
              >
                <HiVolumeOff />
              </button>
            )}
            <p className="z-5 md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden font-pressStart text-center text-xs animate-pulse">
              1 free per wallet then 0.002 ETH
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
