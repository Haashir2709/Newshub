import React from 'react';
import { 
  Home, 
  Globe, 
  Briefcase, 
  Gamepad2, 
  Heart, 
  Atom, 
  Trophy, 
  Laptop, 
  Vote, 
  Newspaper,
  X 
} from 'lucide-react';
import { NewsCategory } from '../types/news';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  activeCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeCategory,
  onCategoryChange,
  isOpen,
  onClose
}) => {
  const categories = [
    { key: 'all' as NewsCategory, label: 'All News', icon: Home, color: 'text-gray-600' },
    { key: 'general' as NewsCategory, label: 'General', icon: Newspaper, color: 'text-gray-600' },
    { key: 'business' as NewsCategory, label: 'Business', icon: Briefcase, color: 'text-blue-600' },
    { key: 'entertainment' as NewsCategory, label: 'Entertainment', icon: Gamepad2, color: 'text-pink-600' },
    { key: 'health' as NewsCategory, label: 'Health', icon: Heart, color: 'text-green-600' },
    { key: 'science' as NewsCategory, label: 'Science', icon: Atom, color: 'text-purple-600' },
    { key: 'sports' as NewsCategory, label: 'Sports', icon: Trophy, color: 'text-orange-600' },
    { key: 'technology' as NewsCategory, label: 'Technology', icon: Laptop, color: 'text-indigo-600' },
    { key: 'politics' as NewsCategory, label: 'Politics', icon: Vote, color: 'text-red-600' },
    { key: 'world' as NewsCategory, label: 'World', icon: Globe, color: 'text-emerald-600' }
  ];

  const handleCategoryClick = (category: NewsCategory) => {
    onCategoryChange(category);
    onClose();
  };

  const getActiveStyles = (category: NewsCategory) => {
    if (activeCategory === category) {
      const categoryConfig = categories.find(c => c.key === category);
      const baseColor = categoryConfig?.color.replace('text-', '') || 'gray-600';
      return {
        bg: `bg-${baseColor.replace('-600', '-50')}`,
        text: categoryConfig?.color || 'text-gray-600',
        border: `border-${baseColor}`
      };
    }
    return {
      bg: '',
      text: 'text-gray-600',
      border: ''
    };
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:shadow-none lg:bg-gray-50 lg:dark:bg-gray-900 w-72`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">NewsHub</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Categories */}
          <nav className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4">
              Categories
            </h3>
            {categories.map((category) => {
              const Icon = category.icon;
              const styles = getActiveStyles(category.key);
              
              return (
                <button
                  key={category.key}
                  onClick={() => handleCategoryClick(category.key)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                    activeCategory === category.key
                      ? `${styles.bg} ${styles.text} border-r-4 ${styles.border} shadow-sm`
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon 
                    size={20} 
                    className={`${
                      activeCategory === category.key 
                        ? styles.text 
                        : `${category.color} group-hover:${category.color}`
                    }`} 
                  />
                  <span className="font-medium">{category.label}</span>
                  {activeCategory === category.key && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-current opacity-60"></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Stats Section */}
          <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Today's Updates</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Articles</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">150+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Sources</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">25+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last Update</span>
                <span className="font-medium text-green-600 dark:text-green-400">Live</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
              NewsHub © 2025<br />
              Real-time news from trusted sources worldwide
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;