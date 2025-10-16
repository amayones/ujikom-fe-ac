import { create } from 'zustand';
import { adminUsersService } from '../services/index.js';

export const useUsersStore = create((set, get) => ({
  users: [],
  loading: false,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const users = await adminUsersService.getAll();
      set({ users, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  createUser: async (userData) => {
    set({ loading: true });
    try {
      const newUser = await adminUsersService.create(userData);
      set(state => ({ 
        users: [...state.users, newUser], 
        loading: false 
      }));
      return newUser;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    set({ loading: true });
    try {
      const updatedUser = await adminUsersService.update(id, userData);
      set(state => ({
        users: state.users.map(user => user.id === id ? updatedUser : user),
        loading: false
      }));
      return updatedUser;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  deleteUser: async (id) => {
    set({ loading: true });
    try {
      await adminUsersService.delete(id);
      set(state => ({
        users: state.users.filter(user => user.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  }
}));