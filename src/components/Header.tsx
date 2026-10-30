import React, { useState, useEffect } from 'react';
import { Search, Menu, X, RefreshCw, Wifi, WifiOff, Moon, Sun } from 'lucide-react';
import { NewsCategory } from '../types/news';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
  onRefresh: () => void;
  loading: boolean;
  lastUpdated: Date;
  getTimeSinceUpdate: () => string;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  isSidebarOpen,
  onSidebarToggle,
  onRefresh,
  loading,
  lastUpdated,
  getTimeSinceUpdate
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [timeSinceUpdate, setTimeSinceUpdate] = useState('');
  const { theme, toggleTheme } = useTheme();

  const categories: { key: NewsCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'general', label: 'General' },
    { key: 'business', label: 'Business' },
    { key: 'entertainment', label: 'Entertainment' },
    { key: 'health', label: 'Health' },
    { key: 'science', label: 'Science' },
    { key: 'sports', label: 'Sports' },
    { key: 'technology', label: 'Tech' },
    { key: 'politics', label: 'Politics' },
    { key: 'world', label: 'World' }
  ];

  // Update online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update time since last update every minute
  useEffect(() => {
    const updateTime = () => {
      setTimeSinceUpdate(getTimeSinceUpdate());
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [lastUpdated, getTimeSinceUpdate]);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onSidebarToggle}
              className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">NewsHub</h1>
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  {isOnline ? (
                    <Wifi size={12} className="text-green-500" />
                  ) : (
                    <WifiOff size={12} className="text-red-500" />
                  )}
                  <span>
                    {isOnline ? `Updated ${timeSinceUpdate}` : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => onCategoryChange(category.key)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative whitespace-nowrap ${
                  activeCategory === category.key
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.label}
                {activeCategory === category.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Search Bar and Controls */}
          <div className="flex items-center space-x-4 flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
                </button>
              )}
            </div>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={loading}
              className={`p-2 rounded-md transition-colors ${
                loading
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title="Refresh news"
            >
              <RefreshCw 
                size={20} 
                className={loading ? 'animate-spin' : ''} 
              />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Category Pills */}
        <div className="xl:hidden pb-4 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => onCategoryChange(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Bar */}
      {loading && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
          <div className="h-full bg-blue-600 animate-pulse"></div>
        </div>
      )}
    </header>
  );
};

export default Header;