import Head from 'next/head'
import Sidebar from '../components/sidebar'
import Center from '../components/center';
import { getSession } from 'next-auth/react';
export default function Home() {
  return (
    <div className='h-screen overflow-hidden bg-black'>
      <Head>
        <title>spotifyPLayer</title>
      </Head>
      <main className='flex'>
        <Sidebar/>        
        <Center/>
      </main>
      <div className=''>
        {/* {player} */}        
      </div>
    </div>
  )
}

export async function getServerSideProps(context)
{
  const session = await getSession(context);
  return {
    props:{
      session
    }
  };
}
