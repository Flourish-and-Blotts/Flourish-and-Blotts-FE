/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { ChartData, Data } from '../models/interfaces';
import { MonthEnum } from '../models/enum';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  chartData: ChartData<Data>
}

const ChartComponent: React.FC<ChartProps> = ({chartData})  => {

  // [1200, 1900, 3000, 5000, 2300, 3200]

  const data = {
    labels: chartData.data.map(t => t.date),
    datasets: [
      {
        label: 'Earnings',
        data: chartData.data.map(t => t.data),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4, // For smooth curves
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Earnings Over Time',
      },
    },
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Daily Earnings Overview</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
