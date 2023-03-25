import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import headgif from '../../public/assets/spinhead.gif'
import BoboVision from '../../public/assets/BoboVision_V3.png'

export default function Home() {

  return (
    <>

      <Head>
        <title>Bobo</title>
        <meta name="description" content="Its all Bobo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      
      <div className='overflow-hidden'>
        <div class='bg-gray-300 flex flex-col items-center justify-center tv-border'>
        <Image className='mt-16' src={BoboVision} width={800} height={800}></Image>
        <div>
            <h1 className='font-bold font-pressStart'>What should i put here?</h1>
        </div>
          </div>
      </div>
    </>
  )
  
}
