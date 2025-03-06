import React from "react";
interface Props{
    
}
const ExpenseDetail = ({setDetail}:{setDetail:()=>void}) => {
  return (
    <div onClick={()=>setDetail()} className=" box-border  bg-transparent backdrop-blur-sm backdrop-brightness-50 w-full h-screen overflow-clip absolute top-0 left-0 flex justify-center items-center">
      <div className="w-1/2  mx-auto bg-white shadow-md p-4  max-h-screen rounded-md text-left overflow-y-auto">
        <h3 className="text-lg font-bold">Laptop Purchase</h3>
        <p className="text-sm font-semibold text-gray-600">Cost Rs 5096/-</p>
        <p className="text-sm font-semibold text-gray-600">Date 23/25/2025</p>
        <p className="text-sm font-semibold text-gray-600">Category Income</p>
        <p className="text-sm font-semibold text-gray-600 mt-2">Description</p>
        <p className="py-2"></p>
      </div>
    </div>
  );
};

export default ExpenseDetail;
