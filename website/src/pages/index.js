import Head from 'next/head'
import Image from 'next/image'
import headgif from '../../public/assets/spinhead.gif'
import space from '../../public/assets/space.gif'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bobo</title>
        <meta name="description" content="Its all Bobo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className='overflow-hidden'>
            <div class='bg-gray-300 flex flex-col justify-center items-center tv-border'>
            <h1 className='font-bebas text-9xl animate-pulse'>BoboVision</h1>
            <h3 className='font-bebas text-4xl'></h3>
            <Image src={headgif} width={200} height={200}></Image>
            </div>
        </div>
    </>
  )
}
