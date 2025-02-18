"use client"
import Navbar from "./components/Navbar";
import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

export default function Home() {
  const closeForm = ()=>{
    setForm(false)
  }
  const [form, setForm] = useState(true)
  return (
    <div className="relative">
      <Navbar />
      <div className="container mx-auto text-center">
        <button
          type="button"
          onClick={()=>form? setForm(false): setForm(true)}
          className="mx-auto w-1/2 mt-5 text-white bg-transparent hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-transparent border border-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Expense
        </button>
        <ExpenseList />
        {form && 
        <ExpenseForm closeForm={closeForm} />
        }
      </div>
    </div>
  );
}
