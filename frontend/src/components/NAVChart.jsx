import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

import CustomButton from "./customButtons";

import formatDate from "../utils/formatDate";

const NAVChart = ({
  selectedMutualFund,
  navs,
  classNames,
  setTimeDuration,
}) => {
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
                  if (navs.length < 100) {
                    return Object.values({ day, month, year }).join("-");
                  }
                  if (value == 0) {
                    return `${year} - ${month}`;
                  }

                  if (month != formatDate(navs[value - 1].date).month) {
                    return month == "Jan" ? `${year} - ${month}` : `${month}`;
                  }
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
      <h2 className="mb-5 flex justify-center text-xl md:text-3xl">
        {selectedMutualFund.name}
      </h2>
      <div>
        <canvas id="mutual-fund-navs"></canvas>
      </div>
      <div className="mt-4 flex flex-wrap justify-between">
        <CustomButton
          customValue={"1 Week"}
          onClick={() => setTimeDuration({ week: 1, month: "", year: "" })}
        />
        <CustomButton
          customValue={"1 Month"}
          onClick={() => setTimeDuration({ week: "", month: 1, year: "" })}
        />
        <CustomButton
          customValue={"6 Month"}
          onClick={() => setTimeDuration({ week: "", month: 6, year: "" })}
        />
        <CustomButton
          customValue={"1 Year"}
          onClick={() => setTimeDuration({ week: "", month: "", year: 1 })}
        />
        <CustomButton
          customValue={"3 Year"}
          onClick={() => setTimeDuration({ week: "", month: "", year: 3 })}
        />
        <CustomButton
          customValue={"All"}
          onClick={() => setTimeDuration({ week: "", month: "", year: 50 })}
        />
      </div>
    </div>
  );
};

export default NAVChart;
