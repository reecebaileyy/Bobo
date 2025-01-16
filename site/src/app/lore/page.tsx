// lore.tsx
"use client";
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import { useState } from 'react';
import ReactHowler from "react-howler";
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { BsFillSkipEndCircleFill } from "react-icons/bs";
import { WindupChildren, useSkip } from "windups";
import BoboVision from '../../../public/assets/png_gif/BoboVision2.png';
import lore1 from '../../../public/assets/png_gif/lore1.png';
import lore2 from '../../../public/assets/png_gif/lore2.png';
import lore3 from '../../../public/assets/png_gif/lore3.png';
import lore4 from '../../../public/assets/png_gif/lore4.png';
import lore5 from '../../../public/assets/png_gif/lore5.png';
import lore6 from '../../../public/assets/png_gif/lore6.png';
import lore7 from '../../../public/assets/png_gif/lore7.png';
import lore8 from '../../../public/assets/png_gif/lore8.png';
import lore9 from '../../../public/assets/png_gif/lore9.png';
import lore10 from '../../../public/assets/png_gif/lore10.png';
import { useLoginWithAbstract } from '@abstract-foundation/agw-react';

const Lore: NextPage = () => {

  // PLAY OR PAUSE MUSIC
  const [playing, setPlaying] = useState<boolean>(false);

  const playSound = () => {
    setPlaying(true);
  };

  const pauseSound = () => {
    setPlaying(false);
  };

  function SkipButton() {
    const skip = useSkip();
    return (
      <BsFillSkipEndCircleFill className='static' onClick={skip} />
    );
  }

  // ABSTRACT HOOKS
  const { login, logout } = useLoginWithAbstract();

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
              onClick={login}
                className="bg-black ml-20 hover:bg-gray-800 text-white font-pressStart rounded px-6 py-2 transition-all"
              >
                Connect
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
            onClick={login}
                className="bg-black hover:bg-gray-800 text-white font-pressStart rounded px-6 py-2 transition-all"
              >
                Connect
              </button>
          </div>

          <div className='z-0 grid-container absolute inset-x-0 bottom-10 py-10 h-4/5 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto'>
            <div className='col-span-4 font-pressStart text-center'>
              <h1 className='col-start-2 underline mb-4 text-purple-900'>
                Click the arrow to skip dialogue
              </h1>
              <WindupChildren>
                <SkipButton />
                {"In the mysterious realm of the digital metaverse, an extraordinary phenomenon..."}
                <Image className='mx-auto' src={lore8} alt="lore8" />
                {"Bobo, despite his clumsy and dorky exterior, hides a god-like secret..."}
                <Image className='mx-auto' src={lore6} alt="lore6" />
                {"The legend of Bobo began when he was discovered by a group of NFT degens..."}
                <Image className='mx-auto' src={lore3} alt="lore3" />
                {"As the collection gained popularity, the true power of Bobo became increasingly apparent..."}
                <Image className='mx-auto' src={lore4} alt="lore4" />
                {"Rumors spread far and wide, and the BoboVision project quickly became a beacon..."}
                <Image className='mx-auto' src={lore5} alt="lore5" />
                {"Unbeknownst to many, the secret to Bobo's success lay in his god-like understanding..."}
                <Image className='mx-auto' src={lore9} alt="lore9" />
                {"Yet, Bobo remained an enigma, his true origins shrouded in mystery..."}
                <Image className='mx-auto' src={lore10} alt="lore10" />
                {"No matter his origins, one thing was certain: Bobo had become an icon..."}
                <Image className='mx-auto' src={lore1} alt="lore1" />
                {"And so, Bobo and his visionaries continued to thrive..."}
                <Image className='mx-auto' src={lore2} alt="lore2" />
              </WindupChildren>
            </div>
          </div>

          <div className='sm:flex sm:flex-row'>
            <ReactHowler
              playing={playing}
              src={["/assets/audio/lore.mp3"]}
              volume={0.05}
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

export default Lore;
