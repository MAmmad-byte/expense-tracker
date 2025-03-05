
const ExpenseSkeleton = () => {
  return (
    <div role="status" className="w-full animate-pulse mt-5">
      <div className="h-8  bg-gray-200 rounded-md   mb-2.5"></div>
      <div className="h-8  bg-gray-200 rounded-md  mb-2.5"></div>
      <div className="h-8  bg-gray-200 rounded-md   mb-2.5"></div>
      <div className="h-8  bg-gray-200 rounded-md   mb-2.5"></div>
      <div className="h-8  bg-gray-200 rounded-md  "></div>
    </div>
  );
};

export default ExpenseSkeleton;
