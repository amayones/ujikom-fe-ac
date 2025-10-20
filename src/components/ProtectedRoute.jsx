import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        // Redirect to appropriate dashboard based on user role
        switch (user?.role) {
            case 'admin':
                return <Navigate to="/admin" replace />;
            case 'owner':
                return <Navigate to="/owner" replace />;
            case 'cashier':
                return <Navigate to="/cashier" replace />;
            default:
                return <Navigate to="/" replace />;
        }
    }

    return children;
}