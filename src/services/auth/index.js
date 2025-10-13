import api from '../../api/config.js';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response;
    } catch (error) {
      throw error;
    }
  },

  async register(userData) {
    try {
      return await api.post('/register', userData);
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Server logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  getToken() {
    return localStorage.getItem('token');
  },

  validateToken() {
    const token = this.getToken();
    const user = this.getCurrentUser();
    
    if (!token || !user) {
      return false;
    }
    
    return !!(token && user.id && user.email);
  },

  isAuthenticated() {
    return this.validateToken();
  }
};