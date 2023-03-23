import Head from 'next/head'
import Image from 'next/image'
import headgif from '../../public/assets/spinhead.gif'
import tvborder from '../../public/assets/tvborder.png'


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
          <div class="absolute inset-0 z-10 bg-no-repeat bg-center sm:bg-top bg-cover tv-border"></div>
        </div>
    </>
  )
}
