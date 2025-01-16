// profile.tsx
"use client";
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
// import Rename from '../components/Rename'; // <--- Make sure this is a .tsx file or has proper TS definitions
import ReactHowler from "react-howler";
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import BoboVision from '../../../public/assets/png_gif/BoboVision2.png';
import { useLoginWithAbstract } from '@abstract-foundation/agw-react';


const Profile: NextPage = () => {

  // PLAY OR PAUSE MUSIC
  const [playing, setPlaying] = useState<boolean>(false);

  const playSound = () => {
    setPlaying(true);
  };

  const pauseSound = () => {
    setPlaying(false);
  };

  // ABSTRACT HOOKS
  const { login, logout } = useLoginWithAbstract();

//   // USER'S ADDRESS
//   const { address } = useAccount();

//   const { data: balanceOf } = useContractRead({
//     address: '0x0D390E21A4a7568d7a1e9344C53EFa9f2Cc1866D',
//     abi: ABI,
//     functionName: 'balanceOf',
//     args: [address],
//   });
//   const balance = balanceOf?.toNumber() ?? 0;

//   const [nfts, setNfts] = useState<number[]>([]);

//   useEffect(() => {
//     if (balance) {
//       const tokenIds: number[] = [];
//       for (let i = 0; i < balance; i++) {
//         // If you actually need token IDs or something from the contract, you'd do a separate read here.
//         // For now, we’re just simulating 'balance' times.
//         tokenIds.push(i);
//       }
//       setNfts(tokenIds);
//     }
//   }, [balance]);

  return (
    <>
      <Head>
        <title>BoboVision</title>
        <meta name="description" content="Its all Bobo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='bg-gray-300 flex items-start justify-start tv-border'>
        <div className='fixed w-4/5 h-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between'>
          <div className="sm:hidden flex justify-between items-center">
            <Link className='' href="/home">
              <Image
                alt='BoboVision'
                className=''
                src={BoboVision}
                width={500}
                height={500}
              />
            </Link>
            <div className="flex flex-col items-center">
              <Link href="/home">
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

          <div className='z-10 flex flex-col items-center md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'>
            <Link href="/home">
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
          </div>

          <div className='z-0 grid-container absolute inset-x-0 bottom-10 py-10 h-4/5 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto'>
            {/* Rank logic */}
            {1 >= 100 ? (
              <div className='font-pressStart text-sm whitespace-nowrap'>
                Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden' />
                <span className='text-red-500 animate-pulse'>M</span>
                <span className='text-yellow-500 animate-pulse'>E</span>
                <span className='text-green-500 animate-pulse'>G</span>
                <span className='text-blue-500 animate-pulse'>A </span>
                <span className='text-indigo-500 animate-pulse'>W</span>
                <span className='text-purple-500 animate-pulse'>H</span>
                <span className='text-pink-500 animate-pulse'>A</span>
                <span className='text-red-400 animate-pulse'>L</span>
                <span className='text-yellow-400 animate-pulse'>E </span>
                <span className='text-green-400 animate-pulse'>B</span>
                <span className='text-blue-400 animate-pulse'>O</span>
                <span className='text-indigo-400 animate-pulse'>B</span>
                <span className='text-purple-400 animate-pulse'>O</span>
              </div>
            ) : 1 >= 75 ? (
              <div className='font-pressStart text-sm whitespace-nowrap'>
                Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden' />
                <span className='animate-pulse text-yellow-300'>B</span>
                <span className='animate-pulse text-blue-500'>a</span>
                <span className='animate-pulse text-red-500'>g </span>
                <span className='animate-pulse text-yellow-300'>H</span>
                <span className='animate-pulse text-blue-500'>o</span>
                <span className='animate-pulse text-red-500'>l</span>
                <span className='animate-pulse text-yellow-300'>d</span>
                <span className='animate-pulse text-blue-500'>e</span>
                <span className='animate-pulse text-red-500'>r </span>
                <span className='animate-pulse text-yellow-300'>B</span>
                <span className='animate-pulse text-blue-500'>o</span>
                <span className='animate-pulse text-red-500'>b</span>
                <span className='animate-pulse text-yellow-300'>o</span>
              </div>
            ) : 1 >= 50 ? (
              <div className='font-pressStart text-sm whitespace-nowrap'>
                Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br>
                <span className='animate-pulse text-red-500'>F</span>
                <span className='animate-pulse text-blue-500'>O</span>
                <span className='animate-pulse text-red-500'>M</span>
                <span className='animate-pulse text-blue-500'>O</span>
                <span className='animate-pulse text-red-500'> B</span>
                <span className='animate-pulse text-blue-500'>o</span>
                <span className='animate-pulse text-red-500'>b</span>
                <span className='animate-pulse text-blue-500'>o</span>
              </div>
            ) : 1 >= 40 ? (
              <div className='font-pressStart text-sm whitespace-nowrap'>
                Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br>
                <span className='animate-pulse text-blue-800'>Whale Bobo</span>
              </div>
            ) : 1 >= 30 ? (
              <div className='font-pressStart text-sm whitespace-nowrap'>
                Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br>
                <span className='animate-pulse text-blue-400'>Diamond Handz Bobo</span>
              </div>
            ) : 1 >= 20 ? (
              <div className='font-pressStart text-sm whitespace-nowrap'>
                Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br>
                <span className='animate-pulse text-yellow-300'>Gold Bobo</span>
              </div>
            ) : 1 >= 15 ? (
              <div className='font-pressStart text-sm whitespace-nowrap'>
                Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br>
                <span className='animate-pulse text-slate-100'>Silver Bobo</span>
              </div>
            ) : 1 >= 10 ? (
              <div className='font-pressStart text-sm whitespace-nowrap'>
                Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br>
                <span className='animate-pulse text-orange-700'>Bronze Bobo</span>
              </div>
            ) : 1 >= 5 ? (
              <div className='font-pressStart text-sm whitespace-nowrap'>
                Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br>
                <span className='animate-pulse text-lime-800'>Peasant Bobo</span>
              </div>
            ) : (
              <div className='font-pressStart text-sm whitespace-nowrap'>
                Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br>
                <span className='animate-flash text-yellow-800'>Brokie Bobo</span>
              </div>
            )}

            <div className="col-span-4 sm:col-span-2 md:col-span-3 text-center font-bold text-xs font-pressStart">
              You have {1} Bobos... not counting yourself
            </div>

            {/* Display some NFTs if needed
            {nfts.map((tokenId) => (
              <div key={tokenId} className='text-center font-pressStart text-xs'>
                NFT #{tokenId}
              </div>
            ))} */}

            {/* <Rename /> */}
          </div>

          <div className='sm:flex sm:flex-row'>
            <ReactHowler
              playing={playing}
              src={["/assets/audio/profile.mp3"]}
              volume={0.5}
            />
            {playing ? (
              <button className="absolute bottom-0 right-0" onClick={pauseSound}>
                <HiVolumeUp />
              </button>
            ) : (
              <button className="absolute bottom-0 right-0" onClick={playSound}>
                <HiVolumeOff />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
