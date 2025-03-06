/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import ChartComponent from '../../components/ChartComponent';  // Import the new chart component
import { useNavigate } from 'react-router-dom';
import { postAPI } from '../../service/apiService';
import { ChartData, Data } from '../../models/interfaces';

interface TopData {
  newOrders: number,
  newClients: number,
  earning: string
}

const Dashboard: React.FC = () => {
  const [topData, setTopData] = useState<TopData>();
  const [chartData, setChartData] = useState<ChartData<Data>>({ data: [{ data: 0, date: '2020202' }] });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getTopData = async () => {
    setIsLoading(true);
    try {
      const payload = {
        query: '{ countNewOrders countNewClients getTotalEarning getEarningOverTime {date, data}}'
      }
      const response = await postAPI('/graphql', payload);
      setTopData({
        newOrders: response.data.countNewOrders,
        newClients: response.data.countNewClients,
        earning: response.data.getTotalEarning
      })

      setChartData({data: response.data.getEarningOverTime})

    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        // login fail
        navigate('/login');
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTopData();
  }, []);

  // function setPercentColor(text: string): string {
  //   if (text.indexOf("-") > -1) {
  //     return 'text-red-500'
  //   } else {
  //     return 'text-green-500'
  //   }
  // }

  return (
    <div className="flex flex-col p-8">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Spent this month */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold dark:text-white">New Orders This Month</h2>
            <p className="text-4xl font-bold dark:text-gray-100">{topData?.newOrders}</p>
            {/* <p className={`${setPercentColor(topData?.getSpendPercent() || '')} text-lg`}>{topData?.getSpendPercent() || 0}</p> */}
          </div>

          {/* New clients */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold dark:text-white">New Clients This Month</h2>
            <p className="text-4xl font-bold dark:text-gray-100">{topData?.newClients}</p>
            {/* <p className={`${setPercentColor(topData?.getNewClientPercent() || '')} text-lg`}>${topData?.getNewClientPercent()}</p> */}
          </div>

          {/* Earnings */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold dark:text-white">Earnings This Month</h2>
            <p className="text-4xl font-bold dark:text-gray-100">{topData?.earning}</p>
            {/* <p className={`${setPercentColor(topData?.getEarnPercent() || '')} text-lg`}>${topData?.getEarnPercent()}</p> */}
          </div>
        </div>
      )}


      <div className="mt-8">
        <ChartComponent chartData={chartData} />
      </div>
    </div >
  );
};

export default Dashboard;
