import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { UserCircle, Menu, X, Film, Ticket, Home, Info, Clock } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { href: "/", label: "Home", icon: <Home size={16} /> },
        { href: "/play-now", label: "Now Playing", icon: <Ticket size={16} /> },
        { href: "/coming-soon", label: "Coming Soon", icon: <Clock size={16} /> },
        { href: "/history", label: "History", icon: <Info size={16} /> },
    ];

    const isActive = (path) => {
        const currentPath = location.pathname.replace(/\/+$/, "") || "/";
        const targetPath = path.replace(/\/+$/, "") || "/";
        return currentPath === targetPath;
    };

    return (
        <header className="bg-black text-white shadow-md sticky top-0 z-50">
            <div className="w-full px-6 py-4 flex items-center justify-between relative">
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

                {/* Navigation Menu (Center) */}
                <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-1 text-sm font-medium relative transition-colors ${isActive(link.href)
                                    ? "text-red-500"
                                    : "hover:text-red-400"
                                }`}
                        >
                            {link.icon} {link.label}
                            {isActive(link.href) && (
                                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-red-500 rounded-full"></span>
                            )}
                        </a>
                    ))}
                </nav>

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
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-2 py-2 ${isActive(link.href)
                                        ? "text-red-500 font-semibold"
                                        : "hover:text-red-400"
                                    }`}
                            >
                                {link.icon} {link.label}
                            </a>
                        ))}
                        <a
                            href="/login"
                            className="flex items-center gap-2 hover:text-red-500 py-2"
                        >
                            <UserCircle size={16} /> Sign In
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
