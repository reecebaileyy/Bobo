import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { Web3Button } from '@web3modal/react'
import { useState } from 'react'
import { ethers } from 'ethers'
import { useContractWrite, usePrepareContractWrite, useAccount, usePrepareContractRead, useContractRead } from 'wagmi'
import ABI from '../abi/BoboABI.json'
import BoboVision from '../../public/assets/png_gif/BoboVision2.png'


export default function Profile() {

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
        overrides: { value: ethers.utils.parseEther(totalCost.toString()) }
    })
    const { data: mintData, isSuccess, write: mintNFT } = useContractWrite(config)

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

                    <div className='font-pressStart grid-container absolute inset-x-0 bottom-10 py-10  h-4/5 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-300 overflow-y-auto'>
                        
                    </div>

                </div>
            </div>
        </>
    )

}