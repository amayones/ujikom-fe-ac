import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole = null }) {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    // If not authenticated and trying to access protected route
    if (!isAuthenticated && requiredRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If authenticated but trying to access wrong role's area
    if (isAuthenticated && requiredRole) {
        const userRole = user?.role?.toLowerCase() || user?.level?.toLowerCase() || 'pelanggan';
        
        // Handle kasir/cashier role matching
        const normalizedUserRole = userRole === 'cashier' ? 'kasir' : userRole;
        const normalizedRequiredRole = requiredRole === 'cashier' ? 'kasir' : requiredRole;
        
        if (normalizedUserRole !== normalizedRequiredRole) {
            // Redirect to appropriate dashboard based on user's role
            switch (normalizedUserRole) {
                case 'admin':
                    return <Navigate to="/admin/dashboard" replace />;
                case 'owner':
                    return <Navigate to="/owner/dashboard" replace />;
                case 'kasir':
                    return <Navigate to="/cashier/dashboard" replace />;
                default:
                    return <Navigate to="/" replace />;
            }
        }
    }

    return children;
}