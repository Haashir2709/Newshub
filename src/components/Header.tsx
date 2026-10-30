import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  RefreshCw, 
  Moon, 
  Sun, 
  Bookmark, 
  Flame, 
  Compass, 
  Radio, 
  Newspaper,
  Briefcase,
  Gamepad2,
  Heart,
  Atom,
  Trophy,
  Laptop,
  Vote,
  Globe
} from 'lucide-react';
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
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  showingBookmarks: boolean;
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
  getTimeSinceUpdate,
  bookmarksCount,
  onOpenBookmarks,
  showingBookmarks
}) => {
  const [timeSinceUpdate, setTimeSinceUpdate] = useState('');
  const { theme, toggleTheme } = useTheme();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const categories: { key: NewsCategory; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { key: 'all', label: 'All News', icon: Compass },
    { key: 'technology', label: 'Tech & AI', icon: Laptop },
    { key: 'business', label: 'Business & Markets', icon: Briefcase },
    { key: 'science', label: 'Science & Space', icon: Atom },
    { key: 'health', label: 'Health & Biotech', icon: Heart },
    { key: 'sports', label: 'Sports', icon: Trophy },
    { key: 'world', label: 'World', icon: Globe },
    { key: 'politics', label: 'Politics', icon: Vote },
    { key: 'entertainment', label: 'Culture & Film', icon: Gamepad2 },
    { key: 'general', label: 'General', icon: Newspaper },
  ];

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update time since last update every 30 seconds
  useEffect(() => {
    const updateTime = () => setTimeSinceUpdate(getTimeSinceUpdate());
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [lastUpdated, getTimeSinceUpdate]);

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      {/* Top Utility Editorial Bar */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 text-[11px] font-medium text-slate-500 dark:text-slate-400 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{todayDate}</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="hidden sm:inline text-brand-600 dark:text-brand-400 font-medium">Global Digital Edition</span>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
            <span className="hidden md:flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Wire Active</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline">Updated {timeSinceUpdate}</span>
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-1 hover:text-slate-900 dark:hover:text-white transition-colors"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={13} className="text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon size={13} className="text-slate-600" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            <button
              onClick={onSidebarToggle}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div 
              onClick={() => {
                onCategoryChange('all');
                onSearchChange('');
              }}
              className="cursor-pointer flex items-center space-x-2.5 group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-extrabold text-xl tracking-tighter">N</span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    NEWS<span className="text-brand-600 dark:text-brand-400">HUB</span>
                  </span>
                </div>
                <p className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 dark:text-slate-500 hidden sm:block -mt-1">
                  Verified Global Journalism
                </p>
              </div>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search size={16} />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search topics, companies, or keywords... (Press '/')"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-9 py-2 sm:py-2.5 text-xs sm:text-sm bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            {/* Reading List / Bookmarks Button */}
            <button
              onClick={onOpenBookmarks}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                showingBookmarks
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title="View your saved articles"
            >
              <Bookmark size={16} className={showingBookmarks ? 'fill-white' : ''} />
              <span className="hidden md:inline">Saved</span>
              {bookmarksCount > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  showingBookmarks ? 'bg-white text-brand-700' : 'bg-brand-600 text-white'
                }`}>
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center space-x-1.5 text-xs sm:text-sm font-medium"
              title="Refresh feeds"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin text-brand-600' : ''} />
              <span className="hidden lg:inline">{loading ? 'Updating...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Horizontal Category Navigation Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto py-2.5 no-scrollbar border-t border-slate-100 dark:border-slate-800/80">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = !showingBookmarks && activeCategory === category.key && !searchQuery;
            return (
              <button
                key={category.key}
                onClick={() => {
                  onCategoryChange(category.key);
                  if (searchQuery) onSearchChange('');
                }}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-brand-400 dark:text-brand-600' : 'opacity-70'} />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
