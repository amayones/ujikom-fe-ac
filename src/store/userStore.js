import { create } from 'zustand';
import api from '../api';

const useUserStore = create((set, get) => ({
    users: [],
    currentUser: null,
    loading: false,
    error: null,

    fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/admin/users');
            set({ users: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message || 'Failed to fetch users', loading: false });
        }
    },

    fetchUserById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/admin/users/${id}`);
            set({ currentUser: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message || 'Failed to fetch user', loading: false });
        }
    },

    createUser: async (userData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/admin/users', userData);
            const newUser = response.data.data;
            set(state => ({ 
                users: [...state.users, newUser], 
                loading: false 
            }));
            return { success: true, data: newUser };
        } catch (error) {
            const message = error.message || 'Failed to create user';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    updateUser: async (id, userData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.put(`/admin/users/${id}`, userData);
            const updatedUser = response.data.data;
            set(state => ({
                users: state.users.map(user => 
                    user.id === id ? updatedUser : user
                ),
                loading: false
            }));
            return { success: true, data: updatedUser };
        } catch (error) {
            const message = error.message || 'Failed to update user';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    deleteUser: async (id) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/admin/users/${id}`);
            set(state => ({
                users: state.users.filter(user => user.id !== id),
                loading: false
            }));
            return { success: true };
        } catch (error) {
            const message = error.message || 'Failed to delete user';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    getCustomers: () => {
        const { users } = get();
        return users.filter(user => user.role === 'customer');
    },

    getCashiers: () => {
        const { users } = get();
        return users.filter(user => user.role === 'cashier');
    },

    clearError: () => set({ error: null })
}));

export default useUserStore;