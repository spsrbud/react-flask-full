import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import dayjs from "dayjs";

// Register Chart.js components
ChartJS.register(LinearScale, PointElement, Title, Tooltip, Legend);

// Generate an array of last 14 dates (from today backward)
const today = dayjs();
const dateLabels = Array.from({ length: 14 }, (_, i) =>
  today.subtract(i, "day").format("M/D")
).reverse(); // oldest to newest

// Create a map of date string to numeric index
const dateToIndex = dateLabels.reduce((map, date, idx) => {
  map[date] = idx;
  return map;
}, {});


const generateRandomData = () => {
  const points = [];

  for (let i = 0; i < 100; i++) {
    const randomDayIndex = Math.floor(Math.random() * dateLabels.length);
    const randomHour = +(Math.random() * 24).toFixed(2); // Time of day in hours
    points.push({
      x: randomHour,
      y: randomDayIndex,
    });
  }

  return points;
};

// Sample data points: each { x = time in hours, y = index of date in list }
const data = {
  datasets: [
    {
      label: "Events",
      data: generateRandomData(), // Generate random data points
      // data: [
      //   { x: 8.5, y: dateToIndex["6/15"] },   // 8:30 AM on 6/15
      //   { x: 13, y: dateToIndex["6/16"] },    // 1:00 PM on 6/16
      //   { x: 18.75, y: dateToIndex["6/18"] }, // 6:45 PM on 6/18
      //   { x: 21, y: dateToIndex["6/25"] },    // 9:00 PM on 6/25
      // ],
      backgroundColor: "rgba(153, 102, 255, 1)",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Time of Day vs Last 14 Days",
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const x = context.parsed.x;
          const y = context.parsed.y;
          const date = dateLabels[y] || `Index ${y}`;
          const time = `${Math.floor(x)}:${String(Math.round((x % 1) * 60)).padStart(2, "0")}`;
          return ` ${date} @ ${time}`;
        },
      },
    },
  },
  scales: {
    x: {
      type: "linear",
      min: 0,
      max: 24,
      title: {
        display: true,
        text: "Time of Day (Hours)",
      },
      ticks: {
        stepSize: 2,
        callback: (val) => `${val}:00`,
      },
    },
    y: {
      type: "linear",
      min: 0,
      max: dateLabels.length - 1,
      reverse: true, // Reverse to show the most recent date at the top
      title: {
        display: true,
        text: "Date",
      },
      ticks: {
        stepSize: 1,
        callback: (val) => dateLabels[val] || "",
      },
    },
  },
};

const WeekdayTimeChart = () => {
  return (
    <div style={{ height: "500px" }}>
      <Scatter data={data} options={options} />
    </div>
  );
};

export default WeekdayTimeChart;
