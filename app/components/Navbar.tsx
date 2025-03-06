import React from "react";
import Profile from "./navbar/Profile";
import { User } from "next-auth";
export interface UserSession{
  name:string
  email:string 
  id:number
  image:string
}
interface Props{
  userInfo?:User
}
const Navbar = ({userInfo}:Props) => {
  return (
    <nav className="p-2 bg-white shadow-sm ">
      <div className="container mx-auto flex items-center justify-between">
        <h1>
          <span className="text-3xl ">e</span>xpenseTracker
        </h1>
        <div className="flex items-center justify-between">
         
           {/* <SignOut /> */}
          {/* <p onClick={()=>signOut()} className="p-2 mx-2 bg-black rounded-md text-sm">Logout</p> */}
          {/* <div className="text-sm">{session && session.data?.user?.name}</div> */}
          <Profile userInfo={userInfo} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
