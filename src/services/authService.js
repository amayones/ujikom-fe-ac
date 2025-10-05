import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response.data;
  },

  getRoleBasedRedirect: (user) => {
    if (!user) return '/';
    
    const role = user.role?.toLowerCase() || user.level?.toLowerCase() || 'customer';
    
    // Normalize Indonesian roles to English
    const roleMap = {
      'pelanggan': 'customer',
      'kasir': 'cashier'
    };
    
    const normalizedRole = roleMap[role] || role;
    
    switch (normalizedRole) {
      case 'admin':
        return '/admin/dashboard';
      case 'owner':
        return '/owner/dashboard';
      case 'cashier':
        return '/cashier/dashboard';
      case 'user':
      case 'customer':
      default:
        return '/';
    }
  }
};