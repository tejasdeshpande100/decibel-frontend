import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart  } from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

function BarChart({ chartData, chartOptions }) {
  return <Bar options={chartOptions} data={chartData} />;
}

export default BarChart;