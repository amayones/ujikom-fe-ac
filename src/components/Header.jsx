import React from 'react';
import { UserCircle, Search } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-black text-white shadow-md p-3 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between gap-4">

                {/* Logo + Navigation */}
                <div className="flex items-center gap-6">
                    <a
                        href="/"
                        className="text-2xl font-bold text-red-600 tracking-tight hover:text-red-500 transition-colors duration-200"
                    >
                        Absolute Cinema
                    </a>

                    {/* Navigation Menu */}
                    <nav className="flex items-center space-x-4 text-sm font-medium">
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

                {/* Search bar - lebih kaku */}
                <div className="flex-1 mx-6 relative max-w-xl">
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

                {/* User actions */}
                <div className="flex items-center space-x-4">
                    <a
                        href="/login"
                        className="flex items-center space-x-1 text-xs font-medium hover:text-red-500 transition-colors duration-200 whitespace-nowrap"
                    >
                        <UserCircle size={18} />
                        <span>Sign In</span>
                    </a>
                </div>
            </div>
        </header>
    );
}
