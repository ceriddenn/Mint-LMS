import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/core/Header'
const Home = () => {
  return (
    <div className='flex flex-col' >
      <Head>
        <title>Mint LMS</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      
     <Header/>
    </div>
  )
}

export default Home
