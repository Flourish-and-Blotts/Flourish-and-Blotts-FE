import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react'; // Import icons

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      htmlElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  // Check the current theme on component mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  return (
    <label className="flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="hidden" 
        checked={isDarkMode} 
        onChange={toggleTheme} 
      />
      <div className="relative">
      <div className={`block w-16 h-8 rounded-full ${isDarkMode ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-300`}></div>
        <div className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition ${isDarkMode ? 'bg-white transform translate-x-full' : 'bg-gray-600'}`}></div>
        {/* Icons */}
        <div className={`absolute left-3/4 transform -translate-x-1/2 top-1/2 -translate-y-1/2 transition-opacity ${isDarkMode ? 'opacity-0' : 'opacity-100'} text-lg md:text-xl`}>
          <MoonIcon className="text-gray-800" />
        </div>
        <div className={`absolute left-1/4 transform -translate-x-1/2 top-1/2 -translate-y-1/2 transition-opacity ${isDarkMode ? 'opacity-100' : 'opacity-0'} text-lg md:text-xl`}>
        <SunIcon className="text-gray-800" />
        </div>
      </div>
    </label>
  );
};

export default ThemeToggle;