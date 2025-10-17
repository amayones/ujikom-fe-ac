import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Film, Calendar, User, Settings, BarChart3, CreditCard, Users, Clock, Armchair, Receipt, Printer, Scan } from 'lucide-react';

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
    const isActive = (path) => currentPath === path || currentPath.startsWith(path + '/');

    const getNavConfig = () => {
        switch (currentRole) {
            case 'admin':
                return {
                    bgColor: 'bg-gradient-to-r from-green-800 to-green-900',
                    roleLabel: 'Admin Panel',
                    links: [
                        { to: '/admin', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
                        { to: '/admin/movies', label: 'Kelola Film', icon: <Film className="w-4 h-4" /> },
                        { to: '/admin/customers', label: 'Kelola Pelanggan', icon: <Users className="w-4 h-4" /> },
                        { to: '/admin/schedules', label: 'Kelola Jadwal', icon: <Clock className="w-4 h-4" /> },
                        { to: '/admin/prices', label: 'Kelola Harga', icon: <CreditCard className="w-4 h-4" /> },
                        { to: '/admin/cashiers', label: 'Kelola Kasir', icon: <User className="w-4 h-4" /> },
                        { to: '/admin/seats', label: 'Kelola Kursi', icon: <Armchair className="w-4 h-4" /> }
                    ]
                };
            case 'owner':
                return {
                    bgColor: 'bg-gradient-to-r from-purple-800 to-purple-900',
                    roleLabel: 'Owner Dashboard',
                    links: [
                        { to: '/owner', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> }
                    ]
                };
            case 'cashier':
                return {
                    bgColor: 'bg-gradient-to-r from-yellow-700 to-yellow-800',
                    roleLabel: 'Kasir',
                    links: [
                        { to: '/cashier', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
                        { to: '/cashier/offline-booking', label: 'Pesan Tiket Offline', icon: <Receipt className="w-4 h-4" /> },
                        { to: '/cashier/print-ticket', label: 'Cetak Tiket', icon: <Printer className="w-4 h-4" /> },
                        { to: '/cashier/process-online', label: 'Proses Tiket Online', icon: <Scan className="w-4 h-4" /> }
                    ]
                };
            default: // customer
                return {
                    bgColor: 'bg-gradient-to-r from-red-800 to-red-900',
                    roleLabel: 'Absolute Cinema',
                    links: [
                        { to: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
                        { to: '/now-playing', label: 'Sedang Tayang', icon: <Film className="w-4 h-4" /> },
                        { to: '/coming-soon', label: 'Segera Tayang', icon: <Calendar className="w-4 h-4" /> },
                        { to: '/history', label: 'Riwayat Pemesanan', icon: <Receipt className="w-4 h-4" /> },
                        { to: '/profile', label: 'Profile', icon: <User className="w-4 h-4" /> }
                    ]
                };
        }
    };

    const navConfig = getNavConfig();

    return (
        <nav className={`${navConfig.bgColor} shadow-xl border-b border-gray-700`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to={currentRole === 'customer' ? '/' : `/${currentRole}`} className="flex items-center space-x-3 group">
                        <div className="text-white text-2xl font-bold group-hover:scale-110 transition-transform">🎬</div>
                        <span className="text-white text-xl font-bold">{navConfig.roleLabel}</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navConfig.links.map((link) => (
                            <Link 
                                key={link.to}
                                to={link.to} 
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive(link.to) 
                                        ? 'bg-white/20 text-white shadow-lg' 
                                        : 'text-gray-200 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center space-x-3">
                        {currentRole === 'customer' && (
                            <Link 
                                to="/login" 
                                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-white/20"
                            >
                                Login
                            </Link>
                        )}
                        <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                            <Settings className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-medium capitalize">{currentRole}</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}