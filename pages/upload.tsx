import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from "react-icons/md"
import axios from 'axios'
import { SanityAssetDocument } from '@sanity/client'

import useAuthStore from '../store/authStore'
import { client } from "../utils/client"
import { topics } from '../utils/constants'
import { BASE_URL } from './../utils/index';
import format from "date-format"

const Upload = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
  const [wrongFileType, setWrongFileType] = useState(false)
  const [activeDiscard, setActiveDiscard] = useState(false)
  
  const [caption, setCaption] = useState('')
  const [topic, setTopic] = useState<String>(topics[0].name);
  const [savingPost, setSavingPost] = useState(false)

  const inputPostRef = useRef<HTMLInputElement>(null)

  const userProfile: any = useAuthStore((state) => state.userProfile);

  const router = useRouter()

  
  useEffect(() => {
    if (!userProfile) router.push('/');
  }, [userProfile, router]);

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    // uploading asset to sanity
    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setIsLoading(true);

      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });

        setActiveDiscard(false)
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && topic) {
      setSavingPost(true);

      const doc = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic,
        createdAt: format('yyyy-MM-dd hh:mm', new Date()),
        updatedAt: format('yyyy-MM-dd hh:mm', new Date()),
      };


      await axios.post(`${BASE_URL}/api/post`, doc);
        
      router.push('/');
    }
  };

  const handleDiscardPost = () => {
    if(videoAsset) {
      setVideoAsset(null)
    } else {
      setActiveDiscard(true)
    }
  }

  return (
    <div className='flex w-full h-full relative mb-10 py-6 lg:py-20 bg-[#F8F8F8] rounded justify-center'>
      <p className='absolute top-8 left-1/2 -translate-x-1/2 text-xl font-semibold text-poppins text-gray-600'>                       
        Share your {` `}
        <span className="text-green-400">
          daily activities
        </span> {` `}
         here 😎         
      </p>
      <div className="bg-white rounded-lg xl:h-[70vh] flex gap-6 p-4 px-5 mt-4">
        <div className="">
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">Post a video to your account</p>   
          </div>
          <div className='border-dashed border-4 rounded-xl border-gray-200 flex flex-col justify-center items-center outline-none mt-6 w-[260px] h-[480px] p-1 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      className='rounded-xl h-[462px] bg-black'
                      controls
                      loop
                      src={videoAsset.url}
                    />
                  </div>
                ) : (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col justify-center items-center'>
                        <p className='font-bold text-xl'>
                          <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                        </p>
                        <p className='text-xl font-semibold'>
                          Select video to upload
                        </p>
                      </div>

                      <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                        MP4 or WebM or ogg <br />
                        720x1280 resolution or higher <br />
                        Up to 10 minutes <br />
                        Less than 2 GB
                      </p>
                      <p className='bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                        Select file
                      </p>
                    </div>
                    <input
                      type='file'
                      name='upload-video'
                      onChange={(e) => uploadVideo(e)}
                      className='w-0 h-0'
                      id="uploadVideo"
                    />
                  </label>  
                )}
              </div>
            )}
            {wrongFileType && (
              <p className='text-red-400 text-center text-xl font-semibold mt-4 w-[250px]'>
                Wrong file type
              </p>
            )}
          </div>
        </div>
        
        <div className='flex flex-col gap-3 pb-10'>
          <label htmlFor="" className="text-md font-medium">
            Caption
          </label>          
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="rounded otuline-none text-md border-2 border-gray-200 p-2"
            />      
          <label htmlFor="" className="text-md font-medium">
            Choose a Topic
          </label>      
          <select name="" id="" onChange={(e) => setTopic(e.target.value)} className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer">
            {topics.map((topic: any, index) => (
              <option 
                key={topic.name} 
                value={topic.name}
                className="text-gray-700 text-md bg-white outline-none capitalize p-2 hover:bg-slate-300"
              >
                {topic.name}
              </option>
            ))}
          </select>   
          <div className="flex gap-6 mt-10">
              <button
                onClick={handleDiscardPost}
                type="button"
                className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none cursor-pointer hover:bg-gray-100 hover:text-black'
              >
                Discard
              </button>
              <button
                onClick={handlePost}
                type="button"
                className='bg-[#F51997] text-white border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none cursor-pointer hover:text-gray-300'
              >
                Post
              </button>
          </div>    
          {activeDiscard && (
            <>
               <p className="text-red-400 text-md">
                You still not upload the video
               </p>
            </>
          )}    
        </div>    
      </div>
    </div>
  )
}

export default Upload