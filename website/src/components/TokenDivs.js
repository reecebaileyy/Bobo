import React, { useState, useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite, useAccount, usePrepareContractRead, useContractRead } from 'wagmi'
import ABI from '../abi/BoboABI.json'
import headgif from '../../public/assets/png_gif/spinhead.gif'
import Image from 'next/image';
import Link from "next/link";


const TokenDivs = () => {

    // FETCH THE TOKEN COUNT OF THE USER
    const [tokenCount, setTokenCount] = useState(0);
    const [divs, setDivs] = useState([]);
    const { address } = useAccount()
    const { data: balanceOf } = useContractRead({
        address: '0x0D390E21A4a7568d7a1e9344C53EFa9f2Cc1866D',
        abi: ABI,
        functionName: 'balanceOf',
        args: [address],
    })
    const balance = balanceOf?.toNumber()


    useEffect(() => {
        if (balance !== undefined) {
            setTokenCount(balance);
        }
    }, [balance]);

    const { data: tokenIds } = useContractRead({
        address: '0x0D390E21A4a7568d7a1e9344C53EFa9f2Cc1866D',
        abi: ABI,
        functionName: 'tokensOfOwner',
        args: [address],
        shouldExecute: tokenCount > 0,
    });



useEffect(() => {
    if (tokenIds) {
        const newDivs = tokenIds.map((tokenId) => {
            if (tokenId) { // check if tokenId is defined
                return (
                    <Link href={`https://opensea.io/assets/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/${tokenId}`} target="_blank" key={tokenId}>
                        <div className="flex flex-col items-center font-pressStart">
                            <Image src={headgif} alt='Bobo NFT' />
                            Bobo #{tokenId.toNumber()}
                        </div>
                    </Link>
                )
            } else {
                return null; // return null if tokenId is not defined
            }
        });
        setDivs(newDivs);
    }
}, [tokenIds]);


    return (
        <>
            {divs}
        </>

    );

}

export default TokenDivs;
