"use client"
import { doCredentialsLogin } from "@/app/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Signin = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    // console.log(formData)
    const response = await doCredentialsLogin(formData)
    if (response.error)
      setError(response.error)
    else
      window.location.href = "/"

  }
  return (
    <div className="bg-gradient-to-r from-rose-50 to-teal-50">

      <div className="container mx-auto flex items-center justify-center w-full h-screen ">
        <div className="w-2/5  p-4 bg-white border-2 border-gray-200 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold">Expesne Tracker</h1>
        <h2 className="text-base font-bold  mb-5 bg-gradient-to-r from-cyan-700 to-blue-950 bg-clip-text text-transparent">Enter Credentials to login</h2>
          <form className="mx-auto" onSubmit={handleSubmit} >
            <p className="text-sm text-red-600">{error}</p>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
            <div className="flex items-center justify-between">

              <button
                type="submit"
                className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
              <p className=" mx-2 k rounded-md text-xs">
              Don't have an account?
              <Link href="/auth/signup" className="  hover:text-green-600 "> Sign up now</Link>
              </p>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Signin;
