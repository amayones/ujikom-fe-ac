import { create } from 'zustand';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';
import { ROLES } from '../utils/roles';

// Auth store for user authentication and profile management
const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuth: !!localStorage.getItem('token'),
  loading: false,

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, isAuth: true });
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token, isAuth: true });
  },

  getRoleBasedRoute: (role) => {
    switch (role) {
      case ROLES.ADMIN:
        return '/admin/dashboard';
      case ROLES.OWNER:
        return '/owner/dashboard';
      case ROLES.CASHIER:
        return '/cashier/dashboard';
      case ROLES.CUSTOMER:
      default:
        return '/movies';
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true });
      const response = await axiosClient.post('/login', { email, password });
      
      if (response.data.status === 'success') {
        const { user, token } = response.data.data;
        get().setUser(user);
        get().setToken(token);
        toast.success(response.data.message);
        const redirectRoute = get().getRoleBasedRoute(user.role);
        return { success: true, redirectRoute };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    } finally {
      set({ loading: false });
    }
  },

  register: async (payload) => {
    try {
      set({ loading: true });
      const response = await axiosClient.post('/register', payload);
      
      if (response.data.status === 'success') {
        const { user, token } = response.data.data;
        get().setUser(user);
        get().setToken(token);
        toast.success(response.data.message);
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    } finally {
      set({ loading: false });
    }
  },

  fetchProfile: async () => {
    try {
      const response = await axiosClient.get('/me');
      if (response.data.status === 'success') {
        get().setUser(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  },

  updateProfile: async (payload) => {
    try {
      set({ loading: true });
      const response = await axiosClient.patch('/profile', payload);
      
      if (response.data.status === 'success') {
        get().setUser(response.data.data);
        toast.success(response.data.message);
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosClient.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ user: null, token: null, isAuth: false });
      toast.success('Logged out successfully');
    }
  },
}));

export default useAuthStore;