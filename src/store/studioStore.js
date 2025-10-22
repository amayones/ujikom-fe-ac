import { create } from 'zustand';
import api from '../api';

const useStudioStore = create((set) => ({
    studios: [],
    currentStudio: null,
    loading: false,
    error: null,

    fetchStudios: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/admin/studios');
            set({ studios: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch studios', loading: false });
        }
    },

    fetchStudioById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/admin/studios/${id}`);
            set({ currentStudio: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch studio', loading: false });
        }
    },

    createStudio: async (studioData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/admin/studios', studioData);
            const newStudio = response.data.data;
            set(state => ({ 
                studios: [...state.studios, newStudio], 
                loading: false 
            }));
            return { success: true, data: newStudio };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to create studio';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    updateStudio: async (id, studioData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.put(`/admin/studios/${id}`, studioData);
            const updatedStudio = response.data.data;
            set(state => ({
                studios: state.studios.map(studio => 
                    studio.id === id ? updatedStudio : studio
                ),
                loading: false
            }));
            return { success: true, data: updatedStudio };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update studio';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    deleteStudio: async (id) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/admin/studios/${id}`);
            set(state => ({
                studios: state.studios.filter(studio => studio.id !== id),
                loading: false
            }));
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to delete studio';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    clearError: () => set({ error: null })
}));

export default useStudioStore;