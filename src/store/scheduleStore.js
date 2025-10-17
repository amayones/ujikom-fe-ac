import { create } from 'zustand';
import api from '../api.js';

const useScheduleStore = create((set) => ({
  schedules: [],
  films: [],
  studios: [],
  prices: [],
  loading: false,
  error: null,

  fetchSchedules: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/admin/schedules');
      set({ schedules: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch schedules', loading: false });
    }
  },

  fetchFilms: async () => {
    try {
      const response = await api.get('/admin/films');
      set({ films: response.data.data });
    } catch (error) {
      console.error('Failed to fetch films:', error);
    }
  },

  fetchPrices: async () => {
    try {
      const response = await api.get('/admin/prices');
      set({ prices: response.data.data });
    } catch (error) {
      console.error('Failed to fetch prices:', error);
    }
  },

  addSchedule: async (scheduleData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/admin/schedules', scheduleData);
      const newSchedule = response.data.data;
      set(state => ({ 
        schedules: [...state.schedules, newSchedule], 
        loading: false 
      }));
      return newSchedule;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to add schedule', loading: false });
      throw error;
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
      return updatedSchedule;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update schedule', loading: false });
      throw error;
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
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete schedule', loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default useScheduleStore;