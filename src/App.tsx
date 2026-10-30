import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ArticleCard from './components/ArticleCard';
import ArticleModal from './components/ArticleModal';
import HeroSpotlight from './components/HeroSpotlight';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import Toast from './components/Toast';
import { useNews } from './hooks/useNews';
import { NewsArticle } from './types/news';
import { 
  Flame, 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  Bookmark, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

const BOOKMARKS_STORAGE_KEY = 'newshub_saved_articles';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'latest' | 'trending' | 'quickest'>('latest');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showingBookmarks, setShowingBookmarks] = useState(false);
  
  // Bookmarks state persisted in localStorage
  const [savedArticles, setSavedArticles] = useState<NewsArticle[]>(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const {
    articles,
    loading,
    error,
    activeCategory,
    searchQuery,
    lastUpdated,
    handleCategoryChange,
    handleSearchChange,
    refreshNews,
    getTimeSinceUpdate
  } = useNews();

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(savedArticles));
    } catch (e) {
      console.warn('Unable to persist bookmarks', e);
    }
  }, [savedArticles]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  const isBookmarked = (id: string) => {
    return savedArticles.some(a => a.id === id);
  };

  const handleToggleBookmark = (e?: React.MouseEvent, article?: NewsArticle) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const target = article || selectedArticle;
    if (!target) return;

    if (isBookmarked(target.id)) {
      setSavedArticles(prev => prev.filter(a => a.id !== target.id));
      showToast('Removed from reading list');
    } else {
      setSavedArticles(prev => [target, ...prev]);
      showToast('Saved to your reading list');
    }
  };

  const handleShareArticle = async (e?: React.MouseEvent, article?: NewsArticle) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const target = article || selectedArticle;
    if (!target) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: target.title,
          text: target.description,
          url: target.url,
        });
      } catch {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(target.url || window.location.href);
        showToast('Article link copied to clipboard!');
      } catch {
        showToast('Unable to copy link');
      }
    }
  };

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const handleCategorySelect = (category: typeof activeCategory) => {
    setShowingBookmarks(false);
    handleCategoryChange(category);
  };

  const handleOpenBookmarks = () => {
    setShowingBookmarks(prev => !prev);
    if (searchQuery) handleSearchChange('');
  };

  // Active articles list based on whether bookmarks view is active
  const displayedArticles = useMemo(() => {
    let list = showingBookmarks ? savedArticles : articles;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(a => 
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        (a.author && a.author.toLowerCase().includes(q)) ||
        a.source.name.toLowerCase().includes(q)
      );
    }

    // Apply sorting
    const sorted = [...list];
    if (sortBy === 'trending') {
      sorted.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
    } else if (sortBy === 'quickest') {
      sorted.sort((a, b) => {
        const aTime = parseInt(a.readTime || '3', 10);
        const bTime = parseInt(b.readTime || '3', 10);
        return aTime - bTime;
      });
    } else {
      sorted.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    return sorted;
  }, [showingBookmarks, savedArticles, articles, searchQuery, sortBy]);

  // Editorial Spotlight articles for homepage view (only when not searching, not in bookmarks, and on 'all' or category)
  const isHomepageView = !showingBookmarks && !searchQuery && displayedArticles.length >= 3;
  const featuredArticle = isHomepageView ? displayedArticles[0] : null;
  const secondaryArticles = isHomepageView ? displayedArticles.slice(1, 3) : [];
  const feedArticles = isHomepageView ? displayedArticles.slice(3) : displayedArticles;

  // Breaking headlines for ticker
  const tickerArticles = useMemo(() => {
    return articles.slice(0, 5);
  }, [articles]);

  // Related articles for modal
  const relatedArticles = useMemo(() => {
    if (!selectedArticle) return [];
    return articles.filter(
      a => a.category === selectedArticle.category && a.id !== selectedArticle.id
    );
  }, [selectedArticle, articles]);

  const getCategoryTitle = () => {
    if (showingBookmarks) return 'Saved Reading List';
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    switch (activeCategory) {
      case 'technology': return 'Technology & Artificial Intelligence';
      case 'business': return 'Business, Finance & Markets';
      case 'science': return 'Science & Aerospace';
      case 'health': return 'Health & Medical Innovation';
      case 'sports': return 'Sports & Championship Athletics';
      case 'world': return 'World News & Global Affairs';
      case 'politics': return 'Politics, Law & Governance';
      case 'entertainment': return 'Culture, Film & Media';
      case 'general': return 'General Dispatches';
      default: return 'Top Stories & Breaking News';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-200 flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          activeCategory={activeCategory}
          onCategoryChange={handleCategorySelect}
          isSidebarOpen={isSidebarOpen}
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onRefresh={refreshNews}
          loading={loading}
          lastUpdated={lastUpdated}
          getTimeSinceUpdate={getTimeSinceUpdate}
          bookmarksCount={savedArticles.length}
          onOpenBookmarks={handleOpenBookmarks}
          showingBookmarks={showingBookmarks}
        />

        {/* Breaking News Ticker Strip */}
        {tickerArticles.length > 0 && !searchQuery && (
          <div className="bg-slate-900 text-white dark:bg-[#070A11] border-b border-slate-800 text-xs py-2 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto flex items-center">
              <div className="flex items-center space-x-2 bg-rose-600 text-white font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider flex-shrink-0 mr-4 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                <span>Wire</span>
              </div>
              
              <div className="overflow-hidden relative whitespace-nowrap flex-1">
                <div className="animate-marquee inline-flex space-x-8">
                  {tickerArticles.map((art, idx) => (
                    <span 
                      key={art.id || idx}
                      onClick={() => handleArticleClick(art)}
                      className="cursor-pointer hover:text-brand-300 transition-colors inline-flex items-center space-x-2"
                    >
                      <span className="font-semibold text-brand-400">[{art.source.name}]</span>
                      <span>{art.title}</span>
                      <span className="text-slate-600 dark:text-slate-700 mx-2">•</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex">
          {/* Mobile Navigation Drawer */}
          <Sidebar
            activeCategory={activeCategory}
            onCategoryChange={handleCategorySelect}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            bookmarksCount={savedArticles.length}
            onOpenBookmarks={handleOpenBookmarks}
            showingBookmarks={showingBookmarks}
          />

          {/* Main Content Area */}
          <main className="flex-1 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
              
              {/* Error Notice */}
              {error && (
                <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl p-5 mb-8 flex items-center justify-between">
                  <div className="text-rose-900 dark:text-rose-300 text-sm">
                    <span className="font-bold">Live connection note:</span> Showing cached verified dispatches. Check your connection or click refresh.
                  </div>
                  <button
                    onClick={refreshNews}
                    className="px-4 py-1.5 rounded-xl bg-rose-600 text-white font-semibold text-xs hover:bg-rose-700 transition-colors shadow-sm"
                  >
                    Refresh
                  </button>
                </div>
              )}

              {/* Editorial Hero Spotlight (Homepage mode) */}
              {!loading && isHomepageView && featuredArticle && (
                <HeroSpotlight
                  featuredArticle={featuredArticle}
                  secondaryArticles={secondaryArticles}
                  onArticleClick={handleArticleClick}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={(e, art) => handleToggleBookmark(e, art)}
                />
              )}

              {/* Feed Controls & Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200/80 dark:border-slate-800 gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-3">
                    <span>{getCategoryTitle()}</span>
                    {!loading && displayedArticles.length > 0 && (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {displayedArticles.length} {displayedArticles.length === 1 ? 'Story' : 'Stories'}
                      </span>
                    )}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {showingBookmarks 
                      ? 'Articles saved for later reading, stored locally on this device'
                      : searchQuery 
                        ? `Filtered dispatches matching "${searchQuery}"`
                        : 'Real-time journalism, investigative research, and verified worldwide coverage'}
                  </p>
                </div>

                {/* View Mode & Sort Controls */}
                <div className="flex items-center space-x-3 self-end sm:self-auto">
                  {/* Sort Dropdown */}
                  <div className="flex items-center space-x-1.5 bg-white dark:bg-[#131B2E] border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
                    <SlidersHorizontal size={13} className="text-slate-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent focus:outline-none cursor-pointer font-medium"
                    >
                      <option value="latest" className="dark:bg-[#131B2E]">Newest First</option>
                      <option value="trending" className="dark:bg-[#131B2E]">Trending Stories</option>
                      <option value="quickest" className="dark:bg-[#131B2E]">Quick Reads (&lt;3m)</option>
                    </select>
                  </div>

                  {/* View Mode Switcher */}
                  <div className="flex items-center bg-slate-200/70 dark:bg-slate-800/80 p-1 rounded-xl">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                      title="Grid layout"
                    >
                      <LayoutGrid size={15} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        viewMode === 'list'
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                      title="Compact list layout"
                    >
                      <List size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading && <LoadingSpinner />}

              {/* Empty State */}
              {!loading && displayedArticles.length === 0 && (
                <EmptyState
                  type={showingBookmarks ? 'bookmarks' : searchQuery ? 'search' : 'category'}
                  searchQuery={searchQuery}
                  category={getCategoryTitle()}
                  onReset={() => {
                    setShowingBookmarks(false);
                    handleCategoryChange('all');
                    handleSearchChange('');
                  }}
                />
              )}

              {/* Articles Grid or List */}
              {!loading && feedArticles.length > 0 && (
                <div 
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
                      : 'flex flex-col gap-4'
                  }
                >
                  {feedArticles.map((article, index) => (
                    <div 
                      key={article.id} 
                      className="animate-fadeIn" 
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ArticleCard
                        article={article}
                        onClick={() => handleArticleClick(article)}
                        isBookmarked={isBookmarked(article.id)}
                        onToggleBookmark={(e) => handleToggleBookmark(e, article)}
                        onShare={(e) => handleShareArticle(e, article)}
                        viewMode={viewMode}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Editorial Footer */}
      <footer className="bg-white dark:bg-[#070A11] border-t border-slate-200/80 dark:border-slate-800 mt-20 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100 dark:border-slate-800">
            {/* Column 1: Brand & Mission */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center shadow-md">
                  <span className="text-white font-extrabold text-base">N</span>
                </div>
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  NEWS<span className="text-brand-600 dark:text-brand-400">HUB</span>
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-md mb-4">
                Independent, verified news platform delivering comprehensive coverage across artificial intelligence, global financial markets, biotechnology, scientific exploration, and culture.
              </p>
              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Verified journalistic sources and authenticated editorial imagery.</span>
              </div>
            </div>

            {/* Column 2: Key Desks */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Editorial Desks
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <button onClick={() => handleCategorySelect('technology')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    Technology & AI
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategorySelect('business')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    Markets & Economy
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategorySelect('science')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    Science & Space
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategorySelect('health')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    Medicine & Biotech
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Features & System */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Reader Features
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <button onClick={handleOpenBookmarks} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center space-x-1.5">
                    <Bookmark size={13} />
                    <span>Saved Reading List ({savedArticles.length})</span>
                  </button>
                </li>
                <li>
                  <button onClick={refreshNews} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    Live Wire Sync
                  </button>
                </li>
                <li>
                  <span className="text-slate-400 dark:text-slate-500 text-xs">
                    Vite • React 18 • Tailwind CSS
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500 gap-3">
            <div>
              © 2026 NewsHub Media. All rights reserved. Built for high performance on Vercel.
            </div>
            <div className="flex items-center space-x-4">
              <span>Optimized for desktop & mobile</span>
              <span>•</span>
              <span className="text-emerald-500 font-medium">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Article Detail Reading Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        isBookmarked={selectedArticle ? isBookmarked(selectedArticle.id) : false}
        onToggleBookmark={() => handleToggleBookmark(undefined, selectedArticle || undefined)}
        onShare={() => handleShareArticle(undefined, selectedArticle || undefined)}
        relatedArticles={relatedArticles}
        onSelectArticle={(art) => setSelectedArticle(art)}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}

export default App;
