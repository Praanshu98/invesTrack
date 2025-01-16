import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

import formatDate from "../utils/formatDate";

const NAVChart = ({ navs, classNames }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    function renderChart() {
      const chartCanvas = document.getElementById("mutual-fund-navs");
      if (!chartCanvas) return;

      // Destroy the previous chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const canvasContext = chartCanvas.getContext("2d");
      canvasContext.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

      // Create new chart instance and store it in ref
      chartRef.current = new Chart(chartCanvas, {
        type: "line",
        options: {
          animation: false,
          elements: {
            line: {
              fill: true,
              borderWidth: 1,
            },
            point: {
              pointStyle: false,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              stacked: true,
              ticks: {
                callback: function (value) {
                  const { day, month, year } = formatDate(navs[value].date);

                  return `${day} - ${month} - ${year}`;
                },
              },
            },
          },
        },
        data: {
          labels: navs?.map((nav) => {
            const { day, month, year } = formatDate(nav.date);
            return `${day}-${month}-${year}`;
          }),
          datasets: [
            {
              data: navs?.map((nav) => nav.nav),
            },
          ],
        },
      });
    }
    renderChart();
    window.addEventListener("resize", renderChart);

    // Cleanup: Destroy the chart when component unmounts or data changes
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      window.removeEventListener("resize", renderChart);
    };
  }, [navs]);

  return (
    <div className={`w-3/4 md:w-4/5 ${classNames} `}>
      <h2> Mutual Fund Name </h2>
      <div>
        <canvas className="w-full" id="mutual-fund-navs"></canvas>
      </div>
    </div>
  );
};

export default NAVChart;
