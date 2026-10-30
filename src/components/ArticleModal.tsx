import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Clock, User, Share2, Bookmark, BookmarkCheck, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { NewsArticle } from '../types/news';
import { getRelevantEditorialImage } from '../utils/imageHelper';

interface ArticleModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onShare: () => void;
  relatedArticles?: NewsArticle[];
  onSelectArticle?: (article: NewsArticle) => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ 
  article, 
  isOpen, 
  onClose,
  isBookmarked,
  onToggleBookmark,
  onShare,
  relatedArticles = [],
  onSelectArticle,
}) => {
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    if (article) {
      setImgSrc(article.urlToImage);
    }
  }, [article]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technology':
        return 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'business':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'science':
        return 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'health':
        return 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800';
      case 'sports':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'entertainment':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'politics':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700';
      case 'world':
        return 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      default:
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    }
  };

  const handleImageError = () => {
    const fallback = getRelevantEditorialImage(article.category, article.title, article.description);
    setImgSrc(fallback);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-4xl bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden my-8 z-10 animate-fadeIn">
          
          {/* Top Sticky Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
                {article.source.name}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onToggleBookmark}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={isBookmarked ? 'Remove from reading list' : 'Save for later'}
              >
                {isBookmarked ? (
                  <BookmarkCheck size={18} className="text-brand-600 dark:text-brand-400 fill-brand-600 dark:fill-brand-400" />
                ) : (
                  <Bookmark size={18} />
                )}
              </button>
              <button
                onClick={onShare}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Share article"
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-rose-600 transition-colors ml-1"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="max-h-[80vh] overflow-y-auto">
            {/* Hero Image */}
            <div className="relative h-64 sm:h-96 w-full bg-slate-900 overflow-hidden">
              <img
                src={imgSrc}
                alt={article.title}
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              {/* Photo Attribution */}
              <div className="absolute bottom-3 right-4 text-[11px] text-white/70 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                Photo: {article.photographerCredit || 'Editorial Photography / Unsplash'}
              </div>
            </div>

            {/* Article Content Area */}
            <div className="p-6 sm:p-10">
              {/* Article Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                {article.title}
              </h1>

              {/* Author & Timestamp Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                {article.author && (
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-950 flex items-center justify-center text-brand-700 dark:text-brand-300 font-semibold text-xs">
                      {article.author.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{article.author}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1.5">
                  <Calendar size={14} />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock size={14} />
                  <span>{article.readTime || '4 min read'}</span>
                </div>
              </div>

              {/* Key Takeaways Box */}
              {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                <div className="bg-brand-50/70 dark:bg-brand-950/30 border border-brand-200/80 dark:border-brand-800/60 rounded-2xl p-5 sm:p-6 mb-8">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-3">
                    <Sparkles size={16} />
                    <span>Key Takeaways & Fast Facts</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    {article.keyTakeaways.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-600 dark:bg-brand-400 mt-2 flex-shrink-0"></span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                {article.description}
              </p>

              {/* Full Article Body */}
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  {article.content}
                </p>
                <p>
                  Specialists from international regulatory oversight bodies and industry working groups continue to analyze the evolving data. The long-term macroeconomic and societal impact will be evaluated during subsequent fiscal consultations and multilateral symposiums scheduled across the forthcoming quarter.
                </p>
              </div>

              {/* External Source Action Box */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Published originally by <span className="font-semibold text-slate-700 dark:text-slate-300">{article.source.name}</span>
                </div>
                
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <span>Read on {article.source.name}</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Related Articles in Same Category */}
              {relatedArticles.length > 0 && onSelectArticle && (
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Related Coverage in {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedArticles.slice(0, 2).map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => onSelectArticle(rel)}
                        className="group flex gap-3.5 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 bg-slate-50/50 dark:bg-slate-900/50 cursor-pointer transition-all duration-200"
                      >
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200 dark:bg-slate-800">
                          <img
                            src={rel.urlToImage}
                            alt={rel.title}
                            onError={(e) => {
                              e.currentTarget.src = getRelevantEditorialImage(rel.category, rel.title, rel.description);
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                            {rel.title}
                          </h4>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                            <span>{rel.source.name}</span>
                            <span>•</span>
                            <span>{rel.readTime || '3 min'}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
