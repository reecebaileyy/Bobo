import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { Web3Button } from '@web3modal/react'
import { useState, useEffect, useRef } from 'react'
import { ethers } from 'ethers'
import ReactHowler from "react-howler";
import { fetchBalance } from '@wagmi/core'
import { useContractWrite, usePrepareContractWrite, useAccount, usePrepareContractRead, useContractRead } from 'wagmi'
import ABI from '../abi/BoboABI.json'
import headgif from '../../public/assets/png_gif/spinhead.gif'
import BoboVision from '../../public/assets/png_gif/BoboVision2.png'
import twitter from '../../public/assets/png_gif/twitter.gif'
import lore from '../../public/assets/png_gif/lore.gif'
import protocol from '../../public/assets/png_gif/protocol.gif'
import chat from '../../public/assets/png_gif/chat.gif'
import profile from '../../public/assets/png_gif/Identification.gif'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import mint from '../../public/assets/png_gif/mint.gif'
import etherscan from '../../public/assets/png_gif/etherscan.gif'


export default function Home() {

    //PLAY O PAUSE MUSICA
    const [playing, setPlaying] = useState(false);

    const playSound = () => {
        setPlaying(true);
    };

    const pauseSound = () => {
        setPlaying(false);
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

                    <div className='z-0 grid-container absolute inset-x-0 bottom-10 py-10  h-4/5 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto'>
                        
                    </div>
                    <div className='sm:flex sm:flex-row'>
                        <ReactHowler playing={playing} pause={pauseSound} volume={0.05} src={["/assets/audio/bobo.mp3"]} />
                        {playing ? (
                            <button className="z-10 absolute bottom-0 right-0" onClick={pauseSound}>
                                <HiVolumeUp onClick={pauseSound} />
                            </button>
                        ) : (
                            <button className="z-10 absolute bottom-0 right-0" onClick={playSound}>
                                <HiVolumeOff onClick={playSound} />
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </>
    )

}