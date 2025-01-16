// home.tsx
"use client";
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import ReactHowler from "react-howler";
import headgif from '../../../public/assets/png_gif/spinhead.gif';
import BoboVision from '../../../public/assets/png_gif/BoboVision2.png';
import twitter from '../../../public/assets/png_gif/twitter.gif';
import lore from '../../../public/assets/png_gif/lore.gif';
import OSicon from '../../../public/assets/png_gif/OSicon.gif';
import chat from '../../../public/assets/png_gif/chat.gif';
import profile from '../../../public/assets/png_gif/Identification.gif';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import mint from '../../../public/assets/png_gif/mint.gif';
import etherscan from '../../../public/assets/png_gif/etherscan.gif';
import { useLoginWithAbstract } from '@abstract-foundation/agw-react';

const HomePage: NextPage = () => {
  // PLAY OR PAUSE MUSIC
  const [playing, setPlaying] = useState<boolean>(false);

  const playSound = () => {
    setPlaying(true);
  };

  const pauseSound = () => {
    setPlaying(false);
  };

  // WAGMI HOOKS
  const { login, logout } = useLoginWithAbstract();
  const { address } = useAccount();
  

  // CONTRACT ARGUMENTS FOR MINTING
  const [mintAmount, setMintAmount] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  return (
    <>
      <Head>
        <title>BoboVision</title>
        <meta name="description" content="Its all Bobo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="tv-border bg-cover bg-center min-h-screen flex items-start justify-start">
        <div className='fixed w-4/5 h-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between'>
          <div className="sm:hidden flex justify-between items-center">
            <div className='z-10 flex flex-col-reverse justify-center items-center'>
              <p className='font-pressStart text-center text-xs animate-pulse'>
                Mint coming soon Bobos!!
              </p>
              <h2 className='font-pressStart text-center'>Stay Tuned</h2>
              <Link className='' href="/">
                <Image
                  alt='BoboVision'
                  className='items-center'
                  src={BoboVision}
                  width={500}
                  height={500}
                />
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <Link href="/">
                <Image
                  alt='BoboVision'
                  className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'
                  src={BoboVision}
                  width={500}
                  height={500}
                />
              </Link>
              <button
              onClick={login}
                className="bg-black ml-20 hover:bg-gray-800 text-white font-pressStart rounded px-6 py-2 transition-all"
              >
                Connect
              </button>
            </div>
          </div>

          <div className='z-10 gap-1 flex flex-col items-center md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'>
            <Link href="/">
              <Image
                alt='BoboVision'
                className=''
                src={BoboVision}
                width={500}
                height={500}
              />
            </Link>
            <button
            onClick={login}
                className="bg-black hover:bg-gray-800 text-white font-pressStart rounded px-6 py-2 transition-all"
              >
                Connect
              </button>
            <h2 className='font-pressStart text-center'>xxx/xxx Bobos Minted</h2>
          </div>

          <div className='z-0 grid-container absolute inset-x-0 bottom-10 py-10  h-4/5 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto'>
            <button className="z-30 flex flex-col items-center">
              <div className="w-full flex justify-center">
                <Image
                  alt="Bobo's Big Ass Cranium"
                  src={mint}
                  className="w-44 sm:w-20 md:w-32"
                />
              </div>
              <div className="flex items-center justify-center mt-2">
                <input
                  className="z-50 bg-black rounded-md font-pressStart text-white text-center"
                  type="number"
                  min="1"
                  value={mintAmount}
                  style={{
                    width: `${Math.max(45, mintAmount.toString().length * 8)}px`,
                    padding: '0 4px',
                  }}
                />
                <h1 className="font-pressStart text-3xl sm:text-xl md:text-2xl ml-2">
                  Mint
                </h1>
              </div>
            </button>

            {1 >= 1 ? (
              <div className='flex flex-col items-center'>
                <Link href="/profile" className="flex flex-col items-center">
                  <Image
                    alt='Profile'
                    src={profile}
                    className='w-44 sm:w-20 md:w-32'
                  />
                  <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Profile</h1>
                </Link>
              </div>
            ) : (
              <div className='flex flex-col items-center'>
                <Link
                  href="/home"
                  onClick={() => { window.alert("YOU NEED SOME BOBOS FIRST!!!!") }}
                >
                  <Image
                    alt='Profile'
                    src={profile}
                    className='w-44 sm:w-20 md:w-32'
                  />
                  <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Profile</h1>
                </Link>
              </div>
            )}

            <div className='flex flex-col items-center'>
              <Link href="/bobos" className="flex flex-col items-center">
                <Image
                  alt="Da Memes"
                  src={headgif}
                  className='w-44 sm:w-20 md:w-32'
                />
                <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Bobos</h1>
              </Link>
            </div>

            <div className='flex flex-col items-center'>
              <Link href='/chat'>
                <Image
                  alt='Da Chat'
                  src={chat}
                  className='w-44 sm:w-20 md:w-32'
                />
                <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2 text-center'>Chat</h1>
              </Link>
            </div>

            <div className='flex flex-col items-center'>
              <Link href="https://etherscan.io" target="_blank" className="flex flex-col items-center">
                <Image
                  alt='Da Contract'
                  src={etherscan}
                  className='w-44 sm:w-20 md:w-32'
                />
                <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Contract</h1>
              </Link>
            </div>

            <div className='flex flex-col items-center'>
              <Link href="https://twitter.com/itsallbobo" target="_blank" className="flex flex-col items-center">
                <Image
                  alt="Da Twitter"
                  src={twitter}
                  className='w-44 sm:w-20 md:w-32'
                />
                <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Twitter</h1>
              </Link>
            </div>

            <div className='flex flex-col items-center'>
              <Link href="/lore" className="flex flex-col items-center">
                <Image
                  alt="Bobo's big ass cranium"
                  src={lore}
                  className='w-44 sm:w-20 md:w-32'
                />
                <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Lore</h1>
              </Link>
            </div>

            <div className='flex flex-col items-center'>
              <Link href="/" className="flex flex-col items-center">
                <Image
                  alt="BoboVision"
                  src={OSicon}
                  className='w-44 sm:w-20 md:w-32'
                />
                <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Opensea</h1>
              </Link>
            </div>
          </div>

          <div className='sm:flex sm:flex-row'>
            <ReactHowler
              playing={playing}
              src={["/assets/audio/bobo.mp3"]}
              volume={0.5}
            />
            {playing ? (
              <button className="z-10 absolute bottom-0 right-0" onClick={pauseSound}>
                <HiVolumeUp />
              </button>
            ) : (
              <button className="z-10 absolute bottom-0 right-0" onClick={playSound}>
                <HiVolumeOff />
              </button>
            )}
            <p className='z-5 md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden font-pressStart text-center text-xs animate-pulse'>
              1 free per wallet then 0.002 ETH
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
