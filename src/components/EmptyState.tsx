import React from 'react';
import { Search, FileText } from 'lucide-react';

interface EmptyStateProps {
  type: 'search' | 'category';
  searchQuery?: string;
  category?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, searchQuery, category }) => {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
        {type === 'search' ? (
          <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        ) : (
          <FileText className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {type === 'search' ? 'No articles found' : 'No articles available'}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        {type === 'search' ? (
          <>
            No articles match your search for "<span className="font-medium">{searchQuery}</span>".
            Try different keywords or browse by category.
          </>
        ) : (
          <>
            There are currently no articles available in the {category} category.
            Check back later for updates.
          </>
        )}
      </p>
    </div>
  );
};

export default EmptyState;