import React from "react";
import {
  Chart as ChartJS,
  Tooltip,
  Title,
  Legend,
  LinearScale, 
  TimeScale,
} from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { DateTime } from "luxon";

// Register required chart components
ChartJS.register(
  Tooltip,
  Title,
  Legend,
  LinearScale,
  MatrixController,
  MatrixElement,
  TimeScale
);

// Generate synthetic PDW-like data
const generatePDWData = (count = 500) => {
  const now = DateTime.now().toMillis(); // current time in ms
  const data = [];
  for (let i = 0; i < count; i++) {
    const toa = now - Math.floor(Math.random() * 1000 * 60 * 60); // within the last hour
    const rf = Math.floor(Math.random() * 2000) + 2000; // 2000–4000 MHz
    data.push({ toa, rf });
  }
  return data;
};

const pdwData = generatePDWData();

// Bin settings
const binSizeTime = 60 * 1000; // 1 min in ms
const binSizeFreq = 20; // 20 MHz

// Convert data into bins
const bins = {};
pdwData.forEach(({ toa, rf }) => {
  const timeBin = Math.floor(toa / binSizeTime) * binSizeTime;
  const freqBin = Math.floor(rf / binSizeFreq) * binSizeFreq;
  const key = `${timeBin},${freqBin}`;
  bins[key] = (bins[key] || 0) + 1;
});

const matrixData = Object.entries(bins).map(([key, count]) => {
  const [x, y] = key.split(",").map(Number);
  return {
    x,
    y,
    w: binSizeTime,
    h: binSizeFreq,
    v: count,
  };
});

const data = {
  datasets: [
    {
      label: "PDW Waterfall",
      data: matrixData,
      backgroundColor: (ctx) => {
        const value = ctx.dataset.data[ctx.dataIndex].v;
        const alpha = Math.min(1, value / 10);
        return `rgba(0, 123, 255, ${alpha})`;
      },
      borderWidth: 0,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "PDW Waterfall Chart (Time vs Frequency)",
    },
    tooltip: {
      callbacks: {
        label: (ctx) => {
          const { x, y, v } = ctx.raw;
          return `Time: ${DateTime.fromMillis(x).toFormat("HH:mm:ss")}, RF: ${y} MHz → ${v} pulses`;
        },
      },
    },
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "minute",
      },
      title: {
        display: true,
        text: "Time of Arrival",
      },
    },
    y: {
      type: "linear",
      title: {
        display: true,
        text: "Frequency (MHz)",
      },
    },
  },
};

const WaterfallChart = () => {
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Chart type="matrix" data={data} options={options} />
    </div>
  );
};

export default WaterfallChart;
