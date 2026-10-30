import React from 'react';
import { Clock, Flame, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';
import { NewsArticle } from '../types/news';
import { getRelevantEditorialImage } from '../utils/imageHelper';

interface HeroSpotlightProps {
  featuredArticle: NewsArticle;
  secondaryArticles: NewsArticle[];
  onArticleClick: (article: NewsArticle) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (e: React.MouseEvent, article: NewsArticle) => void;
}

const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  featuredArticle,
  secondaryArticles,
  onArticleClick,
  isBookmarked,
  onToggleBookmark,
}) => {
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'technology':
        return 'bg-indigo-500/90 text-white';
      case 'business':
        return 'bg-emerald-500/90 text-white';
      case 'science':
        return 'bg-purple-500/90 text-white';
      case 'health':
        return 'bg-teal-500/90 text-white';
      case 'sports':
        return 'bg-amber-500/90 text-white';
      case 'entertainment':
        return 'bg-rose-500/90 text-white';
      case 'politics':
        return 'bg-slate-700/90 text-white';
      case 'world':
        return 'bg-sky-500/90 text-white';
      default:
        return 'bg-blue-600/90 text-white';
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, article: NewsArticle) => {
    e.currentTarget.src = getRelevantEditorialImage(article.category, article.title, article.description);
  };

  return (
    <section className="mb-10">
      <div className="flex items-center space-x-2 mb-4 text-xs font-semibold tracking-wider uppercase text-brand-600 dark:text-brand-400">
        <Flame size={16} className="text-rose-500 fill-rose-500 animate-pulse" />
        <span>Top Stories & Editor's Spotlight</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Hero Card (8 cols) */}
        <div 
          onClick={() => onArticleClick(featuredArticle)}
          className="lg:col-span-8 group relative rounded-2xl overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer min-h-[380px] sm:min-h-[440px] flex flex-col justify-end"
        >
          {/* Background Image with Zoom Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={featuredArticle.urlToImage}
              alt={featuredArticle.title}
              onError={(e) => handleImageError(e, featuredArticle)}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Multi-layer Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent"></div>
          </div>

          {/* Top Badges & Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm ${getCategoryBadgeClass(featuredArticle.category)}`}>
                {featuredArticle.category}
              </span>
              {featuredArticle.isBreaking && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-600 text-white shadow-sm flex items-center space-x-1.5 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  <span>Breaking</span>
                </span>
              )}
            </div>

            <button
              onClick={(e) => onToggleBookmark(e, featuredArticle)}
              className="p-2.5 rounded-full bg-slate-900/60 backdrop-blur-md text-white/80 hover:text-white hover:bg-slate-900/90 transition-all duration-200 border border-white/10"
              title={isBookmarked(featuredArticle.id) ? 'Remove from reading list' : 'Save for later'}
            >
              {isBookmarked(featuredArticle.id) ? (
                <BookmarkCheck size={18} className="text-brand-400 fill-brand-400" />
              ) : (
                <Bookmark size={18} />
              )}
            </button>
          </div>

          {/* Hero Bottom Content */}
          <div className="relative z-10 p-6 sm:p-8">
            <div className="flex items-center space-x-3 text-xs sm:text-sm text-slate-300 mb-2">
              <span className="font-medium text-white">{featuredArticle.source.name}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock size={13} />
                <span>{featuredArticle.readTime || '4 min read'}</span>
              </span>
              {featuredArticle.author && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline text-slate-300">By {featuredArticle.author}</span>
                </>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-brand-300 transition-colors duration-200">
              {featuredArticle.title}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-2 max-w-3xl mb-4">
              {featuredArticle.description}
            </p>

            <div className="flex items-center space-x-2 text-brand-300 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200">
              <span>Read Full Report</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>

        {/* Secondary Trending Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
          {secondaryArticles.slice(0, 2).map((article) => (
            <div
              key={article.id}
              onClick={() => onArticleClick(article)}
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-[#131B2E] border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between flex-1"
            >
              <div>
                <div className="relative h-36 w-full rounded-xl overflow-hidden mb-3.5 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    onError={(e) => handleImageError(e, article)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${getCategoryBadgeClass(article.category)}`}>
                      {article.category}
                    </span>
                  </div>
                  <button
                    onClick={(e) => onToggleBookmark(e, article)}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-slate-900/60 backdrop-blur-md text-white/90 hover:text-white transition-all duration-200"
                    title={isBookmarked(article.id) ? 'Remove bookmark' : 'Bookmark'}
                  >
                    {isBookmarked(article.id) ? (
                      <BookmarkCheck size={14} className="text-brand-400 fill-brand-400" />
                    ) : (
                      <Bookmark size={14} />
                    )}
                  </button>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{article.source.name}</span>
                  <span>•</span>
                  <span>{article.readTime || '3 min read'}</span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
                  {article.title}
                </h3>
              </div>

              <div className="flex items-center space-x-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 pt-3 mt-2 border-t border-slate-100 dark:border-slate-800">
                <span>View Story</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSpotlight;
