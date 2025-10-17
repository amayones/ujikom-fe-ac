import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-black shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="text-red-500 text-2xl font-bold">🎬</div>
                        <span className="text-white text-xl font-bold">Absolute Cinema</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link 
                            to="/" 
                            className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                                isActive('/') ? 'text-white bg-gray-900' : ''
                            }`}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/now-playing" 
                            className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                                isActive('/now-playing') ? 'text-white bg-gray-900' : ''
                            }`}
                        >
                            Now Playing
                        </Link>
                        <Link 
                            to="/coming-soon" 
                            className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                                isActive('/coming-soon') ? 'text-white bg-gray-900' : ''
                            }`}
                        >
                            Coming Soon
                        </Link>
                    </div>

                    {/* Auth Links */}
                    <div className="flex space-x-4">
                        <Link 
                            to="/login" 
                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/register" 
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}