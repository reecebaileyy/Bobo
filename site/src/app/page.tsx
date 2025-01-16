// index.tsx
"use client";
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import { useState, useEffect } from "react";
import headgif from '../../public/assets/png_gif/spinhead.gif';
import loading from '../../public/assets/png_gif/loading.gif';
import BoboVision from '../../public/assets/png_gif/BoboVision_V3.png';

const IndexPage: NextPage = () => {
  const [loadingVisible, setLoadingVisible] = useState<boolean>(true);
  const [displayText, setDisplayText] = useState<string>('');
  const [fadeOutClass, setFadeOutClass] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOutClass('opacity-0');
      setDisplayText('> Enter');
    }, 7300);

    const fadeTimer = setTimeout(() => {
      setLoadingVisible(false);
    }, 7700);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <>
      <Head>
        <title>BoboVision</title>
        <meta name="description" content="Its all Bobo.. it always has been" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='overflow-hidden'>
        <div className='bg-gray-300 flex flex-col items-center justify-center tv-border'>
          <Image
            alt='Bobo Vision'
            className='mt-16'
            src={BoboVision}
            width={800}
            height={800}
          />
          <div className='flex justify-around sm:flex-col md:flex-col sm:items-center md:items-center sm:w-full md:w-full'>
            <Image
              alt="Bobo's Big ass head"
              className='sm:max-w-sm md:max-w-md'
              src={headgif}
              width={200}
              height={200}
            />
            {loadingVisible ? (
              <Image
                alt="Loading..."
                className={`transition-opacity duration-500 ${fadeOutClass}`}
                src={loading}
                width={500}
                height={400}
              />
            ) : (
              <Link href="/home" className="relative text-2xl font-black font-pressStart mt-20 mr-3">
                <span className="animate-flash">{displayText.slice(0, 1)}</span>
                {displayText.slice(1)}
              </Link>
            )}
            <Image
              alt="Bobo's big ass head"
              className='sm:hidden md:hidden'
              src={headgif}
              width={200}
              height={200}
            />
          </div>
          <div className="text-center">
            <h3 className="text-md font-pressStart">&copy; {new Date().getFullYear()} Bobo</h3>
            <h3 className="text-md font-pressStart">All rights reserved...</h3>
            <p className="text-xs font-pressStart">Because BOBO has FOMO</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
