import { ShoppingCart, Ticket, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Cashier dashboard page
const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Cashier Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Sales</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Ticket className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tickets Processed</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Walk-in Customers</p>
              <p className="text-2xl font-semibold text-gray-900">18</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Service Time</p>
              <p className="text-2xl font-semibold text-gray-900">3.2m</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/cashier/booking"
              className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-green-600 mr-3" />
              <span className="font-medium">New Walk-in Booking</span>
            </Link>
            <Link
              to="/cashier/tickets"
              className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Ticket className="h-5 w-5 text-blue-600 mr-3" />
              <span className="font-medium">Process Online Tickets</span>
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Today's Schedule</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">Spider-Man: No Way Home</p>
                <p className="text-gray-500">Theater 1</p>
              </div>
              <span className="text-gray-600">14:00</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">The Batman</p>
                <p className="text-gray-500">Theater 2</p>
              </div>
              <span className="text-gray-600">16:30</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">Dune</p>
                <p className="text-gray-500">Theater 1</p>
              </div>
              <span className="text-gray-600">19:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;