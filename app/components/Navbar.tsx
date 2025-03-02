
import { useSession } from "next-auth/react";
import React from "react";
import { SignOut } from "./signout";

const Navbar = () => {
  const session = useSession();
  return (
    <nav className="p-2 bg-white shadow-sm ">
      <div className="container mx-auto flex items-center justify-between">
        <h1>
          <span className="text-3xl ">e</span>xpenseTracker
        </h1>
        <div className="flex items-center justify-between">
         
           <SignOut />
          {/* <p onClick={()=>signOut()} className="p-2 mx-2 bg-black rounded-md text-sm">Logout</p> */}
          <div className="text-sm">{session && session.data?.user?.name}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
