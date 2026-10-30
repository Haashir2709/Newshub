import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ArticleCard from './components/ArticleCard';
import ArticleModal from './components/ArticleModal';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import { useNews } from './hooks/useNews';
import { NewsArticle } from './types/news';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'business':
        return 'Business';
      case 'entertainment':
        return 'Entertainment';
      case 'health':
        return 'Health';
      case 'science':
        return 'Science';
      case 'sports':
        return 'Sports';
      case 'technology':
        return 'Technology';
      case 'politics':
        return 'Politics';
      case 'world':
        return 'World';
      case 'general':
        return 'General';
      default:
        return 'All News';
    }
  };

  const getStatusMessage = () => {
    if (loading) return 'Loading latest news...';
    if (error) return 'Connection error';
    if (articles.length === 0) return 'No articles found';
    return `${articles.length} article${articles.length !== 1 ? 's' : ''} • Updated ${getTimeSinceUpdate()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={handleSidebarToggle}
        onRefresh={refreshNews}
        loading={loading}
        lastUpdated={lastUpdated}
        getTimeSinceUpdate={getTimeSinceUpdate}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
                    <span>
                      {searchQuery ? `Search Results` : getCategoryLabel(activeCategory)}
                    </span>
                    {!loading && !error && articles.length > 0 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                        Live
                      </span>
                    )}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {searchQuery ? (
                      <>Showing results for "<span className="font-medium">{searchQuery}</span>"</>
                    ) : (
                      <>Real-time news updates from trusted sources</>
                    )}
                  </p>
                </div>
                
                {!loading && !error && articles.length > 0 && (                    <button
                      onClick={refreshNews}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors font-medium text-sm shadow-sm hover:shadow-md"
                    >
                    Refresh News
                  </button>
                )}
              </div>
              
              {/* Status Bar */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {getStatusMessage()}
                </div>
                
                {!loading && !error && articles.length > 0 && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live updates enabled</span>
                  </div>
                )}
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="text-red-800 dark:text-red-300">
                    <h3 className="font-medium text-lg">Unable to load news</h3>
                    <p className="text-sm mt-1">{error}</p>
                    <p className="text-xs mt-2 text-red-600 dark:text-red-400">
                      Showing cached content. Check your internet connection and try refreshing.
                    </p>
                  </div>
                  <button
                    onClick={refreshNews}
                    className="px-4 py-2 bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors text-sm font-medium"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && <LoadingSpinner />}

            {/* Empty State */}
            {!loading && !error && articles.length === 0 && (
              <EmptyState
                type={searchQuery ? 'search' : 'category'}
                searchQuery={searchQuery}
                category={getCategoryLabel(activeCategory)}
              />
            )}

            {/* Articles Grid */}
            {!loading && articles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                  <div
                    key={article.id}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ArticleCard 
                      article={article} 
                      onClick={() => handleArticleClick(article)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {!loading && !error && articles.length > 0 && articles.length >= 15 && (
              <div className="text-center mt-12">
                <button
                  onClick={refreshNews}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Article Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default App;