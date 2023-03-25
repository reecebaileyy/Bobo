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
  <title>BoboVision</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="initial-scale=1,maximum-scale=3,minimum-scale=1,user-scalable=no" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
    crossorigin="anonymous"
  />
  <meta name="theme-color" content="#000000" />
  <meta name="fortmatic-site-verification" content="j93LgcVZk79qcgyo" />
  <meta property="og:title" content="Keungz" />
  <link rel="canonical" href="https://keungz.com/" />
  <meta name="description" content="Keungz is a superior and invulnerable ethnic group in web3." />
  <meta property="og:site_name" content="Keungz" />
  <meta property="og:url" content="https://keungz.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://keungz.com/images/preview_kubz.png" />
  <meta property="og:image:secure_url" content="https://keungz.com/images/preview_kubz.png" />
  <meta property="og:image:type" content="image/jpg" />
  <meta property="og:description" content="Keungz is a superior and invulnerable ethnic group in web3." />
  <meta property="og:image:alt" content="Keungz" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="Keungz" />
  <meta name="twitter:url" content="https://keungz.com/" />
  <meta name="twitter:description" content="Keungz is a superior and invulnerable ethnic group in web3." />
  <meta name="twitter:domain" content="keungz.com" />
  <meta name="twitter:image" content="https://keungz.com/images/preview_kubz.png" />
  <meta name="twitter:title" content="Keungz" />
  <meta name="twitter:image:src" content="https://keungz.com/images/preview_kubz.png" />
  <meta name="description" content="Its all Bobo.. it always has been" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.ico" />
</Head>

      
      <div className='overflow-hidden'>
        <div class='bg-gray-300 flex flex-col items-center justify-center tv-border'>
        <Image className='mt-16' src={BoboVision} width={800} height={800}></Image>
        <div className='flex justify-around sm:flex-col md:flex-col  sm:items-center md:items-center sm:w-full md:w-full'>
            <Image className='sm:max-w-sm md:max-w-md mb-4' src={headgif} width={200} height={200}></Image>
            {loadingVisible ? (
              <Image
                className={`transition-opacity duration-500 ${fadeOutClass}`}
                src={loading}
                width={500}
                height={400}
              ></Image>
            ) : (
              <Link href="/home" className="text-2xl font-black font-pressStart mt-20 mr-3">
                <span className="animate-flash">{displayText.slice(0, 1)}</span>
                {displayText.slice(1)}
              </Link>
            )}
            <Image className='sm:hidden md:hidden' src={headgif} width={200} height={200}></Image>
          </div>
          <div className="text-center mt-8 mb-4">
            <h3 className="text-md font-pressStart">&copy; {new Date().getFullYear()} Bobo</h3>
            <h3 className="text-md font-pressStart">All rights reserved.</h3>
          </div>
        </div>
      </div>
    </>
  )
  
}