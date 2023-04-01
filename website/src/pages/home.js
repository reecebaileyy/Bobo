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


    // STORING USERS ADDRESS
    const { address } = useAccount()

    // STORING THE USERS $$$
    const [totalMoney, setTotalMoney] = useState(0);
    useEffect(() => {
        const fetchUserBalance = async () => {
            if (address) {
                const balanceData = await fetchBalance({ address: address });
                if (balanceData.value) {
                    const balance = ethers.utils.formatEther(balanceData.value);
                    console.log('Fetched balance:', balance);
                    setTotalMoney(balance);
                } else {
                    console.error('Balance data is not available:', balanceData);
                }
            }
        };



        fetchUserBalance();
    }, [address]);


    //CONTRACT ARGUMENTS FOR MINTING
    const [mintAmount, setMintAmount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    //STORE USERS BALANCE
    const { data } = useContractRead({
        address: '0x0D390E21A4a7568d7a1e9344C53EFa9f2Cc1866D',
        abi: ABI,
        functionName: 'balanceOf',
        args: [address]
    })
    const balance = data?.toNumber()

    //RETRIEVE COST
    const { data: mintPrice } = useContractRead({
        address: '0x0D390E21A4a7568d7a1e9344C53EFa9f2Cc1866D',
        abi: ABI,
        functionName: 'cost',
    })
    const price = mintPrice?.toNumber()
    const priceInEther = price ? ethers.utils.formatEther(price) : "Loading...";

    //RETRIEVE COST
    const { data: maxAmount } = useContractRead({
        address: '0x0D390E21A4a7568d7a1e9344C53EFa9f2Cc1866D',
        abi: ABI,
        functionName: '_maxSupply',
    })
    const supply = maxAmount?.toNumber()

    //RETRIEVE COST
    const { data: currentAmount } = useContractRead({
        address: '0x0D390E21A4a7568d7a1e9344C53EFa9f2Cc1866D',
        abi: ABI,
        functionName: 'totalSupply',
    })
    const current = currentAmount?.toNumber()

    //USE CONTRACT WRITE
    const { config } = usePrepareContractWrite({
        address: '0x0D390E21A4a7568d7a1e9344C53EFa9f2Cc1866D',
        abi: ABI,
        functionName: '_mint',
        args: [mintAmount],
        overrides: { value: ethers.utils.parseEther(totalCost.toString()) }
    })
    const { data: mintData, isSuccess, write: mintNFT } = useContractWrite(config)

    const handleMint = () => {
        console.log('totalMoney:', totalMoney);
        console.log('totalCost:', totalCost);
        if (!address) {
            alert("First Connect, Then Bobo XD!!!");
        } else if (totalMoney < totalCost) {
            alert("YOU NEED MORE FUNDS BOBO!!");
        } else if (mintAmount > (supply - current)) {
            alert("TOO SLOW BOBOS ALL SOLD OUT.. GO SWEEP FCKIN BOBO");
        } else if (mintAmount == 0) {
            alert("Come Bobo on at least get one Bobo...");
        } else {
            mintNFT?.();
        }
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
                            <p className='font-pressStart text-center text-xs animate-pulse'>
                                1 free Bobo per wallet.. then after it's {priceInEther} ETH
                            </p>
                            <h2 className='font-pressStart text-center'>{current}/{supply} Bobos Minted</h2>
                            <Link className='' href="/">
                                <Image alt='BoboVision' className='items-center' src={BoboVision} width={500} height={500}></Image>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center">
                            <Link href="/">
                                <Image alt='BoboVision' className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden' src={BoboVision} width={500} height={500}></Image>
                            </Link>
                            <Web3Button className="ml-20" />
                        </div>
                    </div>

                    <div className='z-10 gap-1 flex flex-col items-center md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'>
                        <Link href="/">
                            <Image alt='BoboVision' className='' src={BoboVision} width={500} height={500}></Image>
                        </Link>
                        <Web3Button className="ml-20" />
                        <h2 className='font-pressStart text-center'>{current}/{supply} Bobos Minted</h2>
                    </div>

                    <div className='z-0 grid-container absolute inset-x-0 bottom-10 py-10  h-4/5 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto'>
                        <button

                            className="z-30 flex flex-col items-center"
                        >
                            <div className="w-full flex justify-center">
                                <Image
                                    alt="Bobo's Big Ass Cranium"
                                    src={mint}
                                    onClick={handleMint}
                                    className="w-44 sm:w-20 md:w-32"
                                />
                            </div>
                            <div className="flex items-center justify-center mt-2">
                                <input
                                    className="z-50 bg-black rounded-md font-pressStart text-white text-center"
                                    type="number"
                                    min="1"
                                    value={mintAmount}
                                    style={{
                                        width: `${Math.max(45, mintAmount.toString().length * 8)}px`,
                                        padding: '0 4px',
                                    }}
                                    onClick={(e) => e.preventDefault()}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        const inputValue = e.target.value;
                                        if (inputValue !== "") {
                                            const newMintAmount = parseInt(inputValue);
                                            setMintAmount(newMintAmount);
                                            if (balance == 0) {
                                                setTotalCost(newMintAmount * 0.008 - 0.008);
                                            } else {
                                                setTotalCost(newMintAmount * 0.008);
                                            }
                                        } else {
                                            setMintAmount(0);
                                        }
                                    }}
                                />

                                <h1 className="font-pressStart text-3xl sm:text-xl md:text-2xl ml-2">
                                    Mint
                                </h1>
                            </div>
                        </button>


                        {
                            balance >= 1 ? (
                                <div className='flex flex-col items-center'>
                                    <Link href="/profile" className="flex flex-col items-center">
                                        <Image alt='Profile' src={profile} className='w-44 sm:w-20 md:w-32' />
                                        <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Profile</h1>
                                    </Link>
                                </div>
                            ) : <div className='flex flex-col items-center'>
                                <Link href="https://www.opensea.io" target="_blank">
                                    <Image alt='Profile' src={profile} className='w-44 sm:w-20 md:w-32' />
                                    <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Profile</h1>
                                </Link>
                            </div>
                        }
                        <div className='flex flex-col items-center'>
                            <Link href="/" className="flex flex-col items-center">
                                <Image alt="Da Memes" src={headgif} className='w-44 sm:w-20 md:w-32' />
                                <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Search</h1>
                            </Link>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Link href='/chat'>
                                <Image alt='Da Chat' src={chat} className='w-44 sm:w-20 md:w-32' />
                                <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2 text-center'>Chat</h1>
                            </Link>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Link href="https://sepolia.etherscan.io/address/0x0d390e21a4a7568d7a1e9344c53efa9f2cc1866d#code" target="_blank" className="flex flex-col items-center">
                                <Image alt='Da Contract' src={etherscan} className='w-44 sm:w-20 md:w-32' />
                                <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Contract</h1>
                            </Link>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Link href="https://twitter.com/itsallbobo" target="_blank" className="flex flex-col items-center">
                                <Image alt="Da Twitter" src={twitter} className='w-44 sm:w-20 md:w-32' />
                                <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Twitter</h1>
                            </Link>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Link href="/" className="flex flex-col items-center">
                                <Image alt="Bobo's big ass cranium" src={lore} className='w-44 sm:w-20 md:w-32' />
                                <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Lore</h1>
                            </Link>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Link href="/" className="flex flex-col items-center">
                                <Image alt="BoboVision" src={protocol} className='w-44 sm:w-20 md:w-32' />
                                <h1 className='font-pressStart text-3xl sm:text-xl md:text-2xl mt-2'>Vision</h1>
                            </Link>
                        </div>
                    </div>
                    <div className='sm:flex sm:flex-row'>
                        <ReactHowler playing={playing} pause={pauseSound} src={["/assets/audio/nostalgia.mp3"]} />
                        {playing ? (
                            <button className="z-10 absolute bottom-0 right-0" onClick={pauseSound}>
                                <HiVolumeUp onClick={pauseSound} />
                            </button>
                        ) : (
                            <button className="z-10 absolute bottom-0 right-0" onClick={playSound}>
                                <HiVolumeOff onClick={playSound} />
                            </button>
                        )}
                        <p className='z-5 md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden font-pressStart text-center text-xs animate-pulse'>1 free per wallet then {priceInEther} ETH</p>
                    </div>
                </div>

            </div>
        </>
    )

}