import React from 'react';
import { useAuth } from '../context/AuthContext';
import UserNavbar from './Navbar/UserNavbar';
import AdminNavbar from './Navbar/AdminNavbar';
import OwnerNavbar from './Navbar/OwnerNavbar';
import CashierNavbar from './Navbar/CashierNavbar';

export default function RoleBasedNavbar() {
    const { user } = useAuth();

    // Determine role from user data
    const getUserRole = () => {
        if (!user) return 'user';
        
        // Check role field first, then fallback to level
        if (user.role) {
            return user.role.toLowerCase();
        }
        
        if (user.level) {
            return user.level.toLowerCase();
        }
        
        // Default to user if no role specified
        return 'user';
    };

    const role = getUserRole();

    switch (role) {
        case 'admin':
            return <AdminNavbar />;
        case 'owner':
            return <OwnerNavbar />;
        case 'kasir':
        case 'cashier':
            return <CashierNavbar />;
        case 'user':
        case 'pelanggan':
        default:
            return <UserNavbar />;
    }
}