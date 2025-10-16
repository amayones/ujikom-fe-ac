import { normalizePath } from './pathUtils';

// Define all valid routes in the application
export const validRoutes = [
    // Auth routes
    '/login',
    '/register',
    
    // User routes
    '/',
    '/profile',
    '/play-now',
    '/coming-soon',
    '/history',
    
    // Dynamic user routes (patterns)
    '/movies/',
    '/booking/',
    '/ticket/',
    '/payment',
    
    // Admin routes
    '/admin/dashboard',
    '/admin/movies',
    '/admin/schedules',
    '/admin/users',
    
    // Owner routes
    '/owner/dashboard',
    '/owner/finance',
    '/owner/report',
    
    // Cashier routes
    '/cashier/dashboard',
    '/cashier/transactions',
    '/cashier/scan-ticket'
];

export const isValidRoute = (pathname) => {
    const normalizedPath = normalizePath(pathname);
    
    // Check exact matches
    if (validRoutes.includes(normalizedPath)) {
        return true;
    }
    
    // Check dynamic routes with more flexible patterns
    const dynamicRoutePatterns = [
        /^\/movies\/[^/]+$/,  // /movies/123 or /movies/abc
        /^\/booking\/[^/]+$/, // /booking/123 or /booking/abc
        /^\/ticket\/[^/]+$/   // /ticket/123 or /ticket/abc
    ];
    
    return dynamicRoutePatterns.some(pattern => pattern.test(normalizedPath));
};

export const shouldHideLayout = (pathname) => {
    const normalizedPath = normalizePath(pathname);
    const noLayoutPages = ['/login', '/register', '/forgot-password'];
    return noLayoutPages.includes(normalizedPath) || !isValidRoute(pathname);
};