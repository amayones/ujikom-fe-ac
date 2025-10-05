import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleBasedRedirect({ children }) {
    const { user, isAuthenticated } = useAuth();

    // If user is authenticated and not a customer, redirect to their dashboard
    if (isAuthenticated && user) {
        const userRole = user?.role?.toLowerCase() || user?.level?.toLowerCase() || 'pelanggan';
        const normalizedUserRole = userRole === 'cashier' ? 'kasir' : userRole;
        
        switch (normalizedUserRole) {
            case 'admin':
                return <Navigate to="/admin/dashboard" replace />;
            case 'owner':
                return <Navigate to="/owner/dashboard" replace />;
            case 'kasir':
                return <Navigate to="/cashier/dashboard" replace />;
            case 'pelanggan':
            case 'user':
            default:
                // Allow customers to access home page
                return children;
        }
    }

    // If not authenticated, show home page
    return children;
}