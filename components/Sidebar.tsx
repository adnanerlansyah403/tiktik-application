import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';
import useAuthStore from '../store/authStore';
const Sidebar: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState<Boolean>(true);
  const { pathname } = useRouter();
  const { fetchAllUsers, allUsers }: any = useAuthStore();

  const activeLink = 'flex justify-start w-full gap-3 hover:bg-primary p-3 cursor-pointer font-semibold text-[#7fd492] rounded';

  const normalLink = 'flex justify-start w-full gap-3 hover:bg-primary p-3 cursor-pointer font-semibold rounded';

  window.addEventListener("resize", function() {
    if(window.innerWidth >= 640) {
      setShowSidebar(true)
    }
  })

  return (
    <div className="flex flex-col items-center xl:w-400 w-20 h-full border-r-2 border-gray-100 xl:border-0">
      <div
        className='xl:hidden my-3 m-0 p-0 mr-2 text-xl'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className=' mb-10 p-3 xl:px-0'>
          <div className='flex flex-col items-center xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href='/'>
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='capitalize text-xl hidden xl:block'>
                  For You
                </span>
              </div>
            </Link>
          </div>
          
          <Discover />
          <SuggestedAccounts
          />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;