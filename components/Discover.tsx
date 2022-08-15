import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle =
    " xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center justify-center text-[#FF1997] cursor-pointer gap-2";

  const topicStyle =
    " xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center justify-center text-black cursor-pointer gap-2";

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold hidden m-3 mt-4 xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="font-bold text-2xl xl:text-md">{item.icon}</span>
              <span className="font-medium capitalize hidden xl:block text-md">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
