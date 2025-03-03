import React, { useEffect } from "react";
import {
  Chart,
  ChartConfiguration,
} from "chart.js/auto";
const AppChart = () => {
  useEffect(() => {
    const ctx = document.getElementById(
      "line-chart"
    ) as HTMLCanvasElement | null;
    if (ctx) {
      var config: ChartConfiguration = {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: new Date().getFullYear().toString(),
              backgroundColor: "rgba(49, 130, 206, 0.5)",
              borderColor: "#3182ce",
              borderWidth: 2,
              data: [
                0, 0, 0, 0, 0, 586, 7488, 1566, 44000, 56147, 64547, 12575,
              ],
              fill: true,
            },
          ],
        },
      };

      (window as any).myLine = new Chart(ctx, config);
    }
  }, []);
  return <canvas id="line-chart"></canvas>;
};

export default AppChart;
