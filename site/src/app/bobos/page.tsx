// bobos.tsx
"use client";
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import { useState } from 'react';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import ReactHowler from "react-howler";
import BoboVision from '../../../public/assets/png_gif/BoboVision2.png';
// import TokenDivs from '../components/TokenDivs';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { useLoginWithAbstract } from '@abstract-foundation/agw-react';


const Bobos: NextPage = () => {

  // PLAY OR PAUSE MUSIC
  const [playing, setPlaying] = useState<boolean>(false);

  const playSound = () => {
    setPlaying(true);
  };

  const pauseSound = () => {
    setPlaying(false);
  };

  // HELPER
  const [hovered, setHovered] = useState(false);

  // WAGMI HOOKS
  const { login, logout } = useLoginWithAbstract();

  const { disconnect } = useDisconnect();
  const { address } = useAccount();

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
            <div className='z-10 flex flex-col-reverse justify-center items-center'>
              <Link className='' href="/home">
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
                onClick={() => (address ? disconnect() : login())}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="bg-black ml-20 hover:bg-gray-800 text-white font-pressStart rounded px-6 py-2 transition-all"
              >
                {address
                  ? hovered
                    ? "Disconnect"
                    : `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
                  : "Connect"}
              </button>
            </div>
          </div>

          <div className='z-10 gap-1 flex flex-col items-center md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'>
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
              onClick={() => (address ? disconnect() : login())}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="bg-black hover:bg-gray-800 text-white font-pressStart rounded px-6 py-2 transition-all"
            >
              {address
                ? hovered
                  ? "Disconnect"
                  : `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
                : "Connect"}
            </button>
          </div>

          <div className='z-0 grid-container absolute inset-x-0 bottom-10 py-10  h-4/5 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto'>
            {/* <TokenDivs /> */}
          </div>

          <div className='sm:flex sm:flex-row'>
            <ReactHowler
              playing={playing}
              src={["/assets/audio/bobo.mp3"]}
              volume={0.05}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Bobos;
