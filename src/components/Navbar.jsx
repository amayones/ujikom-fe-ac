import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Film, Calendar, User, BarChart3, CreditCard, Users, Clock, Armchair, Receipt, Printer, Scan, LogOut } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();
    const currentPath = location.pathname;
    
    // Detect role from URL
    const getCurrentRole = () => {
        if (currentPath.startsWith('/admin')) return 'admin';
        if (currentPath.startsWith('/owner')) return 'owner';
        if (currentPath.startsWith('/cashier')) return 'cashier';
        return 'customer';
    };

    const currentRole = getCurrentRole();
    const isActive = (path) => {
        // Exact match for home and dashboard routes
        if (path === '/' || path === '/admin' || path === '/owner' || path === '/cashier') {
            return currentPath === path;
        }
        // For other routes, check if current path starts with the link path
        return currentPath === path || currentPath.startsWith(path + '/');
    };

    const getNavConfig = () => {
        switch (currentRole) {
            case 'admin':
                return {
                    bgColor: 'bg-gradient-to-r from-slate-800 via-slate-900 to-gray-900',
                    roleLabel: 'Admin Panel',
                    links: [
                        { to: '/admin', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
                        { to: '/admin/movies', label: 'Film', icon: <Film className="w-4 h-4" /> },
                        { to: '/admin/customers', label: 'Pelanggan', icon: <Users className="w-4 h-4" /> },
                        { to: '/admin/schedules', label: 'Jadwal', icon: <Clock className="w-4 h-4" /> },
                        { to: '/admin/prices', label: 'Harga', icon: <CreditCard className="w-4 h-4" /> },
                        { to: '/admin/cashiers', label: 'Kasir', icon: <User className="w-4 h-4" /> },
                        { to: '/admin/seats', label: 'Kursi', icon: <Armchair className="w-4 h-4" /> }
                    ]
                };
            case 'owner':
                return {
                    bgColor: 'bg-gradient-to-r from-indigo-800 via-purple-900 to-slate-900',
                    roleLabel: 'Owner Panel',
                    links: [
                        { to: '/owner', label: 'Laporan Keuangan', icon: <BarChart3 className="w-4 h-4" /> }
                    ]
                };
            case 'cashier':
                return {
                    bgColor: 'bg-gradient-to-r from-orange-700 via-amber-800 to-yellow-900',
                    roleLabel: 'Kasir Panel',
                    links: [
                        { to: '/cashier', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
                        { to: '/cashier/offline-booking', label: 'Pesan Offline', icon: <Receipt className="w-4 h-4" /> },
                        { to: '/cashier/print-ticket', label: 'Cetak Tiket', icon: <Printer className="w-4 h-4" /> },
                        { to: '/cashier/process-online', label: 'Proses Online', icon: <Scan className="w-4 h-4" /> }
                    ]
                };
            default: // customer
                return {
                    bgColor: 'bg-gradient-to-r from-red-700 via-rose-800 to-pink-900',
                    roleLabel: 'Absolute Cinema',
                    links: [
                        { to: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
                        { to: '/now-playing', label: 'Sedang Tayang', icon: <Film className="w-4 h-4" /> },
                        { to: '/coming-soon', label: 'Segera Tayang', icon: <Calendar className="w-4 h-4" /> },
                        { to: '/history', label: 'Riwayat', icon: <Receipt className="w-4 h-4" /> },
                        { to: '/profile', label: 'Profile', icon: <User className="w-4 h-4" /> }
                    ]
                };
        }
    };

    const navConfig = getNavConfig();

    return (
        <nav className={`${navConfig.bgColor} shadow-xl border-b border-white/10 sticky top-0 z-50`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link 
                        to={currentRole === 'customer' ? '/' : `/${currentRole}`} 
                        className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300"
                    >
                        <Film className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-white text-xl font-bold tracking-wide">{navConfig.roleLabel}</span>
                    </Link>

                    {/* Navigation Links - Centered */}
                    <div className="hidden lg:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
                        {navConfig.links.map((link) => (
                            <Link 
                                key={link.to}
                                to={link.to} 
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive(link.to) 
                                        ? 'bg-white text-gray-900' 
                                        : 'text-white/90 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center space-x-3">
                        {currentRole === 'customer' ? (
                            <Link 
                                to="/login" 
                                className="bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                            >
                                Login
                            </Link>
                        ) : (
                            <button 
                                onClick={() => window.location.href = '/'}
                                className="flex items-center space-x-2 text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            

        </nav>
    );
}