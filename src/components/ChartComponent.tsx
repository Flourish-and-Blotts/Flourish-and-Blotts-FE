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
import { ChartData, MonthData } from '../models/interfaces';
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

const ChartComponent: React.FC = () => {

  // [1200, 1900, 3000, 5000, 2300, 3200]
  const fetchedData: ChartData<MonthData> = { data: [{ month: MonthEnum.January, data: 1200 }, { month: MonthEnum.February, data: 1900 }] };

  const data = {
    labels: fetchedData.data.map(t => t.month),
    datasets: [
      {
        label: 'Earnings',
        data: fetchedData.data.map(t => t.data),
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
      <h2 className="text-xl font-bold mb-4 dark:text-white">Earnings Overview</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
