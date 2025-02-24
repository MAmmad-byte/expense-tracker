"use client"
import { signOut } from "next-auth/react"
 
export function SignOut() {
  return <button className="p-2 mx-2 bg-black rounded-md text-sm" onClick={() => signOut()}>Sign Out</button>
}