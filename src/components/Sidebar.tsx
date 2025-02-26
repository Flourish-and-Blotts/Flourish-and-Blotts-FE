import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { ChartAreaIcon } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 !text-black dark:!text-white sticky top-0">
      <div className="p-4 text-2xl font-bold">
        Sky Dashboard
      </div>
      <ul className="mt-6 space-y-4">
        <li>
          <Link to="/admin/dashboard" className="flex !text-black dark:!text-white items-center space-x-3 hover:bg-purple-600 dark:hover:bg-purple-700 p-2 rounded-lg">
            <ChartAreaIcon />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/product" className="flex !text-black dark:!text-white items-center space-x-3 hover:bg-purple-600 dark:hover:bg-purple-700 p-2 rounded-lg">
            {/* <FaUserFriends /> */}
            <span>Product</span>
          </Link>
        </li>
        <li>
          <Link to="/payouts" className="flex !text-black dark:!text-white items-center space-x-3 hover:bg-purple-600 dark:hover:bg-purple-700 p-2 rounded-lg">
            {/* <FaMoneyBill /> */}
            <span>Payouts</span>
          </Link>
        </li>
        <li>
          <Link to="/schedules" className="flex !text-black dark:!text-white items-center space-x-3 hover:bg-purple-600 dark:hover:bg-purple-700 p-2 rounded-lg">
            {/* <FaCalendarAlt /> */}
            <span>Schedules</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="flex !text-black dark:!text-white items-center space-x-3 hover:bg-purple-600 dark:hover:bg-purple-700 p-2 rounded-lg">
            {/* <FaCogs /> */}
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;