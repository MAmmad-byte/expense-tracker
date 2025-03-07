import { FormData } from "./ExpenseForm";

interface Props {
  expenses: FormData[];
  setExpense: (expenseLish: FormData[]) => void;
  setDetail:(value?:number)=>void
}

const ExpenseList = ({ expenses, setDetail }: Props) => {
  return (
    <div className="text-md font-semibold text-gray-500 mt-5 ">
      <h4>Recent Expenses</h4>
      {expenses.length == 0 ? "No Record Found":null}
      {expenses.map((expense) => (
        <div
        onClick={()=>setDetail(expense.id)}
          key={expense.id + expense.title}
          className="cursor-pointer border-2 border-transparent hover:border-gray-200  px-4 py-2 bg-gray-50 shadow-md flex items-center justify-between rounded-md mt-3"
        >
          <div>
            <p className="text-sm font-bold text-gray-800">{expense.title} </p>
            <p className="text-xs text-green-600">
              Category: {(expense.category as any).title }
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
