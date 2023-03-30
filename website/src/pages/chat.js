import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { Web3Button } from '@web3modal/react'
import io from 'socket.io';
import ReactHowler from "react-howler";
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import BoboVision from '../../public/assets/png_gif/BoboVision2.png'




export default function Profile() {

    //PLAY O PAUSE MUSICA
    const [playing, setPlaying] = useState(false);

    const playSound = () => {
        setPlaying(true);
    };

    const pauseSound = () => {
        setPlaying(false);
    };

    //STORING USERS ADDRESS/ENS AS USERNAME
    const { account } = useAccount();
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);


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

                        <h2>Chat</h2>
                        <div>Username: {username}</div>
                        <div>
                            {messages.map((message, index) => (
                                <div key={index}>
                                    <strong>{message.username}: </strong>
                                    {message.message}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>

                    <div className='sm:flex sm:flex-row'>
                        <ReactHowler playing={playing} pause={pauseSound} src={["/assets/audio/profile.mp3"]} />
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



