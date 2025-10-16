import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleGuard({ children, allowedRoles = ['customer', 'user'] }) {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const userRole = user?.role?.toLowerCase() || user?.level?.toLowerCase() || 'customer';
    
    // Normalize Indonesian roles to English
    const roleMap = {
        'pelanggan': 'customer',
        'kasir': 'cashier'
    };
    
    const normalizedUserRole = roleMap[userRole] || userRole;
    const normalizedAllowedRoles = allowedRoles.map(role => roleMap[role] || role);
    
    // If user role is not in allowed roles, redirect to their appropriate dashboard
    if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
        switch (normalizedUserRole) {
            case 'admin':
                return <Navigate to="/admin/dashboard" replace />;
            case 'owner':
                return <Navigate to="/owner/dashboard" replace />;
            case 'cashier':
                return <Navigate to="/cashier/dashboard" replace />;
            default:
                return <Navigate to="/" replace />;
        }
    }

    return children;
}