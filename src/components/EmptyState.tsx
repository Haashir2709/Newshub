import React from 'react';
import { Search, Bookmark, Newspaper, ArrowLeft } from 'lucide-react';

interface EmptyStateProps {
  type: 'search' | 'category' | 'bookmarks';
  searchQuery?: string;
  category?: string;
  onReset?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, searchQuery, category, onReset }) => {
  return (
    <div className="text-center py-20 px-4 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 flex items-center justify-center mx-auto mb-5 text-brand-600 dark:text-brand-400 shadow-sm">
        {type === 'search' && <Search size={28} />}
        {type === 'bookmarks' && <Bookmark size={28} />}
        {type === 'category' && <Newspaper size={28} />}
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        {type === 'search' && 'No Articles Match Your Search'}
        {type === 'bookmarks' && 'Your Reading List Is Empty'}
        {type === 'category' && `No Articles in ${category}`}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
        {type === 'search' && (
          <>
            We couldn't find any stories matching "<span className="font-semibold text-slate-800 dark:text-slate-200">{searchQuery}</span>". Try broader terms, company names, or explore our top categories.
          </>
        )}
        {type === 'bookmarks' && (
          <>
            Click the bookmark icon on any article card or reading view to save stories to your personal library for offline or later reading.
          </>
        )}
        {type === 'category' && (
          <>
            There are currently no new bulletins filed under this section. Check back shortly for continuous real-time dispatches.
          </>
        )}
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
        >
          <ArrowLeft size={16} />
          <span>Explore All Top Stories</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
