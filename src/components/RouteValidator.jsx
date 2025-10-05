import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

export default function RouteValidator({ children }) {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        const userRole = user?.role?.toLowerCase() || user?.level?.toLowerCase() || 'customer';
        
        // Normalize Indonesian roles to English
        const roleMap = {
            'pelanggan': 'customer',
            'kasir': 'cashier'
        };
        
        const normalizedRole = roleMap[userRole] || userRole;
        const currentPath = location.pathname;

        // Define role-specific path restrictions
        const roleRestrictions = {
            admin: {
                allowed: ['/admin/'],
                redirect: '/admin/dashboard'
            },
            owner: {
                allowed: ['/owner/'],
                redirect: '/owner/dashboard'
            },
            cashier: {
                allowed: ['/cashier/'],
                redirect: '/cashier/dashboard'
            },
            customer: {
                allowed: ['/', '/profile', '/play-now', '/coming-soon', '/movies/', '/booking/', '/payment', '/ticket/', '/history'],
                redirect: '/'
            }
        };

        const userRestriction = roleRestrictions[normalizedRole] || roleRestrictions.customer;

        // Check if current path is allowed for user role
        const isAllowed = userRestriction.allowed.some(allowedPath => {
            if (allowedPath.endsWith('/')) {
                return currentPath.startsWith(allowedPath);
            }
            return currentPath === allowedPath || currentPath.startsWith(allowedPath + '/');
        });

        // If not allowed, redirect to appropriate dashboard
        if (!isAllowed && !currentPath.startsWith('/login') && !currentPath.startsWith('/register')) {
            navigate(userRestriction.redirect, { replace: true });
        }
    }, [location.pathname, user, isAuthenticated, navigate]);

    return children;
}