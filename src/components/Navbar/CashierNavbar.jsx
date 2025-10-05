import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { UserCircle, Menu, X, CreditCard, Scan, Receipt, BarChart3, LogOut, ShoppingCart } from "lucide-react";
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

export default function CashierNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
            logout();
            navigate('/login');
        } catch (error) {
            logout();
            navigate('/login');
        }
    };

    const navLinks = [
        { href: "/cashier/dashboard", label: "Dashboard", icon: <BarChart3 size={16} /> },
        { href: "/cashier/transactions", label: "Transaksi", icon: <ShoppingCart size={16} /> },
        { href: "/cashier/scan-ticket", label: "Scan Tiket", icon: <Scan size={16} /> },
        { href: "/cashier/receipts", label: "Struk", icon: <Receipt size={16} /> },
    ];

    const isActive = (path) => {
        const currentPath = location.pathname.replace(/\/+$/, "") || "/";
        const targetPath = path.replace(/\/+$/, "") || "/";
        return currentPath === targetPath;
    };

    return (
        <header className="bg-green-800 text-white shadow-lg sticky top-0 z-50 border-b border-green-600">
            <div className="w-full px-6 py-4 flex items-center justify-between relative">
                <div className="flex items-center gap-2">
                    <CreditCard className="text-green-300" size={28} />
                    <Link to="/cashier/dashboard" className="text-xl md:text-2xl font-bold text-green-300 tracking-wide hover:text-green-200 transition-colors">
                        Kasir Panel
                    </Link>
                </div>

                <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={`flex items-center gap-1 text-sm font-medium relative transition-colors ${isActive(link.href) ? "text-green-200" : "hover:text-green-300"}`}
                        >
                            {link.icon} {link.label}
                            {isActive(link.href) && (
                                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-green-300 rounded-full"></span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <span className="hidden md:block text-sm text-green-200">Kasir: {user?.nama || user?.name}</span>
                    <Link to="/cashier/profile" className="hidden md:flex items-center gap-1 text-sm font-medium hover:text-green-200 transition-colors">
                        <UserCircle size={18} /> Profile
                    </Link>
                    <button onClick={handleLogout} className="hidden md:flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition">
                        <LogOut size={14} /> Logout
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white hover:text-green-200 transition-colors">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-green-800 border-t border-green-600 px-6 py-4">
                    <nav className="flex flex-col space-y-3 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link key={link.href} to={link.href} className={`flex items-center gap-2 py-2 ${isActive(link.href) ? "text-green-200 font-semibold" : "hover:text-green-300"}`}>
                                {link.icon} {link.label}
                            </Link>
                        ))}
                        <Link to="/cashier/profile" className="flex items-center gap-2 hover:text-green-200 py-2">
                            <UserCircle size={16} /> Profile
                        </Link>
                        <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-400 py-2 text-left">
                            <LogOut size={16} /> Logout
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}