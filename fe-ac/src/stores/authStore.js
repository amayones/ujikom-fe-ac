import { create } from 'zustand';
import { authService } from '../services/index.js';
import { getRedirectUrl } from '../utils/redirectHelper.js';

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const result = await authService.login(email, password);
      set({ 
        user: result.user, 
        token: result.token, 
        loading: false,
        error: null 
      });
      
      // Handle redirect
      const redirectUrl = getRedirectUrl(result.user.role);
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
      
      return result;
    } catch (error) {
      set({ loading: false, error: error.message || 'Login failed' });
      throw error;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const result = await authService.register(userData);
      set({ loading: false, error: null });
      
      // Redirect to login after successful registration
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
      
      return result;
    } catch (error) {
      set({ loading: false, error: error.message || 'Registration failed' });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await authService.logout();
      set({ user: null, token: null, loading: false, error: null });
      
      // Redirect to login after logout
      setTimeout(() => {
        window.location.href = '/login';
      }, 500);
    } catch (error) {
      set({ user: null, token: null, loading: false, error: null });
      window.location.href = '/login';
    }
  },

  clearError: () => set({ error: null }),

  isAuthenticated: () => {
    const state = get();
    return !!(state.token && state.user);
  },

  initializeAuth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        set({ 
          token, 
          user: JSON.parse(user),
          loading: false,
          error: null 
        });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, loading: false, error: null });
      }
    }
  }
}));