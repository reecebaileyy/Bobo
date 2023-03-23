import Head from 'next/head'
import Image from 'next/image'
import headgif from '../../public/assets/spinhead.gif'
import tvborder from '../../public/assets/tvborder.png'
import fuzz from '../../public/assets/fuzz.gif'

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
            <Image className='w-screen h-screen object-cover'src={fuzz}></Image>
            <div class="tv-border">
            </div>
        </div>
    </>
  )
}
