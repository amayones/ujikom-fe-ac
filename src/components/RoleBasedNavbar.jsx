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
        const role = user.role?.toLowerCase() || user.level?.toLowerCase() || 'customer';
        
        // Normalize Indonesian roles to English
        const roleMap = {
            'pelanggan': 'customer',
            'kasir': 'cashier'
        };
        
        return roleMap[role] || role;
    };

    const role = getUserRole();

    switch (role) {
        case 'admin':
            return <AdminNavbar />;
        case 'owner':
            return <OwnerNavbar />;
        case 'cashier':
            return <CashierNavbar />;
        case 'user':
        case 'customer':
        default:
            return <UserNavbar />;
    }
}