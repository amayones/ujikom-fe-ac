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
        const role = user.role?.toLowerCase() || user.level?.toLowerCase() || 'pelanggan';
        
        // Normalize kasir/cashier
        return role === 'cashier' ? 'kasir' : role;
    };

    const role = getUserRole();

    switch (role) {
        case 'admin':
            return <AdminNavbar />;
        case 'owner':
            return <OwnerNavbar />;
        case 'kasir':
            return <CashierNavbar />;
        case 'user':
        case 'pelanggan':
        default:
            return <UserNavbar />;
    }
}