"use client"
import Navbar from "./components/Navbar";
import { useState } from "react";
import ExpenseForm, { FormData } from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { SessionProvider, useSession } from "next-auth/react";

export default function Home() {
  const closeForm = ()=>{
    setForm(false)
  }
  // const session = useSession()
  // console.log(session)
  const [form, setForm] = useState(false)
  const [expenses, setExpenses] = useState<FormData[]>([])
  return (
    <SessionProvider>

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
        <ExpenseList setExpense={(expenseList)=>setExpenses([...expenseList])} expenses={expenses} />
        {form && 
        <ExpenseForm setExpense={(expenseList)=>setExpenses([...expenseList])} expenses={expenses} closeForm={closeForm} />
      }
      </div>
    </div>
      </SessionProvider>
  );
}
