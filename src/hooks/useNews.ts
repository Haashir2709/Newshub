import { useState, useEffect, useCallback, useRef } from 'react';
import { NewsArticle, NewsCategory } from '../types/news';
import { newsService } from '../services/newsService';

export const useNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchNews = useCallback(async (category: NewsCategory, query: string = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await newsService.fetchNews(category, query);
      setArticles(response.articles);
      setLastUpdated(new Date());
      
      if (response.articles.length > 0) {
        console.log(`✅ Loaded ${response.articles.length} articles for ${category} category`);
      }
    } catch (err) {
      setError('Failed to fetch news. Please check your connection and try again.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedFetchNews = useCallback((category: NewsCategory, query: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      fetchNews(category, query);
    }, 500);
  }, [fetchNews]);

  useEffect(() => {
    if (searchQuery.trim()) {
      debouncedFetchNews(activeCategory, searchQuery);
    } else {
      fetchNews(activeCategory, '');
    }
  }, [activeCategory, fetchNews, debouncedFetchNews, searchQuery]);

  useEffect(() => {
    const startAutoRefresh = () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      
      refreshIntervalRef.current = setInterval(() => {
        if (!searchQuery.trim()) {
          console.log('🔄 Auto-refreshing news...');
          fetchNews(activeCategory, '');
        }
      }, 5 * 60 * 1000);
    };

    startAutoRefresh();

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [activeCategory, searchQuery, fetchNews]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  const handleCategoryChange = (category: NewsCategory) => {
    setActiveCategory(category);
    setError(null);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setError(null);
  };

  const refreshNews = useCallback(() => {
    console.log('🔄 Manual refresh triggered');
    fetchNews(activeCategory, searchQuery);
  }, [activeCategory, searchQuery, fetchNews]);

  const getTimeSinceUpdate = useCallback(() => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours}h ago`;
    }
  }, [lastUpdated]);

  return {
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
  };
};