import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { io } from 'socket.io-client'
import { Web3Button } from '@web3modal/react'
import ReactHowler from "react-howler";
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { useState, useEffect, useRef } from 'react'
import { getAccount } from '@wagmi/core'
import { useAccount, useContractRead } from 'wagmi'
import BoboVision from '../../public/assets/png_gif/BoboVision2.png'
import ABI from '../abi/BoboABI.json'


export default function Chat() {

    // PLAY OR PAUSE MUSIC
    const [playing, setPlaying] = useState(false);

    const playSound = () => {
        setPlaying(true);
    };

    const pauseSound = () => {
        setPlaying(false);
    };


    // STORING USERS ADDRESS
    const { addy } = useAccount()

    const { data: balanceOf } = useContractRead({
        address: '0x0D390E21A4a7568d7a1e9344C53EFa9f2Cc1866D',
        abi: ABI,
        functionName: 'balanceOf',
        args: [addy],
    })
    const balance = balanceOf?.toNumber()



    // STORING USERS ADDRESS/ENS AS USERNAME
    const { address } = getAccount() ?? {};
    const [username, setUsername] = useState('Pleb');
    const usernameRef = useRef(username); // Create a ref to store the username
    const [message, setMessage] = useState('');
    console.log('account:', address); // Log the account value here



    // DISPLAY MESSAGES FUNCTIONALITY
    useEffect(() => {
        setUsername(address ? address : 'Pleb');
        usernameRef.current = address ? address : 'Pleb';
    }, [address]);

    const socketRef = useRef(); // Add this line to create a ref for the socket

    useEffect(() => {
        socketRef.current = io('https://bobo-chat.herokuapp.com/'); // Use the ref to store the socket object
        socketRef.current.on('receive-message', ({ username, message, balance }) => {
            displayMessage(username, message, balance);
        });

        // Clean up the socket connection when the component unmounts
        return () => {
            socketRef.current.disconnect();
        };
    }, []);


    useEffect(() => {
        const messageInput = document.getElementById('message-input');
        const form = document.getElementById('form');

        const handleSendMessage = (e) => {
            e.preventDefault();
            const message = messageInput.value;
            const username = usernameRef.current;
            const balanceValue = balance; // Get the balance value
            if (message === '') return;
            displayMessage(username, message, balanceValue); // pass the correct arguments to the displayMessage function
            socketRef.current.emit('send-message', { username, message, balance }); // Use the ref to access the socket object
            console.log(address);
            console.log(message);
            console.log(username);
            messageInput.value = '';
        };

        console.log(`balance: $(balance)`)

        form.addEventListener('submit', handleSendMessage);

        // Remove the event listener when the component unmounts
        return () => {
            form.removeEventListener('submit', handleSendMessage);
        };
    }, [address]);

    // CHAT SERVER LOGIC

    function getUsernameClassName(balance) {
        if (balance >= 100) {
            return 'text-red-500 animate-pulse';
        } else if (balance >= 75) {
            return 'text-yellow-300 animate-pulse';
        } else if (balance >= 50) {
            return 'text-red-500 animate-pulse';
        } else if (balance >= 40) {
            return 'text-blue-800 animate-pulse';
        } else if (balance >= 30) {
            return 'text-blue-400 animate-pulse';
        } else if (balance >= 20) {
            return 'text-yellow-300 animate-pulse';
        } else if (balance >= 15) {
            return 'text-slate-100 animate-pulse';
        } else if (balance >= 10) {
            return 'text-orange-700 animate-pulse';
        } else if (balance >= 5) {
            return 'text-lime-800 animate-pulse';
        } else {
            return 'text-yellow-800 animate-flash';
        }
    }
    


    function displayMessage(username, message, balance) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'mb-4';
    
        const userDiv = document.createElement('div');
        userDiv.textContent = username;
        userDiv.className = `font-pressStart text-xs mb-1 ${getUsernameClassName(balance)}`;
    
        const textDiv = document.createElement('div');
        textDiv.textContent = message;
        textDiv.className = 'font-pressStart break-words text-sm';
    
        messageContainer.append(userDiv);
        messageContainer.append(textDiv);
    
        const messageDisplay = document.getElementById('message-container');
        messageDisplay.append(messageContainer);
    
        // Scroll to the bottom of the message container
        messageDisplay.scrollTo(0, messageDisplay.scrollHeight);
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
                    <div id="message-container" className="col-span-4 w-4/5 max-w-6xl mb-4 overflow-y-auto flex flex-col">

                        </div>
                        <footer className="z-10 fixed bottom-0 w-full py-4">
                            <div className="flex justify-center">
                                <form id="form" className="w-full sm:w-4/5 sm:max-w-6xl flex items-center">
                                    <input
                                        type="text"
                                        id="message-input"
                                        className="z-20 font-pressStart w-full border-2 border-gray-300 rounded-l py-2 focus:border-blue-500 focus:outline-none"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        id="send-button"
                                        className="font-pressStart bg-black hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-r"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </footer>

                    </div>

                    <div className='sm:flex sm:flex-row'>
                        <ReactHowler playing={playing} pause={pauseSound} src={["/assets/audio/chat.mp3"]} />
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



