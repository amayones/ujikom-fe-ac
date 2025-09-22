import React, { useState } from "react";
import { UserCircle, Search, Menu, X, Film, Ticket, Home, Info, Clock } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-black text-white shadow-md sticky top-0 z-50">
            <div className="w-full px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Film className="text-red-600" size={28} />
                    <a
                        href="/"
                        className="text-xl md:text-2xl font-bold text-red-600 tracking-wide hover:text-red-500 transition-colors"
                    >
                        Absolute Cinema
                    </a>
                </div>

                {/* Navigation Menu */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <a
                        href="/play-now"
                        className="flex items-center gap-1 hover:text-red-500 transition-colors"
                    >
                        <Ticket size={16} /> Now Playing
                    </a>
                    <a
                        href="/coming-soon"
                        className="flex items-center gap-1 hover:text-red-500 transition-colors"
                    >
                        <Clock size={16} /> Coming Soon
                    </a>
                    <a
                        href="/history"
                        className="flex items-center gap-1 hover:text-red-500 transition-colors"
                    >
                        <Info size={16} /> History
                    </a>
                </nav>

                {/* Search Bar */}
                <div className="flex-1 mx-4 relative max-w-xs md:max-w-md hidden sm:block">
                    <input
                        type="text"
                        placeholder="Search movies, genres..."
                        className="w-full rounded px-3 py-2 bg-gray-900 text-white border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500/30 outline-none text-sm"
                    />
                    <Search
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 cursor-pointer"
                        size={18}
                    />
                </div>

                {/* User + Hamburger */}
                <div className="flex items-center gap-4">
                    <a
                        href="/login"
                        className="hidden md:flex items-center gap-1 text-sm font-medium hover:text-red-500 transition-colors"
                    >
                        <UserCircle size={18} /> Sign In
                    </a>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white hover:text-red-500 transition-colors"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-black border-t border-gray-800 px-6 py-4">
                    <nav className="flex flex-col space-y-3 text-sm font-medium">
                        <a href="/" className="flex items-center gap-2 hover:text-red-500 py-2">
                            <Home size={16} /> Home
                        </a>
                        <a href="/play-now" className="flex items-center gap-2 hover:text-red-500 py-2">
                            <Ticket size={16} /> Now Playing
                        </a>
                        <a href="/coming-soon" className="flex items-center gap-2 hover:text-red-500 py-2">
                            <Film size={16} /> Coming Soon
                        </a>
                        <a href="/history" className="flex items-center gap-2 hover:text-red-500 py-2">
                            <Info size={16} /> History
                        </a>
                        <a href="/login" className="flex items-center gap-2 hover:text-red-500 py-2">
                            <UserCircle size={16} /> Sign In
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
