"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import z from "zod"

export const schema = z.object({
    title: z.string().min(3).max(55),
    category: z.string(),
    expense:z.coerce.number().min(1),
    description: z.string().max(5000).optional()
})

interface Props{
    closeForm: ()=>void
}
export type FormData = z.infer<typeof schema>;
const ExpenseForm = ({closeForm}:Props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({resolver: zodResolver(schema)});
    const onSubmit: SubmitHandler<FormData> = (formData)=>{
      console.log(formData)
      axios.post("http://localhost:3000/api/expense", formData)
    }
  return (
    <div className="bg-transparent backdrop-blur-sm w-full h-screen absolute top-0 left-0 flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto bg-blue-950 p-4  rounded-md text-left">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl">Enter Expense</h2>
        <RxCross2 size={25} onClick={closeForm} cursor={"pointer"} />
      </div>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            {...register("title")}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          />
           <p>{errors.title?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="category"
            className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Category
          </label>
          <input
           {...register("category")}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          />
          <p>{errors.category?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="expense"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Expense
          </label>
          <input
            {...register("expense")}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          />
          <p>{errors.expense?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            {...register("description")}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          />
        </div>
        <button
          type="submit"
          className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
