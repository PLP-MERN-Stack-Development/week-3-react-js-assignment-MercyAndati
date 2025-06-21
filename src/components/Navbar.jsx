import React from 'react'
import Button from '@/components/Button'
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">PLP Task Manager</h1>
        <div className="flex gap-4">
          <Button 
            variant="secondary" 
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Navbar