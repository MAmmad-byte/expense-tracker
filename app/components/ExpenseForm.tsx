"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import z from "zod";
import Skeleton from "./Skeleton";
import { Editor } from "primereact/editor";


        
export const schema = z.object({
  id: z.number().optional(),
  title: z.string().min(3).max(55),
  category: z.coerce.number().min(1),
  expense: z.coerce.number().min(1),
  description: z.string().max(5000).optional(),
});

interface Props {
  closeForm: () => void;
  setExpense: (expenseLish: FormData[]) => void;
  expenses: FormData[];
}
interface Category {
  id: number;
  title: string;
}

export type FormData = z.infer<typeof schema>;
const ExpenseForm = ({ closeForm, setExpense, expenses }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [error, setError] = useState("");
  const [des, setDes] = useState("");
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    formData.description = des;
    const expensess = [...expenses];
    setExpense([formData, ...expenses]);
    try {
      const res = await axios.post("/api/expense", formData);
      setExpense([res.data, ...expensess]);
      closeForm();
    } catch (error) {
      setExpense([...expensess]);
      setError("Error! Failed to add Expense"+error);
    }
  };
  const [categoryLoading, setCategoryLoading] = useState(true)
  const [category, setCategory] = useState<Category[]>([]);
  const getCategory = async () => {
    try {
      const res = await axios.get("/api/expenseCategory");
      setCategory(res.data);
      setCategoryLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className=" bg-transparent backdrop-blur-sm backdrop-brightness-50 w-full h-screen overflow-clip absolute top-0 left-0 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 my-10 mx-auto bg-white shadow-md p-4 max-h-screen rounded-md text-left overflow-y-auto"
      >
        <p className="text-red-600">{error}</p>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl">Enter Expense</h2>
          <RxCross2 size={25} onClick={closeForm} cursor={"pointer"} />
        </div>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block  mb-2 text-sm font-medium text-gray-900 "
          >
            Title
          </label>
          <input
            {...register("title")}
            placeholder="Enter Title"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
          <p>{errors.title?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="category"
            className="block  mb-2 text-sm font-medium text-gray-900 "
          >
            Select Category
          </label>
          {
            categoryLoading ?
            <Skeleton /> :
          
          <select
            id="countries"
            {...register("category")}
            defaultValue={1}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option value="1">Choose a category</option>
            {category.map((cat) => (
              <option key={cat.id + cat.title} value={cat.id.toString()}>
                {cat.title}
              </option>
            ))}
          </select>
          }
          <p>{errors.category?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="expense"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Expense
          </label>
          <input
            placeholder="Enter Expense"
            {...register("expense")}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
          <p>{errors.expense?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Description
          </label>
          {/* <textarea
            placeholder="Enter Description"
            {...register("description")}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          /> */}
          {/* <AppEditor {...register("description")} /> */}
          <Editor  value={des} onTextChange={(e) => setDes(`${e.htmlValue}`)} />
        </div>
        <button
          type="submit"
          className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Submit Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
