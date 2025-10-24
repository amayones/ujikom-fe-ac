import { BarChart3, TrendingUp, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Owner dashboard page
const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">$2,450</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Growth</p>
              <p className="text-2xl font-semibold text-green-600">+15.3%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
              <p className="text-2xl font-semibold text-gray-900">78%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Quick Access</h2>
          <div className="space-y-3">
            <Link
              to="/owner/reports"
              className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <BarChart3 className="h-5 w-5 text-green-600 mr-3" />
              <span className="font-medium">Financial Reports</span>
            </Link>
            <Link
              to="/owner/analytics"
              className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <TrendingUp className="h-5 w-5 text-blue-600 mr-3" />
              <span className="font-medium">Analytics Dashboard</span>
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Performance Summary</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Monthly Target</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Customer Satisfaction</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Theater Utilization</span>
                <span>78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;