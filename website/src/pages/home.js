import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import headgif from '../../public/assets/spinhead.gif'
import BoboVision from '../../public/assets/BoboVisionheader.png'

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
        <div class='bg-gray-300 flex items-start justify-start tv-border'>
            <div className='fixed w-4/5 h-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between'>
                <Link href="/">
                    <Image className='' src={BoboVision} width={500} height={500}></Image>
                </Link>
                
                <div className='absolute inset-x-0 bottom-0 py-10 h-4/5 grid grid-cols-4 gap-4 bg-green-500'>
                    <div className='bg-blue-500'></div>
                    <div className='bg-blue-500'></div>
                    <div className='bg-blue-500'></div>
                    <div className='bg-blue-500'></div>
                    <div className='bg-blue-500'></div>
                </div>
            </div>
        </div>
    </div>

    </>
  )
  
}
