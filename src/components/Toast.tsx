import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
      <div className="flex items-center space-x-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-2xl border border-slate-700/50 dark:border-slate-200">
        <CheckCircle2 size={18} className="text-emerald-400 dark:text-emerald-600 flex-shrink-0" />
        <span className="text-sm font-medium pr-2">{message}</span>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white dark:hover:text-slate-900 p-1"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
