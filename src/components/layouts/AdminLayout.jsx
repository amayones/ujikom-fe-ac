import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Film, Calendar, Menu, X, Home, Users, Settings } from 'lucide-react';
import { useState } from 'react';
import useAuthStore from '../../store/authStore';

// Admin layout with sidebar for admin role
const AdminLayout = ({ children }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { path: '/admin/films', label: 'Films', icon: Film },
    { path: '/admin/schedules', label: 'Schedules', icon: Calendar },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col h-screen overflow-y-auto sidebar-container`}>
        <div className="flex items-center justify-between h-16 px-6 bg-blue-900 border-b border-blue-700">
          <Link to="/admin/dashboard" className="text-xl font-bold text-yellow-400">
            Admin Panel
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-8 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-white hover:bg-blue-700 transition-colors ${
                  isActive(item.path) ? 'bg-blue-700 border-r-4 border-yellow-400' : ''
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        {/* Logout button at bottom */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-white hover:bg-blue-700 rounded-lg transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">{user?.name?.charAt(0)}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;