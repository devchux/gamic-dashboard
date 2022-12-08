import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
    tooltip: {
      backgroundColor: '#00BA50',
      boxWidth: '0',
      boxHeight: '0'
    }
  },
};

const LineGraph = ({ data, labels }) => {
  const graphData = useMemo(
    () => ({
      labels: labels,
      datasets: [
        {
          data,
          borderColor: "#00BA50",
        },
      ],
    }),
    [data, labels]
  );
  return <Line options={options} data={graphData} />;
};

export default LineGraph;
