import React, { useState } from 'react';
import { ExternalLink, Clock, User, Eye, Share2 } from 'lucide-react';
import { NewsArticle } from '../types/news';

interface ArticleCardProps {
  article: NewsArticle;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      return `${diffInDays}d ago`;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'business':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'entertainment':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'health':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'science':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'sports':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'technology':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'politics':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'world':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'general':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(article.url);
        console.log('Link copied to clipboard');
      } catch (error) {
        console.error('Failed to copy link');
      }
    }
  };

  const handleExternalLink = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const isRecent = () => {
    const date = new Date(article.publishedAt);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    return diffInHours < 2;
  };

  return (
    <article 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Article Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {!imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
              </div>
            )}
            <img
              src={article.urlToImage}
              alt={article.title}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
              loading="lazy"
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <div className="w-16 h-16 bg-gray-400 rounded-lg mx-auto mb-2 opacity-50 flex items-center justify-center">
                <Eye size={24} />
              </div>
              <span className="text-sm">Image unavailable</span>
            </div>
          </div>
        )}
        
        {/* Overlay with category and actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent">
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            {isRecent() && (
              <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium animate-pulse">
                LIVE
              </span>
            )}
          </div>
          
          <div className="absolute top-3 right-3">
            <button
              onClick={handleShare}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white hover:text-blue-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700 dark:text-gray-300 truncate max-w-32">
              {article.source.name}
            </span>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {article.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          {article.author && (
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 truncate">
              <User size={14} />
              <span className="truncate max-w-32">By {article.author}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onClick}
              className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium"
            >
              Read More
            </button>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleExternalLink}
              className="inline-flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link"
              title="Open original article"
            >
              <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;