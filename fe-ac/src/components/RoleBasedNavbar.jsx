import React from 'react';
import { useLocation } from 'react-router-dom';
import UserNavbar from './Navbar/UserNavbar';
import AdminNavbar from './Navbar/AdminNavbar';
import OwnerNavbar from './Navbar/OwnerNavbar';
import CashierNavbar from './Navbar/CashierNavbar';

export default function RoleBasedNavbar() {
    const location = useLocation();

    // Determine navbar based on current path
    const getNavbarByPath = () => {
        if (location.pathname.startsWith('/admin')) {
            return <AdminNavbar />;
        } else if (location.pathname.startsWith('/owner')) {
            return <OwnerNavbar />;
        } else if (location.pathname.startsWith('/cashier')) {
            return <CashierNavbar />;
        } else {
            return <UserNavbar />;
        }
    };

    return getNavbarByPath();
}