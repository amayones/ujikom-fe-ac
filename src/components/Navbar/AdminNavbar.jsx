import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { UserCircle, Menu, X, Film, Users, Calendar, Settings, BarChart3, LogOut } from "lucide-react";
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

export default function AdminNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
            logout();
            navigate('/login');
        } catch (error) {
            logout();
            navigate('/login');
        }
    };

    const navLinks = [
        { href: "/admin/dashboard", label: "Dashboard", icon: <BarChart3 size={16} /> },
        { href: "/admin/movies", label: "Kelola Film", icon: <Film size={16} /> },
        { href: "/admin/schedules", label: "Jadwal", icon: <Calendar size={16} /> },
        { href: "/admin/users", label: "Pengguna", icon: <Users size={16} /> },
    ];

    const isActive = (path) => {
        const currentPath = location.pathname.replace(/\/+$/, "") || "/";
        const targetPath = path.replace(/\/+$/, "") || "/";
        return currentPath === targetPath;
    };

    return (
        <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 border-b border-gray-700">
            <div className="w-full px-6 py-4 flex items-center justify-between relative">
                <div className="flex items-center gap-2">
                    <Settings className="text-blue-500" size={28} />
                    <Link to="/admin/dashboard" className="text-xl md:text-2xl font-bold text-blue-500 tracking-wide hover:text-blue-400 transition-colors">
                        Admin Panel
                    </Link>
                </div>

                <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={`flex items-center gap-1 text-sm font-medium relative transition-colors ${isActive(link.href) ? "text-blue-400" : "hover:text-blue-300"}`}
                        >
                            {link.icon} {link.label}
                            {isActive(link.href) && (
                                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-blue-500 rounded-full"></span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <span className="hidden md:block text-sm text-gray-300">Admin: {user?.nama || user?.name}</span>
                    <Link to="/admin/profile" className="hidden md:flex items-center gap-1 text-sm font-medium hover:text-blue-400 transition-colors">
                        <UserCircle size={18} /> Profile
                    </Link>
                    <button onClick={handleLogout} className="hidden md:flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition">
                        <LogOut size={14} /> Logout
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white hover:text-blue-400 transition-colors">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-gray-900 border-t border-gray-700 px-6 py-4">
                    <nav className="flex flex-col space-y-3 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link key={link.href} to={link.href} className={`flex items-center gap-2 py-2 ${isActive(link.href) ? "text-blue-400 font-semibold" : "hover:text-blue-300"}`}>
                                {link.icon} {link.label}
                            </Link>
                        ))}
                        <Link to="/admin/profile" className="flex items-center gap-2 hover:text-blue-400 py-2">
                            <UserCircle size={16} /> Profile
                        </Link>
                        <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-400 py-2 text-left">
                            <LogOut size={16} /> Logout
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}