import axios from "axios";
import { useEffect, useState } from "react";
import ExpenseDetailSkeleton from "./Skeleton/ExpenseDetailSkeleton";
import moment from "moment";
interface Props {
  setDetail: () => void;
  value: number;
}
export interface DetailType {
  title: string;
  expense: number;
  category: { title: string };
  created_at: string;
  description: string | TrustedHTML;
}

const ExpenseDetail = ({ setDetail, value }: Props) => {
  const [Expdetail, setExpDetail] = useState<DetailType>();
  const [loading, setLoading] = useState(true);
  const getExpense = async (value?: number) => {
    try {
      const expenses = await axios.get<DetailType>("/api/expense/" + value);
      console.log(expenses.data);
      setExpDetail(expenses.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    // setDetail(true)
  };
  useEffect(() => {
    getExpense(value);
  }, []);

  return (
    <div
      onClick={() => setDetail()}
      className=" box-border  bg-transparent backdrop-blur-sm backdrop-brightness-50 w-full h-screen overflow-clip absolute top-0 left-0 flex justify-center items-center"
    >
      <div className="w-1/2  mx-auto bg-white shadow-md p-4  max-h-screen rounded-md text-left overflow-y-auto">
        {loading ? (
          <ExpenseDetailSkeleton />
        ) : (
          <div>
            <h3 className="text-lg font-bold">{Expdetail?.title}</h3>
            <p className="text-sm font-semibold text-gray-600">
              Cost Rs {Expdetail?.expense}/-
            </p>
            <p className="text-sm font-semibold text-gray-600">
              Date {moment(Expdetail?.created_at).format("DD/MM/YYYY")}
            </p>
            <p className="text-sm font-semibold text-gray-600">
              Category {Expdetail?.category.title}
            </p>
            {Expdetail!.description && (
              <>
                <p className="text-sm font-semibold text-gray-600 mt-2">
                  Description
                </p>
                <p
                  className="py-2"
                  dangerouslySetInnerHTML={{ __html: Expdetail!.description }}
                ></p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseDetail;
