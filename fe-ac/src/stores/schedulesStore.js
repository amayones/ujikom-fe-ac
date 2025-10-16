import { create } from 'zustand';
import { adminSchedulesService, userSchedulesService } from '../services/index.js';

export const useSchedulesStore = create((set, get) => ({
  schedules: [],
  studios: [],
  prices: [],
  loading: false,

  // Admin actions
  fetchScheduleData: async () => {
    set({ loading: true });
    try {
      const [schedules, studios, prices] = await Promise.all([
        adminSchedulesService.getAll(),
        adminSchedulesService.getStudios(),
        adminSchedulesService.getPrices()
      ]);
      set({ schedules, studios, prices, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  createSchedule: async (scheduleData) => {
    set({ loading: true });
    try {
      const newSchedule = await adminSchedulesService.create(scheduleData);
      set(state => ({ 
        schedules: [...state.schedules, newSchedule], 
        loading: false 
      }));
      return newSchedule;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateSchedule: async (id, scheduleData) => {
    set({ loading: true });
    try {
      const updatedSchedule = await adminSchedulesService.update(id, scheduleData);
      set(state => ({
        schedules: state.schedules.map(schedule => 
          schedule.id === id ? updatedSchedule : schedule
        ),
        loading: false
      }));
      return updatedSchedule;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  deleteSchedule: async (id) => {
    set({ loading: true });
    try {
      await adminSchedulesService.delete(id);
      set(state => ({
        schedules: state.schedules.filter(schedule => schedule.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // User actions
  fetchSchedules: async () => {
    set({ loading: true });
    try {
      const schedules = await userSchedulesService.getAll();
      set({ schedules, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  fetchSchedulesByFilm: async (filmId) => {
    set({ loading: true });
    try {
      const schedules = await userSchedulesService.getByFilmId(filmId);
      set({ schedules, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  }
}));