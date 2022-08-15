import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const router = useRouter();
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
    setSearchValue("");
  };
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="TikTik"
            layout="responsive"
          />
        </div>
      </Link>
      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 left-20 bg-white "
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder="Search For Accounts And Videos"
            className="bg-primary w-[300px] rounded-full md:top-0 md:w-[350px] p-3 md:text-md font-medium border-2 border-gray-200 focus:outline-none focus:border-gray-300  focus:border-2 "
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 top-4 border-l-2 border-gray-300 right-6 pl-4 text-2xl text-gray-400 "
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div className="">
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />
                {""}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full"
                    src={userProfile.image}
                    alt="profilePhoto"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2 shadow-md rounded-full"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("err")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
