import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api';

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,

            login: async (email, password) => {
                set({ loading: true, error: null });
                try {
                    const response = await api.post('/auth/login', { email, password });
                    const { user, token } = response.data.data;
                    
                    set({ 
                        user, 
                        token, 
                        isAuthenticated: true, 
                        loading: false 
                    });
                    
                    return { success: true, user };
                } catch (error) {
                    const message = error.response?.data?.message || 'Login failed';
                    set({ error: message, loading: false });
                    return { success: false, message };
                }
            },

            register: async (userData) => {
                set({ loading: true, error: null });
                try {
                    const response = await api.post('/auth/register', userData);
                    set({ loading: false });
                    return { success: true, data: response.data };
                } catch (error) {
                    const message = error.response?.data?.message || 'Registration failed';
                    set({ error: message, loading: false });
                    return { success: false, message };
                }
            },

            logout: async () => {
                try {
                    await api.post('/auth/logout');
                } catch (error) {
                    console.error('Logout error:', error);
                }
                
                set({ 
                    user: null, 
                    token: null, 
                    isAuthenticated: false 
                });
            },

            clearError: () => set({ error: null }),

            initAuth: () => {
                const { token } = get();
                if (token) {
                    set({ isAuthenticated: true });
                }
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ 
                user: state.user, 
                token: state.token, 
                isAuthenticated: state.isAuthenticated 
            })
        }
    )
);

export default useAuthStore;