import React, { useState, useEffect, useRef } from 'react'
import { Video } from '../types';
import { NextPage } from 'next';
import Image from "next/image"
import Link from "next/link"
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi"
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs"
import { GoVerified } from "react-icons/go"
import LikeButton from './LikeButton';
import useAuthStore from './../store/authStore';
import { BASE_URL } from './../utils/index';
import axios from "axios"
import { BiCommentDetail } from 'react-icons/bi';
import timeDiff from "time-diff-for-humans"


interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  
  const [posted, setPosted] = useState(post);
  const [isHover, setIsHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)

  const { userProfile }: any = useAuthStore();

  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    if(videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    } 
  }, [posted, isVideoMuted])
  
  const onVideoPress = () => {
    if(playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  const handleLike = async (like: boolean) => {
    console.log("test")
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/post/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      });
      setPosted({ ...post, likes: res.data.likes });
    }
  };

  return (
    <div className='relative -left-[5px]flex flex-col border-[2px] border-gray-200 pb-6 rounded-md'>
      <div className=''>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-13 md:h-13 w-10 h-10">
            <Link href={`/profile/${post.postedBy?._id}`}>
                <>
                  <Image
                    width={50}
                    height={50}
                    className=' rounded-full'
                    src={post.postedBy?.image}
                    alt='user-profile'
                    layout='responsive'
                  />
                </>
            </Link>
          </div>
          <div className="mt-2">
            <Link href={`/profile/${post.postedBy?._id}`}>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {post.postedBy?.userName} {` `}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                  {post.postedBy?.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className='flex gap-4 relative mt-2'>
        <div 
          onMouseEnter={() => {setIsHover(true)}}
          onMouseLeave={() => {setIsHover(false)}}
          className='relative w-[100%] h-[300px] md:h-[400px] cursor-pointer'>
          <Link href={`/detail/${post._id}`}>
            <video 
              ref={videoRef}
              loop
              controls
              className='w-[100%] h-[100%]'
              src={post.video.asset.url}
            >

            </video>
          </Link>

          {/* {isHover && (
            <div className="absolute bottom-0 cursor-pointer left-[50%] md:left-14 lg:left-0 flex gap-6 lg:justify-center w-full p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-white text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-white text-2xl lg:text-4xl' />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
                </button>
              )}
            </div>
          )} */}
        </div>
      </div>
      <div className="mt-6 md:mt-0 flex items-center gap-4">
        {userProfile && (
          <>
            <LikeButton 
              likes={posted.likes}
              handleLike={() => handleLike(true)}
              handleDislike={() => handleLike(false)}
            />
            <Link href={`/detail/${post._id}`}>
            <div className='flex gap-6'>
              <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
                <BiCommentDetail className="text-xl md:text-2xl hover:text-gray-400" />
                <p className="text-md font-semibold">
                  {posted.comments?.length | 0}                                                              
                </p>
              </div>
            </div>
            </Link>
          </>
        )}
      </div>

      <div className='mt-4 ml-6'>
       <p className='text-gray-500 font-semibold font-poppins'>
        {posted.createdAt ? timeDiff(posted.createdAt) : ''}
       </p>
      </div>

    </div>
  )
}

export default VideoCard