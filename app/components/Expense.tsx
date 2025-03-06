import ExpenseList from "./ExpenseList";
import { FormData } from "./ExpenseForm";
import ExpenseSkeleton from "./Skeleton/ExpenseSkeleton";
interface Props {
  formClick: () => void;
  expenses: FormData[]
  setList:(formdata:FormData[]) =>void
  isExpense:boolean
  setDetail:(value?:number)=>void
}
const Expense = ({ formClick, expenses, setList, isExpense, setDetail }: Props) => {
  return (
    <div className="p-5">
      <div className="font-bold text-md ">
        <h3>Expense List</h3>
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
