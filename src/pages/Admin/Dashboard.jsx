import { Film, Calendar, Users, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

// Admin dashboard page
const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Film className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Films</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Schedules</p>
              <p className="text-2xl font-semibold text-gray-900">48</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Customers</p>
              <p className="text-2xl font-semibold text-gray-900">1,234</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Settings className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">System Status</p>
              <p className="text-2xl font-semibold text-green-600">Online</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/admin/films"
              className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Film className="h-5 w-5 text-blue-600 mr-3" />
              <span className="font-medium">Manage Films</span>
            </Link>
            <Link
              to="/admin/schedules"
              className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Calendar className="h-5 w-5 text-green-600 mr-3" />
              <span className="font-medium">Manage Schedules</span>
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b">
              <span>New film added: "Spider-Man"</span>
              <span className="text-gray-500">2 hours ago</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span>Schedule updated for Theater 1</span>
              <span className="text-gray-500">4 hours ago</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>Customer registration: John Doe</span>
              <span className="text-gray-500">6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;