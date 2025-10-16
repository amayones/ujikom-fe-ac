import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services';

export default function AuthGuard({ children }) {
    const { user, isAuthenticated } = useAuth();

    // If user is already authenticated, redirect to appropriate dashboard
    if (isAuthenticated && user) {
        const redirectPath = authService.getRoleBasedRedirect(user);
        return <Navigate to={redirectPath} replace />;
    }

    return children;
}