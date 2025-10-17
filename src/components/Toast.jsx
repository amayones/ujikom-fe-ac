import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ type = 'success', message, isVisible, onClose, duration = 3000 }) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'error': return <XCircle className="w-5 h-5" />;
      case 'warning': return <AlertCircle className="w-5 h-5" />;
      case 'info': return <Info className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success': return 'bg-green-600 border-green-500 text-white';
      case 'error': return 'bg-red-600 border-red-500 text-white';
      case 'warning': return 'bg-yellow-600 border-yellow-500 text-white';
      case 'info': return 'bg-blue-600 border-blue-500 text-white';
      default: return 'bg-green-600 border-green-500 text-white';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-80 ${getStyles()}`}>
        {getIcon()}
        <span className="flex-1 font-medium">{message}</span>
        <button
          onClick={onClose}
          className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}