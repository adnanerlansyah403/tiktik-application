import React, { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Head from "next/head"

const MyApp = ({ Component, pageProps }: AppProps) => {

  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])
  
  if(isSSR) return null

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
        <Navbar />
        <Head>
          <title>TikTik</title>
        </Head>
        <div className='flex flex-col md:flex-row gap-3 md:gap-18 lg:gap-20'>
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            <Sidebar />
          </div>
          <div className='mt-4 relative -left-[10px] flex flex-col gap-10 overflow-auto h-[88vh] videos flex-auto'>
            <Component {...pageProps} />  
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default MyApp
