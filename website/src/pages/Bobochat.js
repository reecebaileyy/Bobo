import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { Web3Button } from '@web3modal/react'
import { useState, useEffect, useRef } from 'react'
import { ethers } from 'ethers'
import { Howl, Howler } from 'howler';
import { useContractWrite, usePrepareContractWrite, useAccount, usePrepareContractRead, useContractRead } from 'wagmi'
import ABI from '../abi/BoboABI.json'
import headgif from '../../public/assets/png_gif/spinhead.gif'
import BoboVision from '../../public/assets/png_gif/BoboVision2.png'
import discord from '../../public/assets/png_gif/discord.gif'
import twitter from '../../public/assets/png_gif/twitter.gif'
import lore from '../../public/assets/png_gif/lore.gif'
import protocol from '../../public/assets/png_gif/protocol.gif'
import profile from '../../public/assets/png_gif/profile.gif'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';



export default function BoboChat() {
    return (
        <>

            <Head>
                <title>BoboVision</title>
                <meta name="description" content="Its all Bobo" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>Welcome to the homepage, you can signup here</h1>

        </>
    )

}