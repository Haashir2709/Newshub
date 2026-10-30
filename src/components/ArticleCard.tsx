import React, { useState } from 'react';
import { ExternalLink, Clock, User, Share2, Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';
import { NewsArticle } from '../types/news';
import { getRelevantEditorialImage } from '../utils/imageHelper';

interface ArticleCardProps {
  article: NewsArticle;
  onClick: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent) => void;
  onShare: (e: React.MouseEvent) => void;
  viewMode?: 'grid' | 'list';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onClick,
  isBookmarked,
  onToggleBookmark,
  onShare,
  viewMode = 'grid'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(article.urlToImage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technology':
        return 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800';
      case 'business':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800';
      case 'science':
        return 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/80 dark:border-purple-800';
      case 'health':
        return 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200/80 dark:border-teal-800';
      case 'sports':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200/80 dark:border-amber-800';
      case 'entertainment':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200/80 dark:border-rose-800';
      case 'politics':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300/80 dark:border-slate-700';
      case 'world':
        return 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200/80 dark:border-sky-800';
      default:
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-800';
    }
  };

  const handleImageError = () => {
    const fallback = getRelevantEditorialImage(article.category, article.title, article.description);
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
    }
    setImageLoaded(true);
  };

  if (viewMode === 'list') {
    return (
      <article
        onClick={onClick}
        className="group relative bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5 items-start sm:items-center"
      >
        {/* Thumbnail */}
        <div className="relative w-full sm:w-56 h-44 sm:h-36 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
          <img
            src={imgSrc}
            alt={article.title}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="absolute top-2.5 left-2.5">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{article.source.name}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock size={12} />
                <span>{formatDate(article.publishedAt)}</span>
              </span>
              <span>•</span>
              <span>{article.readTime || '3 min read'}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200 line-clamp-2 mb-2">
              {article.title}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
              {article.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            {article.author ? (
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                By {article.author}
              </span>
            ) : <span />}

            <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={onToggleBookmark}
                className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={isBookmarked ? 'Remove from reading list' : 'Save to reading list'}
              >
                {isBookmarked ? (
                  <BookmarkCheck size={16} className="text-brand-600 dark:text-brand-400 fill-brand-600 dark:fill-brand-400" />
                ) : (
                  <Bookmark size={16} />
                )}
              </button>
              <button
                onClick={onShare}
                className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Share article"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article 
      onClick={onClick}
      className="group bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Article Image Container */}
      <div className="relative h-52 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-pulse"></div>
        )}
        <img
          src={imgSrc}
          alt={article.title}
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center space-x-1.5 pointer-events-auto">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm border ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            {article.isBreaking && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white shadow-sm animate-pulse">
                Breaking
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-1 pointer-events-auto">
            <button
              onClick={onToggleBookmark}
              className="p-2 rounded-full bg-slate-900/60 backdrop-blur-md text-white/90 hover:text-white hover:bg-slate-900/90 transition-all duration-200 shadow-sm"
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              {isBookmarked ? (
                <BookmarkCheck size={15} className="text-brand-400 fill-brand-400" />
              ) : (
                <Bookmark size={15} />
              )}
            </button>
            <button
              onClick={onShare}
              className="p-2 rounded-full bg-slate-900/60 backdrop-blur-md text-white/90 hover:text-white hover:bg-slate-900/90 transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100"
              title="Share article"
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2.5">
            <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[150px]">
              {article.source.name}
            </span>
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1">
                <Clock size={12} />
                <span>{formatDate(article.publishedAt)}</span>
              </span>
              <span>•</span>
              <span>{article.readTime || '3 min read'}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200 line-clamp-2">
            {article.title}
          </h2>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {article.description}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          {article.author ? (
            <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
              <User size={13} className="flex-shrink-0" />
              <span className="truncate">By {article.author}</span>
            </div>
          ) : (
            <span className="text-slate-400 dark:text-slate-500 italic">News Desk</span>
          )}
          
          <div className="flex items-center space-x-2.5">
            <span className="text-brand-600 dark:text-brand-400 font-semibold inline-flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
              <span>Read story</span>
              <ArrowRight size={13} />
            </span>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 p-1 rounded transition-colors"
              title="Open source article in new tab"
            >
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
