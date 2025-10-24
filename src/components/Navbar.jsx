import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Film, History, Menu, X, Ticket, Star } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { ROLES } from '../utils/roles';

const Navbar = () => {
  const { user, isAuth, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // Only show enhanced navbar for customers
  if (user?.role === ROLES.CUSTOMER) {
    const navItems = [
      { path: '/movies', label: 'Now Playing', icon: Film },
      { path: '/history', label: 'My Bookings', icon: Ticket },
    ];

    return (
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/movies" className="flex items-center space-x-3 group">
                <Film className="h-8 w-8 text-blue-600 group-hover:text-blue-500 transition-colors duration-300" />
                <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  Absolute Cinema
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-8">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive(path)
                        ? 'text-white bg-blue-600 shadow-lg'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* User Menu - Right Side */}
            <div className="hidden md:flex items-center">
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
                  <div className="relative">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                  <hr className="my-1 border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-4 py-3 space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(path)
                      ? 'text-red-400 bg-red-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
              
              <hr className="my-3 border-gray-700" />
              
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>My Profile</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    );
  }

  // Original navbar for other roles
  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-accent">
            Absolute Cinema
          </Link>

          <div className="flex items-center space-x-6">
            {isAuth ? (
              <>
                <Link to="/movies" className="hover:text-accent transition-colors">
                  Movies
                </Link>
                
                {user?.role === ROLES.ADMIN && (
                  <div className="flex space-x-4">
                    <Link to="/admin/films" className="hover:text-accent transition-colors flex items-center">
                      <Film size={20} className="mr-1" />
                      Films
                    </Link>
                    <Link to="/admin/schedules" className="hover:text-accent transition-colors">
                      Schedules
                    </Link>
                  </div>
                )}

                {user?.role === ROLES.OWNER && (
                  <Link to="/owner/reports" className="hover:text-accent transition-colors flex items-center">
                    <BarChart3 size={20} className="mr-1" />
                    Reports
                  </Link>
                )}

                <div className="flex items-center space-x-2">
                  <span className="text-sm">Hi, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="hover:text-accent transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="hover:text-accent transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-accent text-primary px-4 py-2 rounded hover:bg-yellow-600 transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;