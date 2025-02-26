import React, { useState } from 'react';
import { BellIcon } from 'lucide-react';
import ThemeToggle from './ui/ThemToggle';

interface TopBarProps {
  onSearchChange: (text: string) => void;
}
const TopBar: React.FC<TopBarProps> = ({ onSearchChange }) => {
  const [query, setQuery] = useState("");
  const handleChangeText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchChange(query)
    }
  }
  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow-lg sticky top-0 !text-black">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        className="p-2 w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 !text-black dark:!text-white"
        onKeyDown={handleChangeText}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />

      {/* Notification and Profile */}
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <BellIcon className="text-2xl dark:text-white" />
        <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-10 h-10 flex items-center justify-center">
          <span className="text-lg font-bold">T</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
