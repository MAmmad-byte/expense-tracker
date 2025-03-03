"use client";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import ExpenseForm, { FormData } from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { SessionProvider } from "next-auth/react";
import AppChart from "./components/AppChart";
import Expense from "./components/Expense";


export default function Home() {
  const closeForm = () => {
    setForm(false);
  };
  
  const [form, setForm] = useState(false);
  const [expenses, setExpenses] = useState<FormData[]>([]);
  
  return (
    <SessionProvider>
      <div className="relative">
        <Navbar />
        <div className="flex w-full p-4 container mx-auto">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="w-full py-4 px-6 text-gray-600 bg-white rounded-md shadow-sm">
                <p className="text-xs">Total Expense</p>
                <p className="font-semibold mt-1 text-red-600">Rs 4,568/-</p>
              </div>
              <div className="w-full mx-3 py-4 px-6 text-gray-600 bg-white rounded-md shadow-sm">
                <p className="text-xs">Most Expensive: Food & Drink</p>
                <p className="font-semibold mt-1 text-blue-600">Rs 4,568/-</p>
              </div>
              <div className="w-full py-4 px-6 text-gray-600 bg-white rounded-md shadow-sm">
                <p className="text-xs">Save from last month</p>
                <p className="font-semibold mt-1 text-green-600">Rs 4,568/-</p>
              </div>
            </div>
            <div className=" mt-5">
              <div className=" p-10 bg-white shadow-sm rounded-md">
              {/* <canvas id="line-chart"></canvas> */}
              <AppChart />
              </div>
              <div className="flex items-center justify-between mt-5">
                    <div className="w-full h-80 shadow-sm rounded-md mr-3 bg-white "></div>
                    <div className="w-full h-80 shadow-sm rounded-md bg-white "></div>
              </div>
            </div>
          </div>
          <div className="w-1/3 bg-white ml-5 min-h-full rounded-md shadow-sm" ><Expense/></div>
        </div>
        {/* <div className="container mx-auto text-center">
          <button
            type="button"
            onClick={() => (form ? setForm(false) : setForm(true))}
            className="mx-auto w-1/2 mt-5 text-white bg-transparent hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-transparent border border-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Expense
          </button>
          <ExpenseList
            setExpense={(expenseList) => setExpenses([...expenseList])}
            expenses={expenses}
          />
          {form && (
            <ExpenseForm
              setExpense={(expenseList) => setExpenses([...expenseList])}
              expenses={expenses}
              closeForm={closeForm}
            />
          )}
        </div> */}
      </div>
    </SessionProvider>
  );
}
