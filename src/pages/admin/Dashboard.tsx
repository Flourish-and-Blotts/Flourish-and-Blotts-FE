/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import ChartComponent from '../../components/ChartComponent';  // Import the new chart component
import axios from 'axios';
import APIResponse from '../../models/apiResponse';
import { useNavigate } from 'react-router-dom';

const SERVER_URL: string = 'http://localhost:8080/api';

const Dashboard: React.FC = () => {
  const [topData, setTopData] = useState<APIResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getTopData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<APIResponse>(SERVER_URL.concat('/getTopData'));

      const data = new APIResponse(
        response.data.earn,
        response.data.earnPercent,
        response.data.spend,
        response.data.spendPercent,
        response.data.newClient,
        response.data.newClientPercent
      ); // Using class
      setTopData(data);

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

  function setPercentColor(text: string): string {
    if (text.indexOf("-") > -1) {
      return 'text-red-500'
    } else {
      return 'text-green-500'
    }
  }

  return (
    <div className="flex flex-col p-8">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Spent this month */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold dark:text-white">Spent this month</h2>
            <p className="text-4xl font-bold dark:text-gray-100">${topData?.getSpend()}</p>
            <p className={`${setPercentColor(topData?.getSpendPercent() || '')} text-lg`}>{topData?.getSpendPercent() || 0}</p>
          </div>

          {/* New clients */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold dark:text-white">New clients</h2>
            <p className="text-4xl font-bold dark:text-gray-100">${topData?.getNewClient()}</p>
            <p className={`${setPercentColor(topData?.getNewClientPercent() || '')} text-lg`}>${topData?.getNewClientPercent()}</p>
          </div>

          {/* Earnings */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold dark:text-white">Earnings</h2>
            <p className="text-4xl font-bold dark:text-gray-100">${topData?.getEarn()}</p>
            <p className={`${setPercentColor(topData?.getEarnPercent() || '')} text-lg`}>${topData?.getEarnPercent()}</p>
          </div>
        </div>
      )}


      <div className="mt-8">
        <ChartComponent />
      </div>
    </div >
  );
};

export default Dashboard;
