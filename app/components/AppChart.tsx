import React, { useEffect } from "react";
import { Chart, ChartConfiguration } from "chart.js/auto";
import moment from "moment";
interface Props{
  stats:{total?:number, date?:string}[]
}
const AppChart = ({stats}:Props) => {

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
    console.log(months.reverse());
    console.log(expense.reverse());
    const ctx = document.getElementById(
      "myChart"
    ) as HTMLCanvasElement | null;
    if (ctx) {
      const config: ChartConfiguration = {
        type: "line",
        data: {
          labels: months,
          datasets: [
            {
              label: new Date().getFullYear().toString(),
              backgroundColor: "rgba(49, 130, 206, 0.5)",
              borderColor: "#3182ce",
              borderWidth: 2,
              data: expense ,
              fill: true,
            },
          ],
        },
      };
      if (
        (window as any).myLine !== undefined
        &&
        (window as any).myLine !== null
    ){
      (window as any).myLine.destroy()
    }
      (window as any).myLine = new Chart(ctx, config);
    }
  }, []);
  return <canvas id="myChart"></canvas>;
};

export default AppChart;
