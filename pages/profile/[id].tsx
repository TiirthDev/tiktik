import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";
import Head from "next/head";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;

  const [showUserVieos, setShowUserVieos] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);

  const videos = showUserVieos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVieos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    if (showUserVieos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showUserVieos, userLikedVideos, userVideos]);

  return (
    <div className="">
      <Head>
        <title>Tik Tik</title>
        <link
          rel="icon"
          href="data:image/png;base64,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"
        />
      </Head>
      <div className="w-full overflow-scroll">
        <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
          <div className=" w-16 h-16 md:w-32 md:h-32  ">
            <Image
              src={user.image}
              width={120}
              height={120}
              className="rounded-full"
              alt="user Profile"
              layout="responsive"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="flex gap-1 md:text-2xl  text-md font-bold text-primary lowercase justify-center items-center tracking-wider">
              {user.userName.replaceAll(" ", "")}
              <GoVerified className="text-blue-400" />
            </p>
            <p className="text-gray-400 text-xs capitalize md:text-xl ">
              {user.userName}
            </p>
          </div>
        </div>

        <div className="">
          <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full ">
            <p
              className={`text-xl font-semibold cursor-pointer mt-2 ${videos} `}
              onClick={() => setShowUserVieos(true)}
            >
              Videos
            </p>
            <p
              className={`text-xl font-semibold cursor-pointer mt-2 ${liked} `}
              onClick={() => setShowUserVieos(false)}
            >
              Liked
            </p>
          </div>
          <div className="flex gap-6 flex-wrap md:justify-start">
            {videosList.length > 0 ? (
              videosList.map((post: Video, idx: number) => (
                <VideoCard post={post} key={idx} />
              ))
            ) : (
              <NoResults
                text={`No ${showUserVieos ? "" : "Liked"} Videos Yet`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return { props: { data: res.data } };
};

export default Profile;
