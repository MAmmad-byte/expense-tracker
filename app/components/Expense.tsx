import React from "react";
import ExpenseList from "./ExpenseList";
import { FormData } from "./ExpenseForm";
interface Props {
  formClick: () => void;
  expenses: FormData[]
  setList:(formdata:FormData[]) =>void
}
const Expense = ({ formClick, expenses, setList }: Props) => {
  return (
    <div className="p-5">
      <div className="font-bold text-md ">
        <h3>Expense List</h3>
        <button onClick={()=>formClick()} className="w-full bg-white hover:bg-blue-900  border-blue-400 hover:border-blue-900 border-2 p-2 rounded-md text-blue-400 hover:text-white font-bold mt-3 ">
          Add Expense
        </button>
      </div>
      <ExpenseList expenses={expenses} setExpense={setList} />
    </div>
  );
};

export default Expense;
