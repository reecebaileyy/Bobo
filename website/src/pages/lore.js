import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { Web3Button } from '@web3modal/react'
import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import ReactHowler from "react-howler";
import { fetchBalance } from '@wagmi/core'
import { useContractWrite, usePrepareContractWrite, useAccount, usePrepareContractRead, useContractRead } from 'wagmi'
import ABI from '../abi/BoboABI.json'
import { WindupChildren, useSkip } from "windups";
import BoboVision from '../../public/assets/png_gif/BoboVision2.png'
import { HiVolumeOff, HiVolumeUp, HiAcademicCap } from 'react-icons/hi';

function SkipButton({ skip }) {
    return (
      <button
        className="text-purple-700 absolute bottom-0 left-0"
        onClick={skip}
      >
        <HiAcademicCap/>
      </button>
    );
  }

export default function Home() {

    //PLAY O PAUSE MUSICA
    const [playing, setPlaying] = useState(false);

    const playSound = () => {
        setPlaying(true);
    };

    const pauseSound = () => {
        setPlaying(false);
    };

        const skip = useSkip();


      const [text, setText] = useState("");
      const [showImage, setShowImage] = useState(false);
      const [secondText, setSecondText] = useState("");
  
      useEffect(() => {
          setText(
              "In the mysterious realm of the digital metaverse, an extraordinary phenomenon unfolded, giving birth to an exceptional life form... This remarkable little guy has multiple personalities, outfits, and more features, allow us to introduce Bobo, a quirky and seemingly derpy character."
          );
      }, []);
  
      const onTextFinished = () => {
          setShowImage(true);
          setSecondText("Bobo, despite his clumsy and dorky exterior, hides a god-like secret within. Possessing an unparalleled understanding of the chaotic and unpredictable world of NFTs and cryptocurrency, Bobo has harnessed the power to amass degenerate gains that baffle even the most seasoned crypto enthusiasts.");
      };
  

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
                                <Image alt='BoboVision' className='items-center' src={BoboVision} width={500} height={500}></Image>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center">
                            <Link href="/home">
                                <Image alt='BoboVision' className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden' src={BoboVision} width={500} height={500}></Image>
                            </Link>
                            <Web3Button className="ml-20" />
                        </div>
                    </div>

                    <div className='z-10 gap-1 flex flex-col items-center md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'>
                        <Link href="/home">
                            <Image alt='BoboVision' className='' src={BoboVision} width={500} height={500}></Image>
                        </Link>
                        <Web3Button className="ml-20" />
                    </div>

                    <div className='z-0 grid-container absolute inset-x-0 bottom-10 py-10 h-4/5 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto'>
                        <div className='col-span-4 font-pressStart text-center'>
                        <h1 className='col-start-2 underline mb-4 text-purple-900'>Click the purple arrow to skip dialoge</h1>
                            <WindupChildren className='m-0 p-0' onFinished={onTextFinished}>
                            <SkipButton/>
                            {text} 
                            </WindupChildren>
                        </div>
                        {showImage ? (
                            <div className="col-span-4 flex justify-center">
                                <Image src="/assets/png_gif/BoboVision2.png" width={500} height={500} alt="Your image description" />
                            </div>
                        ) : (
                            <div className="col-span-4 flex justify-center">
                            </div>
                        )}

                        {onTextFinished ? (
                            <div className='col-span-4 font-pressStart text-center'>
                            <WindupChildren className='m-0 p-0'>
                            <SkipButton skip={skip}/>
                            {secondText} 
                            </WindupChildren>
                        </div>
                        ) : (
                            <div className="col-span-4 flex justify-center">
                            </div>
                        )}
                        
                    </div>

                    <div className='sm:flex sm:flex-row'>
                    
                        <ReactHowler playing={playing} pause={pauseSound} volume={0.05} src={["/assets/audio/lore.mp3"]} />
                        {playing ? (
                            <button className="absolute bottom-0 right-0" onClick={pauseSound}>
                                <HiVolumeUp onClick={pauseSound} />
                            </button>
                        ) : (
                            <button className="absolute bottom-0 right-0" onClick={playSound}>
                                <HiVolumeOff onClick={playSound} />
                            </button>
                        )}
                    </div>

                </div>
                

            </div>
        </>
    )

}