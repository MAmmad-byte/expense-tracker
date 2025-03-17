import ExpenseList from "./ExpenseList";
import { FormData } from "./ExpenseForm";
import ExpenseSkeleton from "./Skeleton/ExpenseSkeleton";
import ExpenseDropDown from "./ExpenseDropDown";
import { StatsList } from "../page";
interface Props {
  formClick: () => void;
  expenses: FormData[]
  setList:(formdata:FormData[]) =>void
  isExpense:boolean
  setDetail:(value?:number)=>void
  statsList:StatsList[]
}
const Expense = ({ formClick, expenses, setList, isExpense, setDetail, statsList }: Props) => {
  return (
    <div className="p-5">
      <div className="font-bold text-md ">
        <div className="flex items-center justify-between">

        <h3>Expense List</h3>
        <ExpenseDropDown statsList={statsList} />
        </div>
        <button onClick={()=>formClick()} className="w-full bg-white hover:bg-blue-200  border-blue-200 border-2 p-2 rounded-md text-blue-400 hover:text-blue-900 font-bold mt-3 ">
          Add Expense
        </button>
      </div>
      {isExpense?<ExpenseSkeleton />:
      <ExpenseList setDetail={(value)=>setDetail(value)} expenses={expenses} setExpense={setList} /> 
    }
    </div>
  );
};

export default Expense;
