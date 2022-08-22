import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import GoogleLogin from 'react-google-login'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';

const Sidebar = () => {

  const [showSidebar, setShowSidebar] = useState(true)

  const userProfile = false

  const normalLink = `flex items-center gap-3 hover:bg-primary py-3 justify-center md:justify-self-auto xl:justify-start cursor-pointer font-semibold text-[#f51997] rounded`


  return (
    <div className={`py-2 ${!showSidebar && 'px-2'} border-r-2 border-gray-100 xl:border-0 h-full`}>
      <div
        className='flex justify-center mb-3 xl:hidden text-2xl'
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle className='mt-4 cursor-pointer hover:text-gray-400 transition duration-300 ease' /> : <AiOutlineMenu className="cursor-pointer hover:text-gray-400 transition duration-300 ease" />}
      </div>
      {showSidebar && (
          <div className='xl:w-400 w-15 md:w-20 mb-10 flex flex-col items-center justify-center md:block'>
            <div className='xl:border-b-2 border-gray-200 xl:pb-4 hover:bg-primary xl:border-gray-300 px-2 py-2'>
              <Link href={'/'}>
                <div className={normalLink}>
                  <AiFillHome className='text-2xl' />
                  <span className='text-xl hidden xl:block'>
                    For You
                  </span>
                </div>
              </Link>
            </div>

            <Discover />  
            <SuggestedAccounts />
            <Footer />
          </div>
      )}
    </div>
  )
}

export default Sidebar