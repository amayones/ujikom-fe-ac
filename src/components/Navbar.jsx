import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Film, Calendar, User, BarChart3, CreditCard, Users, Clock, Armchair, Receipt, Printer, Scan, LogOut } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();
    const currentPath = location.pathname;
    

    const getCurrentRole = () => {
        if (currentPath.startsWith('/admin')) return 'admin';
        if (currentPath.startsWith('/owner')) return 'owner';
        if (currentPath.startsWith('/cashier')) return 'cashier';
        return 'customer';
    };

    const currentRole = getCurrentRole();
    const isActive = (path) => {

        if (path === '/' || path === '/admin' || path === '/owner' || path === '/cashier') {
            return currentPath === path;
        }

        return currentPath === path || currentPath.startsWith(path + '/');
    };

    const getNavConfig = () => {
        switch (currentRole) {
            case 'admin':
                return {
                    bgColor: 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800',
                    roleLabel: 'Admin Panel',
                    accentColor: 'bg-blue-500',
                    hoverColor: 'hover:bg-blue-500/20',
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
                    bgColor: 'bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800',
                    roleLabel: 'Owner Panel',
                    accentColor: 'bg-purple-500',
                    hoverColor: 'hover:bg-purple-500/20',
                    links: [
                        { to: '/owner', label: 'Laporan Keuangan', icon: <BarChart3 className="w-4 h-4" /> }
                    ]
                };
            case 'cashier':
                return {
                    bgColor: 'bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-800',
                    roleLabel: 'Kasir Panel',
                    accentColor: 'bg-emerald-500',
                    hoverColor: 'hover:bg-emerald-500/20',
                    links: [
                        { to: '/cashier', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
                        { to: '/cashier/offline-booking', label: 'Pesan Offline', icon: <Receipt className="w-4 h-4" /> },
                        { to: '/cashier/print-ticket', label: 'Cetak Tiket', icon: <Printer className="w-4 h-4" /> },
                        { to: '/cashier/process-online', label: 'Proses Online', icon: <Scan className="w-4 h-4" /> }
                    ]
                };
            default:
                return {
                    bgColor: 'bg-gradient-to-br from-red-900 via-rose-900 to-red-800',
                    roleLabel: 'Absolute Cinema',
                    accentColor: 'bg-red-500',
                    hoverColor: 'hover:bg-red-500/20',
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
        <nav className={`${navConfig.bgColor} shadow-2xl border-b-2 border-white/20 backdrop-blur-sm sticky top-0 z-50`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link 
                        to={currentRole === 'customer' ? '/' : `/${currentRole}`} 
                        className="flex items-center space-x-3 group"
                    >
                        <div className={`${navConfig.accentColor} p-2 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Film className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white text-xl font-bold tracking-tight">{navConfig.roleLabel}</span>
                    </Link>

                    {/* Navigation Links - Centered */}
                    <div className="hidden lg:flex items-center space-x-2 absolute left-1/2 transform -translate-x-1/2">
                        {navConfig.links.map((link) => (
                            <Link 
                                key={link.to}
                                to={link.to} 
                                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                                    isActive(link.to) 
                                        ? `${navConfig.accentColor} text-white shadow-lg scale-105` 
                                        : `text-white/80 ${navConfig.hoverColor} hover:text-white`
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
                                className={`${navConfig.accentColor} text-white hover:opacity-90 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105`}
                            >
                                Login
                            </Link>
                        ) : (
                            <button 
                                onClick={() => window.location.href = '/'}
                                className={`flex items-center space-x-2 text-white/80 ${navConfig.hoverColor} px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:text-white`}
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