import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import TokenDivs from '../components/TokenDivs';
import { Web3Button } from '@web3modal/react'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useContractWrite, usePrepareContractWrite, useAccount, usePrepareContractRead, useContractRead } from 'wagmi'
import ABI from '../abi/BoboABI.json'
import BoboVision from '../../public/assets/png_gif/BoboVision2.png'
import headgif from '../../public/assets/png_gif/spinhead.gif'



export default function Profile() {

    // STORING USERS ADDRESS
    const { address } = useAccount()

    const { data: balanceOf } = useContractRead({
        address: '0x85dDe73b1a3a3a55F9147226D6c8AC07E33BD8C9',
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

<<<<<<< HEAD
                    <div className='z-0 grid-container absolute inset-x-0 bottom-10 py-10 h-4/5 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto'>
                        {
                            balance >= 100 ? (
                                <div className='font-pressStart text-sm'>Rank: <span>MEGA WHALE BOBO</span></div>
                            ) : balance >= 75 ? (
                                <div className='font-pressStart text-sm'>Rank: <span>Bag Holder Bobo</span></div>
                            ) : balance >= 50 ? (
                                <div className='font-pressStart text-sm'>Rank: <span>FOMO Bobo</span></div>
                            ) : balance >= 40 ? (
                                <div className='font-pressStart text-sm'>Rank: <span>Whale Bobo</span></div>
                            ) : balance >= 30 ? (
                                <div className='font-pressStart text-sm'>Rank: <span>Diamond Handz Bobo</span></div>
                            ) : balance >= 20 ? (
                                <div className='font-pressStart text-sm'>Rank: <span>Gold Bobo</span></div>
                            ) : balance >= 15 ? (
                                <div className='font-pressStart text-sm'>Rank: <span>Silver Bobo</span></div>
                            ) : balance >= 10 ? (
                                <div className='font-pressStart text-sm'>Rank: <span>Bronze Bobo</span></div>
                            ) : balance >= 5 ? (
                                <div className='font-pressStart text-sm'>Rank: <span className='animate-pulse'>Peasant Bobo</span></div>
                            ) : (
                                <div className='font-pressStart text-sm'>Rank: <span className='animate-flash'>Brokie Bobo</span></div>
                            )
                        }
                        <div className="col-span-4 sm:col-span-2 md:col-span-3 text-center font-bold text-xs font-pressStart">
                            You have {balance} Bobos... not counting yourself
                        </div>
                        <div className="col-span-4 sm:col-span-2 md:col-span-3"></div>
                        <TokenDivs />
=======
                    <div className='font-pressStart grid-container absolute inset-x-0 bottom-10 py-10  h-4/5 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-blue-300 overflow-y-auto'>
                        <Image
                            src={BoboVision}
                            alt='tset'
                            width={500}
                            height={500}
                        />
>>>>>>> parent of 888b57b (update)
                    </div>


                </div>
            </div>
        </>
    )

}