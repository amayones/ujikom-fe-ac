import React, { useState } from 'react';
import { UserCircle, Search, Menu, X } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-black text-white shadow-md p-5 sticky top-0 z-50">
            <div className="w-full px-4 flex items-center justify-between gap-4">

                {/* Logo + Navigation */}
                <div className="flex items-center gap-6">
                    <a
                        href="/"
                        className="text-xl md:text-2xl font-bold text-red-600 tracking-tight hover:text-red-500 transition-colors duration-200"
                    >
                        Absolute Cinema
                    </a>

                    {/* Navigation Menu - Hidden on mobile */}
                    <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
                        <a href="/play-now" className="hover:text-red-500 transition-colors duration-200">
                            Play Now
                        </a>
                        <a href="/coming-soon" className="hover:text-red-500 transition-colors duration-200">
                            Coming Soon
                        </a>
                        <a href="/history" className="hover:text-red-500 transition-colors duration-200">
                            History
                        </a>
                    </nav>
                </div>

                {/* Search bar */}
                <div className="flex-1 mx-2 md:mx-6 relative max-w-xs md:max-w-xl">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        className="w-full rounded-sm px-3 py-1.5 bg-gray-900 text-white border border-gray-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all duration-300 placeholder-gray-500 text-sm"
                    />
                    <Search
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                        size={16}
                    />
                </div>

                {/* User actions and Hamburger Menu */}
                <div className="flex items-center space-x-4">
                    <a
                        href="/login"
                        className="hidden md:flex items-center space-x-1 text-md font-medium hover:text-red-500 transition-colors duration-200 whitespace-nowrap"
                    >
                        <UserCircle size={18} />
                        <span>Sign In</span>
                    </a>
                    {/* Hamburger Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white hover:text-red-500 transition-colors duration-200"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-black border-t border-gray-700 px-4 py-4">
                    <nav className="flex flex-col space-y-2 text-sm font-medium">
                        <a href="/play-now" className="hover:text-red-500 transition-colors duration-200 py-2">
                            Play Now
                        </a>
                        <a href="/coming-soon" className="hover:text-red-500 transition-colors duration-200 py-2">
                            Coming Soon
                        </a>
                        <a href="/history" className="hover:text-red-500 transition-colors duration-200 py-2">
                            History
                        </a>
                        <a href="/login" className="flex items-center space-x-1 hover:text-red-500 transition-colors duration-200 py-2">
                            <UserCircle size={18} />
                            <span>Sign In</span>
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
