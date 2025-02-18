import React, { useEffect, useState } from "react";
import ExpenseListItem from "./ExpenseListItem";
import axios from "axios";
import { FormData } from "./ExpenseForm";

const ExpenseList = () => {
    const [expenses, setExpenses] = useState<FormData[]>([])
    async function getExpenses (){
        const expenses = await axios.get<FormData[]>("http://localhost:3000/api/expense", {headers:{
             'Cache-Control': 'no-cache, no-store, must-revalidate'
        }})
        // console.log(expenses)
      setExpenses([ ...expenses.data])
    }
    useEffect(() => {
        getExpenses()
    }, [])
    
  return (
    <div className="text-left w-1/2 mx-auto mt-10">
      <h2 className="text-xl font-semibold">Recent Expenses</h2>
      <hr className="w-36 h-1  bg-gray-100 border-0 rounded-sm  dark:bg-gray-700"></hr>
      <ul className=" divide-y divide-gray-200 dark:divide-gray-700 mt-4">
        {expenses.length > 0 ? expenses.map(expense=>(

        <ExpenseListItem title={expense.title} category={expense.category} description={expense.description} expense={expense.expense} key={expense.id} />
        )): "No Expenses Record Found"}
      </ul>
    </div>
  );
};

export default ExpenseList;
