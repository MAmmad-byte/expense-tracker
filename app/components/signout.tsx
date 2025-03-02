"use client"
import { signOut } from "next-auth/react"
 
export function SignOut() {
  return <button className="px-2 py-1 mx-2 bg-black rounded-md text-sm" onClick={() => signOut()}>Sign Out</button>
}