"use client"
import { signOut } from "next-auth/react"
 
export function SignOut() {
  return <button className=" w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => signOut()}>Sign Out</button>
}