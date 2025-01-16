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
import lore1 from '../../public/assets/png_gif/lore1.png'
import lore2 from '../../public/assets/png_gif/lore2.png'
import lore3 from '../../public/assets/png_gif/lore3.png'
import lore4 from '../../public/assets/png_gif/lore4.png'
import lore5 from '../../public/assets/png_gif/lore5.png'
import lore6 from '../../public/assets/png_gif/lore6.png'
import lore7 from '../../public/assets/png_gif/lore7.png'
import lore8 from '../../public/assets/png_gif/lore8.png'
import lore9 from '../../public/assets/png_gif/lore9.png'
import lore10 from '../../public/assets/png_gif/lore10.png'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { BsFillSkipEndCircleFill } from "react-icons/bs";

export default function Home() {

    //PLAY O PAUSE MUSICA
    const [playing, setPlaying] = useState(false);

    const playSound = () => {
        setPlaying(true);
    };

    const pauseSound = () => {
        setPlaying(false);
    };

    function SkipButton() {
        const skip = useSkip();
        return <BsFillSkipEndCircleFill className='static' onClick={skip}>{"Skip"}</BsFillSkipEndCircleFill>;
      }


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
                            <h1 className='col-start-2 underline mb-4 text-purple-900'>Click the arrow to skip dialoge</h1>
                            <WindupChildren>
                            <SkipButton />
                                {"In the mysterious realm of the digital metaverse, an extraordinary phenomenon unfolded, giving birth to an exceptional NFT project called BoboVision. This remarkable collection of unique digital art pieces features a quirky and seemingly derpy character known as Bobo."}
                                <Image className='mx-auto' src={lore8}></Image>
                                {"Bobo, despite his clumsy and dorky exterior, hides a god-like secret within. Possessing an unparalleled understanding of the chaotic and unpredictable world of NFTs and cryptocurrency, Bobo has harnessed the power to amass degenerate gains that baffle even the most seasoned crypto enthusiasts."}
                                <Image className='mx-auto' src={lore6}></Image>                                {"The legend of Bobo began when he was discovered by a group of NFT degens, who were relentlessly hunting for the next big project. Drawn in by his peculiar appearance and a mysterious aura that seemed to surround him, they decided to mint the first-ever Bobo NFT. Little did they know, this simple action would unlock Bobo's hidden potential and forever change the course of the metaverse."}
                                <Image className='mx-auto' src={lore3}></Image>
                                {"As the collection gained popularity, the true power of Bobo became increasingly apparent. Those who held Bobos began to notice a drastic change in their fortunes. The seemingly innocuous character began to guide his followers to make daring and lucrative decisions, resulting in unbelievable gains that defied all logic and reason."}
                                <Image className='mx-auto' src={lore4}></Image>
                                {"Rumors spread far and wide, and the BoboVision project quickly became a beacon for NFT degens seeking fortune and glory. Intrigued by the tales of Bobo's seemingly supernatural abilities, they flocked to acquire these priceless tokens, hoping to secure a piece of the legend and share in Bobo's divine wisdom."}
                                <Image className='mx-auto' src={lore5}></Image>
                                {"Unbeknownst to many, the secret to Bobo's success lay in his god-like understanding of the complex forces that drive the NFT market. With an innate ability to predict trends, identify hidden gems, and navigate the treacherous world of digital assets, Bobo's power transcended that of any mere mortal."}
                                <Image className='mx-auto' src={lore9}></Image>
                                {"Yet, Bobo remained an enigma, his true origins shrouded in mystery. Some whispered that he was a digital manifestation of an ancient deity, long thought lost to the sands of time. Others believed he was the creation of a mastermind coder, who imbued him with the knowledge of a thousand lifetimes."}
                                <Image className='mx-auto' src={lore10}></Image>
                                {"No matter his origins, one thing was certain: Bobo had become an icon, a symbol of the unpredictable and exhilarating world of NFTs. His mere presence brought hope and excitement to the legions of degens who followed in his footsteps, eager to learn from his unparalleled wisdom and share in his legendary gains."}
                                <Image className='mx-auto' src={lore1}></Image>
                                {"And so, Bobo and his visionaries continued to thrive, a testament to the enduring allure of digital art, the relentless pursuit of fortune, and the enduring enigma that was Bobo. With each new piece of the collection, his legend only grew, solidifying his place as a true titan of the metaverse."}
                                <Image className='mx-auto' src={lore2}></Image>
                            </WindupChildren> 
                        </div>
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