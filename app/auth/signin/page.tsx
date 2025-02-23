"use client"
import { doCredentialsLogin } from "@/app/actions";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Signin = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const handleSubmit = async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    
      const formData = new FormData(event.currentTarget)
      // console.log(formData)
      const response = await doCredentialsLogin(formData)
      if(response.error)
        setError(response.error)
      else
        router.push("/")

  }
  return (
    <div className="container mx-auto flex items-center justify-center w-full h-screen">
      <div className="w-1/2 p-4 border border-blue-950 bg-blue-900 rounded-md shadow-md">
        <form className="mx-auto" onSubmit={handleSubmit} >
          <p className="text-sm text-red-600">{error}</p>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
