import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function PublicRoute({ children }) {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated) {
        // Redirect authenticated users to their dashboard
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