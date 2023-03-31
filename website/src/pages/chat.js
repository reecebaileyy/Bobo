import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { io } from 'socket.io-client'
import { Web3Button } from '@web3modal/react'
import ReactHowler from "react-howler";
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { useState, useEffect, useRef } from 'react'
import { getAccount } from '@wagmi/core'
import BoboVision from '../../public/assets/png_gif/BoboVision2.png'




export default function Chat() {

    // PLAY OR PAUSE MUSIC
    const [playing, setPlaying] = useState(false);

    const playSound = () => {
        setPlaying(true);
    };

    const pauseSound = () => {
        setPlaying(false);
    };

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
        socketRef.current.on('receive-message', ({ username, message }) => {
            displayMessage(username, message);
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
            if (message === '') return;
            displayMessage(username, message); // pass the correct arguments to the displayMessage function
            socketRef.current.emit('send-message', { username, message }); // Use the ref to access the socket object
            console.log(address);
            console.log(message);
            console.log(username);
            messageInput.value = '';
        };

        form.addEventListener('submit', handleSendMessage);

        // Remove the event listener when the component unmounts
        return () => {
            form.removeEventListener('submit', handleSendMessage);
        };
    }, [address]);

    // CHAT SERVER LOGIC


    function displayMessage(username, message) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'mb-4';

        const userDiv = document.createElement('div');
        userDiv.textContent = username;
        userDiv.className = 'font-pressStart text-blue-600 text-xs mb-1';

        const textDiv = document.createElement('div');
        textDiv.textContent = message;
        textDiv.className = 'font-pressStart break-words text-sm';

        messageContainer.append(userDiv);
        messageContainer.append(textDiv);

        document.getElementById('message-container').append(messageContainer);
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
                        <div id="message-container" className="col-span-4 6w-4/5 max-w-6xl mb-4">

                        </div>
                        <footer className="z-10 fixed bottom-0 w-full py-4">
                            <div className="flex justify-center">
                                <form id="form" className="w-full sm:w-4/5 sm:max-w-6xl flex items-center">
                                    <input
                                        type="text"
                                        id="message-input"
                                        className="font-pressStart w-full border-2 border-gray-300 rounded-l py-2 focus:border-blue-500 focus:outline-none"
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



