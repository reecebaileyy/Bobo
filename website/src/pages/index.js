import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { useState, useEffect } from "react";
import headgif from '../../public/assets/spinhead.gif'
import loading from '../../public/assets/loading.gif'
import BoboVision from '../../public/assets/BoboVision_V3.png'

export default function Home() {

  const [loadingVisible, setLoadingVisible] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const [fadeOutClass, setFadeOutClass] = useState('');


  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOutClass('opacity-0');
      setDisplayText('> Enter');
    }, 7300); // 7 seconds

    const fadeTimer = setTimeout(() => {
      setLoadingVisible(false);
    }, 7700); // 7.5 seconds (allow time for the fade effect)

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    }; // Cleanup timers when component is unmounted
  }, []);


  return (
    <>

      <Head>
        <title>Bobo</title>
        <meta name="description" content="Its all Bobo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="overflow-hidden">
        <div className="bg-gray-300 flex flex-col items-center justify-center tv-border">
          <Image className="mt-16" src={BoboVision} width={800} height={800}></Image>
          <div className="flex flex-col md:flex-row justify-around items-center w-full">
            <Image className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-4 md:mb-0" src={headgif} width={200} height={200}></Image>
            {loadingVisible ? (
              <Image
                className={`transition-opacity duration-500 ${fadeOutClass}`}
                src={loading}
                width={500}
                height={400}
              ></Image>
            ) : (
              <Link href="/home" className="text-2xl font-bold font-pressStart mt-20 md:mt-0 md:mr-3">
                <span className="animate-flash">{displayText.slice(0, 1)}</span>
                {displayText.slice(1)}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
  
}
