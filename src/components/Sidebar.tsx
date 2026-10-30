import React from 'react';
import { 
  Compass, 
  Globe, 
  Briefcase, 
  Gamepad2, 
  Heart, 
  Atom, 
  Trophy, 
  Laptop, 
  Vote, 
  Newspaper,
  Bookmark,
  X,
  Sparkles
} from 'lucide-react';
import { NewsCategory } from '../types/news';

interface SidebarProps {
  activeCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
  isOpen: boolean;
  onClose: () => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  showingBookmarks: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeCategory,
  onCategoryChange,
  isOpen,
  onClose,
  bookmarksCount,
  onOpenBookmarks,
  showingBookmarks
}) => {
  const categories = [
    { key: 'all' as NewsCategory, label: 'All News', icon: Compass, color: 'text-slate-600 dark:text-slate-400' },
    { key: 'technology' as NewsCategory, label: 'Technology & AI', icon: Laptop, color: 'text-indigo-600 dark:text-indigo-400' },
    { key: 'business' as NewsCategory, label: 'Business & Finance', icon: Briefcase, color: 'text-emerald-600 dark:text-emerald-400' },
    { key: 'science' as NewsCategory, label: 'Science & Cosmos', icon: Atom, color: 'text-purple-600 dark:text-purple-400' },
    { key: 'health' as NewsCategory, label: 'Health & Medicine', icon: Heart, color: 'text-teal-600 dark:text-teal-400' },
    { key: 'sports' as NewsCategory, label: 'Sports', icon: Trophy, color: 'text-amber-600 dark:text-amber-400' },
    { key: 'world' as NewsCategory, label: 'World Affairs', icon: Globe, color: 'text-sky-600 dark:text-sky-400' },
    { key: 'politics' as NewsCategory, label: 'Politics & Policy', icon: Vote, color: 'text-slate-700 dark:text-slate-300' },
    { key: 'entertainment' as NewsCategory, label: 'Culture & Entertainment', icon: Gamepad2, color: 'text-rose-600 dark:text-rose-400' },
    { key: 'general' as NewsCategory, label: 'General & Metro', icon: Newspaper, color: 'text-slate-600 dark:text-slate-400' }
  ];

  const handleCategoryClick = (category: NewsCategory) => {
    onCategoryChange(category);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white dark:bg-[#0E1524] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden w-80 flex flex-col justify-between border-r border-slate-200/80 dark:border-slate-800`}
      >
        <div className="p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 mb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-lg">N</span>
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  NEWS<span className="text-brand-600 dark:text-brand-400">HUB</span>
                </span>
                <p className="text-[10px] tracking-wider uppercase font-semibold text-slate-400">Navigation</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Bookmarks Section */}
          <div className="mb-6">
            <button
              onClick={() => {
                onOpenBookmarks();
                onClose();
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                showingBookmarks
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Bookmark size={18} className={showingBookmarks ? 'fill-white' : ''} />
                <span>Saved Reading List</span>
              </div>
              {bookmarksCount > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  showingBookmarks ? 'bg-white text-brand-700' : 'bg-brand-600 text-white'
                }`}>
                  {bookmarksCount}
                </span>
              )}
            </button>
          </div>

          {/* Categories Label */}
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
            Categories & Desks
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = !showingBookmarks && activeCategory === category.key;

              return (
                <button
                  key={category.key}
                  onClick={() => handleCategoryClick(category.key)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={18} className={isActive ? 'text-brand-400 dark:text-brand-600' : category.color} />
                    <span>{category.label}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 dark:bg-brand-600"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-1.5 text-brand-600 dark:text-brand-400 font-semibold mb-1">
            <Sparkles size={14} />
            <span>NewsHub 2026 Edition</span>
          </div>
          <p>Curated journalism and real-time news intelligence.</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
