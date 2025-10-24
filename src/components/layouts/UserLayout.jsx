import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import useAuthStore from '../../store/authStore';

const UserLayout = ({ children }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="relative bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white shadow-xl">
        <div className="container mx-auto px-6 relative flex items-center justify-between py-4">
          {/* Logo kiri */}
          <Link
            to="/movies"
            className="text-2xl font-bold text-white hover:scale-105 transition-transform"
          >
            Absolute Cinema
          </Link>

          {/* Menu tengah absolute */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-12 font-semibold">
            <Link
              to="/movies"
              className="relative px-2 py-1 hover:text-yellow-200 transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-1 after:bg-yellow-200 after:transition-all hover:after:w-full"
            >
              Movies
            </Link>
            <Link
              to="/history"
              className="relative px-2 py-1 hover:text-yellow-200 transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-1 after:bg-yellow-200 after:transition-all hover:after:w-full"
            >
              History
            </Link>
          </div>

          {/* Profil kanan */}
          <div className="relative flex items-center" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 bg-white text-orange-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow"
              title={user?.name}
            >
              <User size={20} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-12 w-44 bg-white text-orange-600 rounded-lg shadow-lg overflow-hidden animate-fadeIn z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors flex items-center"
                >
                  <User size={16} className="mr-2" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  );
};

export default UserLayout;
