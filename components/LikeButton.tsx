import React, { useState, useEffect } from 'react'
import { MdOutlineFavoriteBorder } from "react-icons/md";

import useAuthStore from "../store/authStore";

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({ likes, handleLike, handleDislike }: IProps) => {

  const [alreadyLiked, setAlreadyLiked] = useState(false)
  const { userProfile }: any = useAuthStore()
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id)

  useEffect(() => {
    if(filterLikes?.length > 0) {
      setAlreadyLiked(true)
    } else {
      setAlreadyLiked(false)
    }
  }, [filterLikes, likes])

  return (
    <div className='flex gap-6 ml-5'>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {alreadyLiked ? (
          <MdOutlineFavoriteBorder 
            onClick={handleDislike}
            className="text-xl md:text-2xl hover:text-gray-400" 
          />
        ) : (
          <MdOutlineFavoriteBorder 
            onClick={handleLike}
            className={`text-xl ${likes?.length ? 'text-[#7fd492]' : ''} md:text-2xl hover:text-gray-400`} 
          />
        )}
        <p className={`text-md font-semibold ${likes?.length ? 'text-[#7fd492]' : ''}`}>
          {likes?.length | 0}
        </p>
      </div>
    </div>
  )
}

export default LikeButton