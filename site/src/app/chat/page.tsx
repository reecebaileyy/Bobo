// chat.tsx
"use client";
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import { useAccount, useDisconnect } from 'wagmi';
import { io, Socket } from 'socket.io-client';
import ReactHowler from "react-howler";
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import BoboVision from '../../../public/assets/png_gif/BoboVision2.png';
import { useLoginWithAbstract } from '@abstract-foundation/agw-react';


const Chat: NextPage = () => {


  // PLAY OR PAUSE MUSIC
  const [playing, setPlaying] = useState<boolean>(false);

  const playSound = () => {
    setPlaying(true);
  };

  const pauseSound = () => {
    setPlaying(false);
  };

  const [hovered, setHovered] = useState(false);

  // WAGMI HOOKS
  const { login } = useLoginWithAbstract();

  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  // STORE USER'S ADDRESS
  //   const { address: addy } = useAccount();

  //   const { data: balanceOf } = useContractRead({
  //     address: '0x0D390E21A4a7568d7a1e9344C53EFa9f2Cc1866D',
  //     abi: ABI,
  //     functionName: 'balanceOf',
  //     args: [addy],
  //   });

  // STORING USER'S ADDRESS/ENS AS USERNAME
  //   const { address } = getAccount() ?? {};
  const [username, setUsername] = useState<string>('Brokie');
  const [newUsername, setNewUsername] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const usernameRef = useRef<string>(username);
  const [message, setMessage] = useState<string>('');

  // GET THE SOCKET REFERENCE
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    setUsername('Brokie');
    usernameRef.current = 'Brokie';
  }, []);

  useEffect(() => {
    usernameRef.current = username;
  }, [username]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const handleUsernameSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername(newUsername);
    usernameRef.current = newUsername;
    toggleModal();
  };

  //   function getUsernameClassName(): string {
  //     const balance = balanceOf?.toNumber() ?? 0;
  //     if (balance >= 100) {
  //       return 'text-red-500';
  //     } else if (balance >= 75) {
  //       return 'text-yellow-300';
  //     } else if (balance >= 50) {
  //       return 'text-red-500';
  //     } else if (balance >= 40) {
  //       return 'text-blue-800';
  //     } else if (balance >= 30) {
  //       return 'text-blue-400';
  //     } else if (balance >= 20) {
  //       return 'text-yellow-300';
  //     } else if (balance >= 15) {
  //       return 'text-slate-100';
  //     } else if (balance >= 10) {
  //       return 'text-orange-700';
  //     } else if (balance >= 5) {
  //       return 'text-lime-800';
  //     } else {
  //       return 'text-yellow-800';
  //     }
  //   }

  const [usernameClassName] = useState<string>('text-yellow-800');

  //   useEffect(() => {
  //     const newUsernameClassName = getUsernameClassName();
  //     setUsernameClassName(newUsernameClassName);
  //   }, [balanceOf]);

  function displayMessage(username: string, message: string, className: string) {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'mb-4';

    const userDiv = document.createElement('div');
    userDiv.textContent = username;
    userDiv.className = `font-pressStart text-xs mb-1 ${className}`;

    const textDiv = document.createElement('div');
    textDiv.textContent = message;
    textDiv.className = 'font-pressStart break-words text-sm';

    messageContainer.append(userDiv);
    messageContainer.append(textDiv);

    const messageDisplay = document.getElementById('message-container');
    if (messageDisplay) {
      messageDisplay.append(messageContainer);
      messageDisplay.scrollTo(0, messageDisplay.scrollHeight);
    }
  }

  useEffect(() => {
    socketRef.current = io('https://bobo-chat.herokuapp.com/');

    socketRef.current.on('receive-message', ({ username, message, colorClass }) => {
      displayMessage(username, message, colorClass);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const messageInput = document.getElementById('message-input') as HTMLInputElement | null;
    const form = document.getElementById('form') as HTMLFormElement | null;

    if (!messageInput || !form) return;

    const handleSendMessage = (e: Event) => {
      e.preventDefault();
      const msg = messageInput.value;
      const uname = usernameRef.current;
      const colorClass = usernameClassName;

      if (msg === '') return;
      displayMessage(uname, msg, colorClass);
      socketRef.current?.emit('send-message', { username: uname, message: msg, colorClass });
      messageInput.value = '';
    };

    form.addEventListener('submit', handleSendMessage);

    return () => {
      form.removeEventListener('submit', handleSendMessage);
    };
  }, [usernameClassName]);

  return (
    <>
      <Head>
        <title>BoboVision</title>
        <meta name="description" content="Its all Bobo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Username Change Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center'>
          <div className='bg-white p-4 rounded-lg shadow-lg'>
            <form onSubmit={handleUsernameSubmit} className='flex flex-col items-center'>
              <input
                type='text'
                placeholder='Enter your username'
                value={newUsername}
                onChange={handleUsernameChange}
                className='font-pressStart border-2 border-gray-300 rounded py-2 px-4 focus:border-blue-500 focus:outline-none'
              />
              <button
                type='submit'
                className='font-pressStart bg-black hover:bg-blue-600 text-white font-bold px-6 py-2 rounded mt-2'
              >
                Set Username
              </button>
            </form>
            <button onClick={toggleModal} className="mt-4 text-red-500">Close</button>
          </div>
        </div>
      )}

      <div className='bg-gray-300 flex items-start justify-start tv-border'>
        <div className='fixed w-4/5 h-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between'>
          <div className="sm:hidden flex justify-between items-center">
            <Link className='' href="/home">
              <Image
                alt='BoboVision'
                className=''
                src={BoboVision}
                width={500}
                height={500}
              />
            </Link>
            <div className="flex flex-col items-center">
              <Link href="/home">
                <Image
                  alt='BoboVision'
                  className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'
                  src={BoboVision}
                  width={500}
                  height={500}
                />
              </Link>
              <button
                onClick={() => (address ? disconnect() : login())}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="bg-black ml-20 hover:bg-gray-800 text-white font-pressStart rounded px-6 py-2 transition-all"
              >
                {address
                  ? hovered
                    ? "Disconnect"
                    : `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
                  : "Connect"}
              </button>
            </div>
          </div>

          <div className='z-10 flex flex-col items-center md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'>
            <Link href="/home">
              <Image
                alt='BoboVision'
                className=''
                src={BoboVision}
                width={500}
                height={500}
              />
            </Link>
            <button
              onClick={() => (address ? disconnect() : login())}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="bg-black hover:bg-gray-800 text-white font-pressStart rounded px-6 py-2 transition-all"
            >
              {address
                ? hovered
                  ? "Disconnect"
                  : `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
                : "Connect"}
            </button>
          </div>

          <div className='relative h-full grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-y-4 overflow-y-auto'>
            <div
              id="message-container"
              className="col-span-4 pb-8 sm:pb-14 w-full max-w-6xl overflow-y-auto flex flex-col"
              style={{ marginBottom: '100px' }}
            >
            </div>
            <footer className="absolute bottom-0 w-full bg-transparent">
              <div className="flex justify-center">
                <form id="form" className="w-full flex flex-col space-y-1 items-center px-4">
                  <input
                    type="text"
                    id="message-input"
                    className="font-pressStart w-full border-2 border-gray-300 rounded py-2 focus:border-blue-500 focus:outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    id="send-button"
                    className="font-pressStart bg-black hover:bg-blue-600 text-white font-bold px-6 py-2 rounded w-full"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-1/2"
                  >
                    Change Username
                  </button>
                </form>
              </div>
            </footer>
          </div>

          <div className='sm:flex sm:flex-row'>
            <ReactHowler
              playing={playing}
              src={["/assets/audio/chat.mp3"]}
              volume={0.5}
            />
            {playing ? (
              <button className="absolute bottom-0 right-0" onClick={pauseSound}>
                <HiVolumeUp />
              </button>
            ) : (
              <button className="absolute bottom-0 right-0" onClick={playSound}>
                <HiVolumeOff />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
