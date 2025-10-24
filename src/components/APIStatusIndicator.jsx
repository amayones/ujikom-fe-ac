import { useState } from 'react';
import { Wifi, WifiOff, Settings } from 'lucide-react';
import useReportStore from '../store/reportStore';
import useAuthStore from '../store/authStore';
import { ROLES } from '../utils/roles';

// API Status Indicator for Owner to toggle between real API and mock data
const APIStatusIndicator = () => {
  const { user } = useAuthStore();
  const { useRealAPI, toggleAPIMode, error } = useReportStore();
  const [showSettings, setShowSettings] = useState(false);

  // Only show for Owner role
  if (user?.role !== ROLES.OWNER) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
          useRealAPI 
            ? error 
              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
        title={useRealAPI ? (error ? 'API Error - Using Demo Data' : 'Using Real API') : 'Using Demo Data'}
      >
        {useRealAPI ? (
          error ? <WifiOff size={16} /> : <Wifi size={16} />
        ) : (
          <Settings size={16} />
        )}
        <span className="ml-2">
          {useRealAPI ? (error ? 'Demo Mode' : 'Live Data') : 'Demo Mode'}
        </span>
      </button>

      {showSettings && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <h3 className="font-semibold text-gray-900 mb-3">Data Source Settings</h3>
          
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="dataSource"
                checked={useRealAPI}
                onChange={() => useRealAPI || toggleAPIMode()}
                className="mr-3"
              />
              <div>
                <div className="font-medium">Real API Data</div>
                <div className="text-sm text-gray-600">Live data from backend</div>
              </div>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="dataSource"
                checked={!useRealAPI}
                onChange={() => !useRealAPI || toggleAPIMode()}
                className="mr-3"
              />
              <div>
                <div className="font-medium">Demo Data</div>
                <div className="text-sm text-gray-600">Sample data for testing</div>
              </div>
            </label>
          </div>

          {error && (
            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
              <div className="font-medium text-yellow-800">API Error:</div>
              <div className="text-yellow-700">{error}</div>
            </div>
          )}

          <button
            onClick={() => setShowSettings(false)}
            className="mt-3 w-full px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default APIStatusIndicator;