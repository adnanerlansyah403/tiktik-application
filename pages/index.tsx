import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import axios from 'axios'
import { Video } from '../types'
import VideoCard from './../components/VideoCard';
import NoResults from './../components/NoResults';
import { BASE_URL } from './../utils';

interface IProps {
  videos: Video[],
}

const Home = ({ videos }: IProps) => {

  const router = useRouter()
  const { topic }: string = router.query

  const toUpperCase = (e: any) => {
  }
  
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text={`No Videos with category ${topic[0].toUpperCase() + topic.substring(1)}`} />
      )}
    </div>
  )
}

export const getServerSideProps = async ({
  query: { topic }
}: {
  query: { topic: string }
}) => {
  let response = null;

  if(topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: response.data
    }
  }
}

export default Home
