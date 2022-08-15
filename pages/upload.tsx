import Head from "next/head";
import React, { useEffect, useState } from "react";
import { SanityAssetDocument } from "@sanity/client";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { topics } from "../utils/constants";
import { BASE_URL } from "../utils";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
          setWrongFileType(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);
      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`${BASE_URL}/api/post`, document);
      router.push("/");
    }
  };

  return (
    <div>
      <Head>
        <title>Tik Tik</title>
        <link
          rel="icon"
          href="data:image/png;base64,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"
        />
      </Head>
      <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
        <div className="bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center pt-6 p-14 w-[60%] ">
          <div className="">
            <div className="">
              <p className="text-2xl font-bold">Upload Video</p>
              <p className="text-md text-gray-400">
                Post A Video To Your Account
              </p>
            </div>
            <div className="border-4 border-gray-200 flex flex-col justify-center items-center w-[260px] h-[460px] mt-10 p-10 cursor-pointer hover:border-red-300 hover:bg-gray-300 border-dashed rounded-xl outline-none">
              {isLoading ? (
                <p className="">Uploading</p>
              ) : (
                <div className="">
                  {videoAsset ? (
                    <div className="">
                      <video
                        src={videoAsset.url}
                        loop
                        controls
                        className="rounded-xl h-[450px] mt-16 bg-black "
                      ></video>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center h-full justify-center">
                        <div className="flex flex-col items-center justify-center">
                          <p className="font-bold text-xl">
                            <FaCloudUploadAlt className="text-gray-300 text-3xl" />
                          </p>
                          <p className="text-xl font-semibold">Upload Video</p>
                        </div>
                        <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                          MP4 or WebM or ogg <br /> 720X1280 or higher <br /> Up
                          To 10 minutes <br /> Less Than 2GB
                        </p>
                        <p className="bg-[#F51997] text-center mt-10 rouned text-white text-md p-2 font-medium w-52 outline-none">
                          Select File
                        </p>
                      </div>
                      <input
                        type="file"
                        name="upload-video"
                        className="w-0 h-0"
                        onChange={uploadVideo}
                      />
                    </label>
                  )}
                </div>
              )}
              {wrongFileType && (
                <p className="text-xl mt-4 w-[250px] text-center text-red-400 font-semibold">
                  Please Select a Video File
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-10">
            <label className="font-medium text-md">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="outline-none border-2 border-gray-200 p-2 text-md rounded"
            />
            <label className="font-medium text-md">Choose a Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none border-2 border-gray-200 capitalize lg:p-4 p-2 rounded cursor-pointer text-md"
            >
              {topics.map((topic) => (
                <option
                  key={topic.name}
                  value={topic.name}
                  className="outline-none text-gray-700 text-md p-2 hover:bg-slate-300 capitalize bg-white"
                >
                  {topic.name}
                </option>
              ))}
            </select>
            <div className="flex gap-6 mt-10">
              <button
                type="button"
                className="border-gray-300 border-2 text-md rounded w-28 lg:w-44 outline-none p-2 font-medium"
                onClick={() => {}}
              >
                Discard
              </button>
              <button
                type="button"
                className="bg-[#F51997] text-white text-md rounded w-28 lg:w-44 outline-none p-2 font-medium"
                onClick={handlePost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
