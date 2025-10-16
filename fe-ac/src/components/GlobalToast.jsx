import { useState, useEffect } from 'react';

let toastQueue = [];
let setToasts = null;

export const toast = {
  success: (message) => {
    addToast(message, 'success');
  },
  error: (message) => {
    addToast(message, 'error');
  },
  info: (message) => {
    addToast(message, 'info');
  }
};

const addToast = (message, type) => {
  const id = Date.now();
  const newToast = { id, message, type };
  
  if (setToasts) {
    setToasts(prev => [...prev, newToast]);
  } else {
    toastQueue.push(newToast);
  }
  
  setTimeout(() => {
    removeToast(id);
  }, 5000);
};

const removeToast = (id) => {
  if (setToasts) {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }
};

export default function GlobalToast() {
  const [toasts, setToastsState] = useState([]);

  useEffect(() => {
    setToasts = setToastsState;
    
    if (toastQueue.length > 0) {
      setToastsState(toastQueue);
      toastQueue = [];
    }
    
    return () => {
      setToasts = null;
    };
  }, []);

  const getToastColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="toast-container fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg transition-all duration-300 ${getToastColor(toast.type)}`}
          onClick={() => removeToast(toast.id)}
        >
          <div className="flex items-center justify-between">
            <span>{toast.message}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeToast(toast.id);
              }}
              className="ml-4 text-white hover:text-gray-200 text-xl leading-none"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}