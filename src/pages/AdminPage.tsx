import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import Product from './admin/Product';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

const MainComponent: React.FC = () => {
  const [searchText, setSearchText] = useState(""); // Lifted state
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen text-black">
      <Sidebar />
      <div className="flex-1">
        <TopBar onSearchChange={setSearchText} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Product searchText={searchText} />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainComponent;