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
    
    const role = user.role?.toLowerCase() || user.level?.toLowerCase() || 'pelanggan';
    const normalizedRole = role === 'cashier' ? 'kasir' : role;
    
    switch (normalizedRole) {
      case 'admin':
        return '/admin/dashboard';
      case 'owner':
        return '/owner/dashboard';
      case 'kasir':
        return '/cashier/dashboard';
      case 'user':
      case 'pelanggan':
      default:
        return '/';
    }
  }
};