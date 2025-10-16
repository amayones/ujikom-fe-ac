import React from 'react';
import { AlertTriangle, LogIn } from 'lucide-react';

const SessionExpired = ({ isOpen, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/95 backdrop-blur-md rounded-xl p-6 w-full max-w-md border border-gray-700/50 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-yellow-500/20">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Sesi Berakhir</h3>
        </div>
        
        <p className="text-gray-300 mb-6 text-sm leading-relaxed">
          Sesi login Anda telah berakhir. Silakan login ulang untuk melanjutkan.
        </p>
        
        <button
          onClick={onLogin}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
        >
          <LogIn className="w-4 h-4" />
          Login Ulang
        </button>
      </div>
    </div>
  );
};

export default SessionExpired;