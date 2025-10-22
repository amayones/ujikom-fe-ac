import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Home, Film, Calendar, User, BarChart3, CreditCard, Users, Clock,
    Armchair, Receipt, Printer, Scan, LogOut, TrendingUp, TrendingDown, Menu, X
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import useSidebarStore from '../store/sidebarStore';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const { logout, isAuthenticated, user } = useAuthStore();
    const [mobileCollapsed, setMobileCollapsed] = useState(true);
    const { collapsed, setCollapsed } = useSidebarStore();

    const getCurrentRole = () => {
        if (currentPath.startsWith('/admin')) return 'admin';
        if (currentPath.startsWith('/owner')) return 'owner';
        if (currentPath.startsWith('/cashier')) return 'cashier';
        return 'customer';
    };

    const currentRole = getCurrentRole();

    const isActive = (path) => {
        if (['/', '/admin', '/owner', '/cashier'].includes(path)) return currentPath === path;
        return currentPath === path || currentPath.startsWith(path + '/');
    };

    const getNavConfig = () => {
        switch (currentRole) {
            case 'admin':
                return {
                    color: 'bg-blue-700',
                    text: 'Admin Panel',
                    links: [
                        { to: '/admin', label: 'Dashboard', icon: <BarChart3 /> },
                        { to: '/admin/movies', label: 'Film', icon: <Film /> },
                        { to: '/admin/customers', label: 'Pelanggan', icon: <Users /> },
                        { to: '/admin/schedules', label: 'Jadwal', icon: <Clock /> },
                        { to: '/admin/prices', label: 'Harga', icon: <CreditCard /> },
                        { to: '/admin/cashiers', label: 'Kasir', icon: <User /> },
                        { to: '/admin/seats', label: 'Kursi', icon: <Armchair /> },
                    ]
                };
            case 'owner':
                return {
                    color: 'bg-purple-700',
                    text: 'Owner Panel',
                    links: [
                        { to: '/owner', label: 'Dashboard', icon: <BarChart3 /> },
                        { to: '/owner/income', label: 'Pemasukan', icon: <TrendingUp /> },
                        { to: '/owner/expense', label: 'Pengeluaran', icon: <TrendingDown /> },
                    ]
                };
            case 'cashier':
                return {
                    color: 'bg-emerald-700',
                    text: 'Kasir Panel',
                    links: [
                        { to: '/cashier', label: 'Dashboard', icon: <BarChart3 /> },
                        { to: '/cashier/offline-booking', label: 'Pesan Offline', icon: <Receipt /> },
                        { to: '/cashier/print-ticket', label: 'Cetak Tiket', icon: <Printer /> },
                        { to: '/cashier/process-online', label: 'Proses Online', icon: <Scan /> },
                    ]
                };
            default:
                return {
                    color: 'bg-rose-700',
                    text: 'Absolute Cinema',
                    links: [
                        { to: '/', label: 'Home', icon: <Home /> },
                        { to: '/now-playing', label: 'Sedang Tayang', icon: <Film /> },
                        { to: '/coming-soon', label: 'Segera Tayang', icon: <Calendar /> },
                        ...(isAuthenticated ? [{ to: '/history', label: 'Riwayat', icon: <Receipt /> }] : []),
                    ]
                };
        }
    };

    const nav = getNavConfig();

    if (currentRole === 'customer') {
        return (
            <nav className={`sticky top-0 z-50 ${nav.color}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16 relative">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 rounded-xl bg-white/10">
                                <Film className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-white font-semibold text-lg">{nav.text}</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
                            {nav.links.map(link => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${isActive(link.to)
                                        ? 'bg-white/20 text-white'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <span className="w-4 h-4">{link.icon}</span>
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            {!isAuthenticated ? (
                                <Link to="/login" className="bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30">
                                    Login
                                </Link>
                            ) : (
                                <Link to="/profile" className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30">
                                    <User className="w-4 h-4" />
                                    {user?.name || 'Profile'}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <>
            <button
                onClick={() => setMobileCollapsed(!mobileCollapsed)}
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 text-white transition md:hidden"
            >
                {mobileCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>

            {!mobileCollapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileCollapsed(true)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-full ${nav.color} text-white z-50
        ${mobileCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'} 
        ${collapsed ? 'md:w-20' : 'md:w-64'} w-64 transition-all duration-300`}
            >
                <div className={`relative flex items-center ${collapsed ? 'justify-center px-3' : 'justify-between px-5'} py-5`}>
                    <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                        <div className="p-2 bg-white/20 rounded-xl">
                            <Film className="w-5 h-5" />
                        </div>
                        {!collapsed && <span className="font-semibold text-lg truncate">{nav.text}</span>}
                    </div>

                    {!collapsed ? (
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="hidden md:block p-2 hover:bg-white/10 rounded-lg flex-shrink-0"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className={`hidden md:block absolute top-1/2 right-[-14px] -translate-y-1/2 p-2 rounded-full ${nav.color} text-white`}
                        >
                            <Menu className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="flex flex-col justify-between h-[calc(100%-70px)] px-3 py-5">
                    <div className="space-y-1">
                        {nav.links.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center ${collapsed ? 'justify-center px-3' : 'gap-3 px-4'} py-3 rounded-lg text-sm font-medium ${isActive(link.to)
                                    ? 'bg-white/20 text-white'
                                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <span className="w-5 h-5 flex-shrink-0">{link.icon}</span>
                                {!collapsed && <span className="truncate">{link.label}</span>}
                            </Link>
                        ))}
                    </div>

                    <div>
                        <Link
                            to="/profile"
                            className={`flex items-center ${collapsed ? 'justify-center px-3' : 'gap-2 px-4'} py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white`}
                        >
                            <User className="w-4 h-4 flex-shrink-0" />
                            {!collapsed && <span>Profil</span>}
                        </Link>

                        <button
                            onClick={async () => {
                                await logout();
                                navigate('/login');
                            }}
                            className={`w-full flex items-center ${collapsed ? 'justify-center px-3' : 'gap-2 px-4'} py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white`}
                        >
                            <LogOut className="w-4 h-4 flex-shrink-0" />
                            {!collapsed && <span>Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
