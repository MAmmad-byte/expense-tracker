" use client";
import Image from "next/image";
import React, { useState } from "react";
import { SignOut } from "../signout";
import { User } from "next-auth";
interface Props{
    userInfo?:User
}
const Profile = ({userInfo}:Props) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Image
        onClick={() => setShow(!show)}
        className="border-2 border-green-500 rounded-full cursor-pointer"
        src={userInfo?.image ? userInfo.image :"/profile.svg"}
        alt="User dropdown"
        width={30}
        height={30}
      />

      <div
        className={`z-50 ${
          !show && "hidden"
        } absolute top-12 right-0 bg-white divide-y divide-gray-100 rounded-lg border-1 border-gray-100 shadow-md w-44  dark:divide-gray-600`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 ">
          <div>{userInfo?.name}</div>
          <div className="text-xs font-sm truncate">{userInfo?.email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 "
          aria-labelledby="avatarButton"
        >
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Dashboard
            </a>
          </li>
        </ul>
        <div className="py-1">
          <SignOut/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
