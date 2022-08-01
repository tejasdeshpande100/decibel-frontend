import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData, chartOptions }) {
  return <Line options={chartOptions} data={chartData} />;
}

export default LineChart;