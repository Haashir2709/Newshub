import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative mb-4">
        <div className="w-14 h-14 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
        <div className="w-14 h-14 rounded-full border-4 border-brand-600 dark:border-brand-500 border-t-transparent animate-spin absolute top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center justify-center text-brand-600 dark:text-brand-400">
          <Sparkles size={16} className="animate-pulse" />
        </div>
      </div>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Loading latest dispatches...
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
        Curating real-time verified coverage
      </p>
    </div>
  );
};

export default LoadingSpinner;
