import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, type = 'danger' }) => {
  if (!isOpen) return null;

  const getStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'text-red-400',
          confirmBtn: 'bg-red-600 hover:bg-red-700',
          iconBg: 'bg-red-500/20'
        };
      case 'warning':
        return {
          icon: 'text-yellow-400',
          confirmBtn: 'bg-yellow-600 hover:bg-yellow-700',
          iconBg: 'bg-yellow-500/20'
        };
      default:
        return {
          icon: 'text-red-400',
          confirmBtn: 'bg-red-600 hover:bg-red-700',
          iconBg: 'bg-red-500/20'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/95 backdrop-blur-md rounded-xl p-6 w-full max-w-md border border-gray-700/50 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${styles.iconBg}`}>
              <AlertTriangle className={`w-6 h-6 ${styles.icon}`} />
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-300 mb-6 text-sm leading-relaxed">{message}</p>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 ${styles.confirmBtn} text-white rounded-lg transition-colors font-medium`}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;