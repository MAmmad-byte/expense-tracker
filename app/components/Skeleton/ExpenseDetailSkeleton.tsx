
const ExpenseDetailSkeleton = () => {
  return (
    <div className=" box-border  bg-transparent backdrop-blur-sm backdrop-brightness-50 w-full h-screen overflow-clip absolute top-0 left-0 flex justify-center items-center">
      <div className="w-1/2  mx-auto bg-white shadow-md p-4  max-h-screen rounded-md text-left overflow-y-auto">
      <div role="status" className="w-full animate-pulse mt-5">
      <div className="h-4 w-60  bg-gray-200 rounded-md   mb-2.5"></div>
      <div className="h-4 w-40  bg-gray-200 rounded-md  mb-2.5"></div>
      <div className="h-4 w-44  bg-gray-200 rounded-md   mb-2.5"></div>
      <div className="h-4 w-20  bg-gray-200 rounded-md   mb-2.5"></div>
      <div className="h-6 w-80  bg-gray-200 rounded-md  "></div>
    </div>
      </div>
    </div>
  );
};

export default ExpenseDetailSkeleton;
