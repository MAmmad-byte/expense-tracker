"use client";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const Signup = () => {
  const router = useRouter();

  const registerSchema = z.object({
    name: z.string().min(3).max(55),
    email: z.string().email(),
    password: z.string().min(4).max(20),
  });

  type registerType = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<registerType> = async (formdata) => {
    try {
      const res = await axios.post("/api/auth/register", {
        name: formdata.name,
        email: formdata.email,
        password: formdata.password,
      });

      if (res.status === 200) {
        // Sign in the user after successful registration
        const signInRes = await signIn("credentials", {
          email: formdata.email,
          password: formdata.password,
          redirect: false,  // Prevent redirect after sign-in
        });

        // Check for error in signInRes
        if (signInRes?.error) {
          console.log("Error signing in:", signInRes.error);
          // Optionally handle the error (e.g., show an error message)
        } else {
          // Successfully signed in, redirect user
          router.push("/");
        }
      }
    } catch (error) {
      console.log("Registration or sign-in error:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-rose-50 to-teal-50">

      <div className="container mx-auto flex items-center justify-center w-full h-screen">
        <div className="lg:w-2/5 p-4 border-2 border-gray-200 bg-white rounded-md shadow-lg">
          <h1 className="text-2xl font-bold">Expesne Tracker</h1>
          <h2 className="text-base font-bold  mb-5 bg-gradient-to-r from-cyan-700 to-blue-950 bg-clip-text text-transparent">Create your free account</h2>
          <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Enter Name"
                required
              />
              <p>{errors.name?.message}</p>
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Enter Email"
                required
              />
              <p>{errors.email?.message}</p>
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
                {...register("password")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
              <p>{errors.password?.message}</p>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center "
              >
                Sign up
              </button>
              <p className="mx-2 k rounded-md text-sm">
                Already have an account?
                <Link
                  href="/auth/signin"
                  className=" hover:text-green-600"
                > Sign in now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
