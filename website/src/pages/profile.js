import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import TokenDivs from '../components/TokenDivs';
import { Web3Button } from '@web3modal/react'
import ReactHowler from "react-howler";
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useContractWrite, usePrepareContractWrite, useAccount, usePrepareContractRead, useContractRead } from 'wagmi'
import ABI from '../abi/BoboABI.json'
import BoboVision from '../../public/assets/png_gif/BoboVision2.png'
import headgif from '../../public/assets/png_gif/spinhead.gif'



export default function Profile() {

    //PLAY O PAUSE MUSICA
    const [playing, setPlaying] = useState(false);

    const playSound = () => {
        setPlaying(true);
    };

    const pauseSound = () => {
        setPlaying(false);
    };


    // STORING USERS ADDRESS
    const { address } = useAccount()

    const { data: balanceOf } = useContractRead({
        address: '0x0D390E21A4a7568d7a1e9344C53EFa9f2Cc1866D',
        abi: ABI,
        functionName: 'balanceOf',
        args: [address],
    })
    const balance = balanceOf?.toNumber()

    const [nfts, setNfts] = useState([])

    useEffect(() => {
        if (balance) {
            const promises = []
            for (let i = 0; i < balance; i++) {
                promises.push(
                    balance
                )
            }
            Promise.all(promises).then((tokenUris) => {
                setNfts(tokenUris)
            })
        }
    }, [balance])


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
                        <Link className='' href="/">
                            <Image alt='BoboVision' className='' src={BoboVision} width={500} height={500}></Image>
                        </Link>
                        <div className="flex flex-col items-center">
                            <Link href="/">
                                <Image alt='BoboVision' className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden' src={BoboVision} width={500} height={500}></Image>
                            </Link>
                            <Web3Button className="ml-20" />
                        </div>
                    </div>
                    <div className='z-10 flex flex-col items-center md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'>
                        <Link href="/">
                            <Image alt='BoboVision' className='' src={BoboVision} width={500} height={500}></Image>
                        </Link>
                        <Web3Button className="ml-20" />
                    </div>

                    <div className='z-0 grid-container absolute inset-x-0 bottom-10 py-10 h-4/5 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto'>
                        {
                            balance >= 100 ? (
                                <div className='font-pressStart text-sm whitespace-nowrap'>Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br>
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
                            ) : balance >= 75 ? (
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
                                </div>) : balance >= 50 ? (
                                    <div className='font-pressStart text-sm whitespace-nowrap'>
                                        Rank:
                                        <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br>
                                        <span className='animate-pulse text-red-500'>F</span>
                                        <span className='animate-pulse text-blue-500'>O</span>
                                        <span className='animate-pulse text-red-500'>M</span>
                                        <span className='animate-pulse text-blue-500'>O</span>
                                        <span className='animate-pulse text-red-500'> B</span>
                                        <span className='animate-pulse text-blue-500'>o</span>
                                        <span className='animate-pulse text-red-500'>b</span>
                                        <span className='animate-pulse text-blue-500'>o</span>


                                    </div>
                                ) : balance >= 40 ? (
                                    <div className='font-pressStart text-sm whitespace-nowrap'>Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br><span className='animate-pulse text-blue-800'>Whale Bobo</span></div>
                                ) : balance >= 30 ? (
                                    <div className='font-pressStart text-sm whitespace-nowrap'>Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br><span className='animate-pulse text-blue-400'>Diamond Handz Bobo</span></div>
                                ) : balance >= 20 ? (
                                    <div className='font-pressStart text-sm whitespace-nowrap'>Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br><span className='animate-pulse text-yellow-300'>Gold Bobo</span></div>
                                ) : balance >= 15 ? (
                                    <div className='font-pressStart text-sm whitespace-nowrap'>Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br><span className='animate-pulse text-slate-100'>Silver Bobo</span></div>
                                ) : balance >= 10 ? (
                                    <div className='font-pressStart text-sm whitespace-nowrap'>Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br><span className='animate-pulse text-orange-700'>Bronze Bobo</span></div>
                                ) : balance >= 5 ? (
                                    <div className='font-pressStart text-sm whitespace-nowrap'>Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br><span className='animate-pulse text-lime-800'>Peasant Bobo</span></div>
                                ) : (
                                <div className='font-pressStart text-sm whitespace-nowrap'>Rank: <br className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'></br><span className='animate-flash text-yellow-800'>Brokie Bobo</span></div>
                            )
                        }
                        <div className="col-span-4 sm:col-span-2 md:col-span-3 text-center font-bold text-xs font-pressStart">
                            You have {balance} Bobos... not counting yourself
                        </div>
                        <div className="col-span-4 sm:col-span-2 md:col-span-3"></div>
                        <TokenDivs />
                    </div>

                    <div className='sm:flex sm:flex-row'>
                        <ReactHowler playing={playing} pause={pauseSound} src={["/assets/audio/profile.mp3"]} />
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




