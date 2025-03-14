import React, { useEffect, useState } from "react";
import moment from "moment";
interface Props {
  stats: { total?: number; date?: string }[];
}
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
const AppChart = ({ stats }: Props) => {
  const [data, setData] = useState<{ months: string[]; expense: number[] }>({
    months: [],
    expense: [],
  });

  useEffect(() => {
    const months = [];
    const expense = [];
    for (let i = 11; i >= 0; i--) {
      months[i] = moment().subtract(i, "month").format("MMM-YY");
      expense[i] = 0;
    }
    for (let i = 0; i < stats.length; i++) {
      expense[i] = Number(stats[i].total);
    }
    expense.reverse();
    months.reverse();
    setData({ expense, months });
  }, []);
  const option = {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: data.months,
    },
  };

  const series = [
    {
      name: "Total",
      data: data.expense,
    },
  ];

  return (
    <ApexChart
      type="bar"
      options={option}
      series={series}
      height={"100%"}
      width={"100%"}
    />
  );
};

export default AppChart;
