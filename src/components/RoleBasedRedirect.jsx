import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleBasedRedirect({ children }) {
    const { user, isAuthenticated } = useAuth();

    // If user is authenticated and not a customer, redirect to their dashboard
    if (isAuthenticated && user) {
        const userRole = user?.role?.toLowerCase() || user?.level?.toLowerCase() || 'customer';
        
        // Normalize Indonesian roles to English
        const roleMap = {
            'pelanggan': 'customer',
            'kasir': 'cashier'
        };
        
        const normalizedUserRole = roleMap[userRole] || userRole;
        
        switch (normalizedUserRole) {
            case 'admin':
                return <Navigate to="/admin/dashboard" replace />;
            case 'owner':
                return <Navigate to="/owner/dashboard" replace />;
            case 'cashier':
                return <Navigate to="/cashier/dashboard" replace />;
            case 'customer':
            case 'user':
            default:
                // Allow customers to access home page
                return children;
        }
    }

    // If not authenticated, show home page
    return children;
}