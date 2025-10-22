import { create } from 'zustand';
import api from '../api';

const useScheduleStore = create((set, get) => ({
    schedules: [],
    currentSchedule: null,
    loading: false,
    error: null,

    fetchSchedules: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/schedules');
            set({ schedules: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch schedules', loading: false });
        }
    },

    fetchScheduleById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/schedules/${id}`);
            set({ currentSchedule: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch schedule', loading: false });
        }
    },

    createSchedule: async (scheduleData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/admin/schedules', scheduleData);
            const newSchedule = response.data.data;
            set(state => ({ 
                schedules: [...state.schedules, newSchedule], 
                loading: false 
            }));
            return { success: true, data: newSchedule };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to create schedule';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    updateSchedule: async (id, scheduleData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.put(`/admin/schedules/${id}`, scheduleData);
            const updatedSchedule = response.data.data;
            set(state => ({
                schedules: state.schedules.map(schedule => 
                    schedule.id === id ? updatedSchedule : schedule
                ),
                loading: false
            }));
            return { success: true, data: updatedSchedule };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update schedule';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    deleteSchedule: async (id) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/admin/schedules/${id}`);
            set(state => ({
                schedules: state.schedules.filter(schedule => schedule.id !== id),
                loading: false
            }));
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to delete schedule';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    getSchedulesByFilm: (filmId) => {
        const { schedules } = get();
        return schedules.filter(schedule => schedule.film_id === filmId);
    },

    clearError: () => set({ error: null })
}));

export default useScheduleStore;