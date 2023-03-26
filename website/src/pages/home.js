import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { Web3Button } from '@web3modal/react'
import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useAccount, usePrepareContractRead, useContractRead } from 'wagmi'
import ABI from '../abi/BoboABI.json'
import headgif from '../../public/assets/spinhead.gif'
import BoboVision from '../../public/assets/BoboVision2.png'
import discord from '../../public/assets/discord.gif'
import twitter from '../../public/assets/twitter.gif'
import lore from '../../public/assets/lore.gif'
import protocol from '../../public/assets/protocol.gif'
import space1 from '../../public/assets/space1.gif'
import { ethers } from 'ethers';




export default function Home() {

    // STORING USERS ADDRESS
    const { address } = useAccount()

    //CONTRACT ARGUMENTS FOR MINTING
    const [mintAmount, setMintAmount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    //USE CONTRACT READ
    const { data } = useContractRead({
        address: '0x85dDe73b1a3a3a55F9147226D6c8AC07E33BD8C9',
        abi: ABI,
        functionName: 'balanceOf',
        args: [address]
      })
      const balance = data?.toNumber()


    //USE CONTRACT WRITE
    const { config } = usePrepareContractWrite({
        address: '0x85dDe73b1a3a3a55F9147226D6c8AC07E33BD8C9',
        abi: ABI,
        functionName: '_mint',
        args: [mintAmount],
        overrides: {value: ethers.utils.parseEther(totalCost.toString())}
      })
      const { data: mintData, isSuccess, write: mintNFT } = useContractWrite(config)

  return (
    <>

    <Head>
        <title>BoboVision</title>
        <meta name="description" content="Its all Bobo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico"/>
    </Head>
      
    
        <div className='bg-gray-300 flex items-start justify-start tv-border'>
            <div className='fixed w-4/5 h-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between'>
                <div className="sm:hidden flex justify-between items-center">
                    <Link className='' href="/">
                        <Image alt='BoboVision' className='' src={BoboVision} width={500} height={500}></Image>
                    </Link>
                    
                    <input
                        type="number"
                        min="1"
                        value={mintAmount}
                        onChange={(e) => {
                            const newMintAmount = parseInt(e.target.value);
                            setMintAmount(newMintAmount);
                            if (balance?.() == 0) {
                                setTotalCost((newMintAmount * 0.008) - 0.008);

                            } else{
                                setTotalCost(newMintAmount * 0.008);
                            }
                        }}
                    />

                    <div className="flex flex-col items-center">
                        <Link href="/">
                            <Image alt='BoboVision' className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden' src={BoboVision} width={500} height={500}></Image>
                        </Link>
                        <Web3Button className="ml-20"/>
                    </div>
                </div>

                <div className='z-10 flex flex-col items-center md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'>
                    <Link href="/">
                        <Image alt='BoboVision' className='' src={BoboVision} width={500} height={500}></Image>
                    </Link>
                    <Web3Button className="ml-20"/>
                </div>
                
                <div className='grid-container absolute inset-x-0 bottom-10 py-10  h-4/5 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-300 overflow-y-auto'>
                    <button className='flex flex-col items-center'
                    onClick={() => mintNFT?.()}
                    >
                        <Image alt="Bobo's Big Ass Cranium" src={headgif} className='w-44 sm:w-20 md:w-32'/>
                        <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Mint</h1>
                    </button>
                    <div className='flex flex-col items-center'>
                        <Link href="https://twitter.com/itsallbobo" target="_blank" className="flex flex-col items-center">
                            <Image alt="Bobo's Twitter" src={twitter} className='w-44 sm:w-20 md:w-32'/>
                            <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Twitter</h1>
                        </Link>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Link href="/" className="flex flex-col items-center">
                            <Image alt='Da protocol' src={protocol} className='w-44 sm:w-20 md:w-32'/>
                            <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>About</h1>
                        </Link>
                    </div>
                    <div className='flex flex-col items-center'>                      
                        <Image alt='Da Lore' src={lore} className='w-44 sm:w-20 md:w-32'/>
                        <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Lore</h1>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Link href="/" className="flex flex-col items-center">
                            <Image alt='Da Discord' src={discord} className='w-44 sm:w-20 md:w-32'/>
                            <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Discord</h1>
                        </Link>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Link href="/" className="flex flex-col items-center">
                            <Image alt="Bobo's big ass cranium" src={headgif} className='w-44 sm:w-20 md:w-32'/>
                            <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Game1</h1>
                        </Link>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Link href="/" className="flex flex-col items-center">
                            <Image alt="Bobo's big ass cranium" src={headgif} className='w-44 sm:w-20 md:w-32'/>
                            <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Game2</h1>
                        </Link>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Link href="/" className="flex flex-col items-center">
                            <Image alt="Bobo's Big ass cranium" src={headgif} className='w-44 sm:w-20 md:w-32'/>
                            <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Game3</h1>
                        </Link>
                    </div>

                    <h1>balance: {balance}</h1>

                </div>
            </div>
        </div>
    </>
  )
  
}
