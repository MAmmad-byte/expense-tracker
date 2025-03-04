"use client";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import ExpenseForm, { FormData } from "./components/ExpenseForm";
import { SessionProvider } from "next-auth/react";
import AppChart from "./components/AppChart";
import Expense from "./components/Expense";
import axios from "axios";
import ChartSkeleton from "./components/ChartSkeleton";

export default function Home() {
  const closeForm = () => {
    setForm(false);
  };

  const [form, setForm] = useState(false);
  const [stats, setStats] = useState([]);
  const [isStat, setIsStat] = useState(false);
  const [isExpense, setIsExpense] = useState(true);
  const [expenses, setExpenses] = useState<FormData[]>([]);
    async function getExpenses (){
        const expenses = await axios.get<FormData[]>("/api/expense", {headers:{
             'Cache-Control': 'no-cache, no-store, must-revalidate'
        }})
        setExpenses([ ...expenses.data])
        setIsExpense(false)
    }
    async function getMonthlyStats (){
        const expenses = await axios.get("/api/expense/filter/monthlyExpense")
        setStats(expenses.data)
        setIsStat(true)
    }
    useEffect(() => {
        getExpenses()
        getMonthlyStats();
    },[])
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
              <div className=" px-10 py-5 bg-white shadow-sm rounded-md">
                {/* <canvas id="line-chart"></canvas> */}
                {!isStat && <ChartSkeleton/>}
                {isStat && <AppChart stats={stats} />}
              </div>
              {/* <div className="flex items-center justify-between mt-5">
                <div className="w-full h-80 shadow-sm rounded-md mr-3 bg-white "></div>
                <div className="w-full h-80 shadow-sm rounded-md bg-white "></div>
              </div> */}
            </div>
          </div>
          <div className="w-1/3 bg-white ml-5 max-h-[80vh] rounded-md shadow-sm overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
            <Expense
              formClick={() => (form ? setForm(false) : setForm(true))}
              expenses={expenses}
              setList={setExpenses}
              isExpense={isExpense}
            />
          </div>
        </div>
        {form && (
          <ExpenseForm
            setExpense={(expenseList) => setExpenses([...expenseList])}
            expenses={expenses}
            closeForm={closeForm}
          />
        )}
      </div>
    </SessionProvider>
  );
}
