import React, { useState, useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite, useAccount, usePrepareContractRead, useContractRead } from 'wagmi'
import ABI from '../abi/BoboABI.json'
import headgif from '../../public/assets/png_gif/spinhead.gif'
import Image from 'next/image';

const TokenDivs = () => {

    const [tokenCount, setTokenCount] = useState(0);
    const [divs, setDivs] = useState([]);
    const { address } = useAccount()
    const { data: balanceOf } = useContractRead({
        address: '0x85dDe73b1a3a3a55F9147226D6c8AC07E33BD8C9',
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


    useEffect(() => {
        // Generate divs based on the tokenCount
        const newDivs = [];
        for (let i = 0; i < tokenCount; i++) {
            newDivs.push(
                <div key={i} className="flex flex-col items-center">
                    <Image src={headgif} alt='Bobo NFT' />
                    Bobo #{i + 1}
                </div>
            );
        }
        setDivs(newDivs);
    }, [tokenCount]);

    return (
        <>
            {divs}
        </>
        
    );

}

export default TokenDivs;
