import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    const [currentRole, setCurrentRole] = useState('customer'); // customer, admin, owner, cashier
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleRoleSwitch = (role) => {
        setCurrentRole(role);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentRole('customer');
    };

    const getNavLinks = () => {
        if (!isLoggedIn) {
            return [
                { to: '/', label: 'Home' },
                { to: '/now-playing', label: 'Now Playing' },
                { to: '/coming-soon', label: 'Coming Soon' }
            ];
        }

        switch (currentRole) {
            case 'admin':
                return [
                    { to: '/admin', label: 'Dashboard' },
                    { to: '/admin/movies', label: 'Manage Movies' },
                    { to: '/admin/schedules', label: 'Schedules' },
                    { to: '/admin/customers', label: 'Customers' },
                    { to: '/admin/prices', label: 'Pricing' }
                ];
            case 'owner':
                return [
                    { to: '/owner', label: 'Dashboard' },
                    { to: '/owner/reports', label: 'Reports' },
                    { to: '/owner/analytics', label: 'Analytics' }
                ];
            case 'cashier':
                return [
                    { to: '/cashier', label: 'Dashboard' },
                    { to: '/cashier/booking', label: 'Offline Booking' },
                    { to: '/cashier/scan', label: 'Scan Tickets' }
                ];
            default: // customer
                return [
                    { to: '/', label: 'Home' },
                    { to: '/now-playing', label: 'Now Playing' },
                    { to: '/coming-soon', label: 'Coming Soon' },
                    { to: '/history', label: 'History' },
                    { to: '/profile', label: 'Profile' }
                ];
        }
    };

    return (
        <nav className="bg-black shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to={isLoggedIn && currentRole !== 'customer' ? `/${currentRole}` : '/'} className="flex items-center space-x-2">
                        <div className="text-red-500 text-2xl font-bold">🎬</div>
                        <span className="text-white text-xl font-bold">Absolute Cinema</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-6">
                        {getNavLinks().map((link) => (
                            <Link 
                                key={link.to}
                                to={link.to} 
                                className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive(link.to) ? 'text-white bg-gray-900' : ''
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth & Role Switch */}
                    <div className="flex items-center space-x-4">
                        {!isLoggedIn ? (
                            <>
                                {/* Role Demo Buttons */}
                                <div className="flex space-x-2">
                                    <button onClick={() => handleRoleSwitch('customer')} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded">Customer</button>
                                    <button onClick={() => handleRoleSwitch('admin')} className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded">Admin</button>
                                    <button onClick={() => handleRoleSwitch('owner')} className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded">Owner</button>
                                    <button onClick={() => handleRoleSwitch('cashier')} className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded">Cashier</button>
                                </div>
                                <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                            </>
                        ) : (
                            <>
                                <span className="text-gray-300 text-sm capitalize">{currentRole}</span>
                                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">Logout</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}