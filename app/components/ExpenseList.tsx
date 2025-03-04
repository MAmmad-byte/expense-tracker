import React, { useEffect } from "react";
import ExpenseListItem from "./ExpenseListItem";
import axios from "axios";
import { FormData } from "./ExpenseForm";

interface Props {
  expenses: FormData[];
  setExpense: (expenseLish: FormData[]) => void;
}

const ExpenseList = ({ expenses, setExpense }: Props) => {
  return (
    <div className="text-md font-semibold text-gray-500 mt-5 ">
      <h4>Recent Expenses</h4>
      {expenses.map((expense) => (
        <div
          key={expense.id + expense.title}
          className="px-4 py-2 bg-gray-50 shadow-md flex items-center justify-between rounded-md mt-3"
        >
          <div>
            <p className="text-sm font-bold text-gray-800">{expense.title} </p>
            <p className="text-xs text-green-600">
              Category: {expense.category?.title}
            </p>
          </div>
          <p className="whitespace-nowrap text-base text-red-500">
            <span className="text-sm">Rs</span> {expense.expense}/-
          </p>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
