import React from "react";
import ExpenseList from "./ExpenseList";

const Expense = () => {
  return (
    <div className="p-5">
      <div className="font-bold text-md ">
        <h3>Expense List</h3>
        <button className="w-full bg-white hover:bg-blue-900 border border-blue-400 hover:border-blue-900 border-2 p-2 rounded-md text-blue-400 hover:text-white font-bold mt-3 ">
          Add Expense
        </button>
      </div>
     <ExpenseList />
    </div>
  );
};

export default Expense;
