import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { Pie } from "react-chartjs-2";

// Register required components for pie chart
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Example data
const data = {
  labels: ["Apples", "Bananas", "Cherries", "Dates", "Elderberries"],
  datasets: [
    {
      label: "Fruit Sales",
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(255, 159, 64, 0.7)"
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      borderWidth: 1,
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Fruit Sales Distribution",
    },
    legend: {
      position: "bottom",
    },
  },
};

const PieChartExample = () => {
  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartExample;
