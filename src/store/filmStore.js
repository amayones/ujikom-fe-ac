import { create } from 'zustand';
import axiosClient from '../api/axiosClient';

const useFilmStore = create((set, get) => ({
  movies: [],
  currentMovie: null,
  schedules: [],
  currentSchedule: null,
  seats: [],
  loading: false,

  getMovies: async (filter = 'now_playing') => {
    try {
      set({ loading: true });
      const response = await axiosClient.get(`/films?status=${filter}`);
      
      if (response.data.status === 'success') {
        set({ movies: response.data.data.data || response.data.data });
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      set({ loading: false });
    }
  },

  getMovie: async (id) => {
    try {
      set({ loading: true });
      const response = await axiosClient.get(`/films/${id}`);
      
      if (response.data.status === 'success') {
        set({ currentMovie: response.data.data });
      }
    } catch (error) {
      console.error('Failed to fetch movie:', error);
    } finally {
      set({ loading: false });
    }
  },

  getSchedules: async (filmId, date = null) => {
    try {
      set({ loading: true });
      let url = `/schedules?film_id=${filmId}`;
      if (date) url += `&date=${date}`;
      
      const response = await axiosClient.get(url);
      
      if (response.data.status === 'success') {
        const schedules = response.data.data.slice(0, 3);
        set({ schedules });
      }
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
    } finally {
      set({ loading: false });
    }
  },

  getScheduleSeats: async (scheduleId) => {
    try {
      set({ loading: true });
      const response = await axiosClient.get(`/schedules/${scheduleId}`);
      
      if (response.data.status === 'success') {
        const schedule = response.data.data;
        set({ 
          currentSchedule: schedule,
          seats: schedule.seats || []
        });
      }
    } catch (error) {
      console.error('Failed to fetch schedule seats:', error);
    } finally {
      set({ loading: false });
    }
  },

  setCurrentMovie: (movie) => set({ currentMovie: movie }),
  setCurrentSchedule: (schedule) => set({ currentSchedule: schedule }),
  
  clearCurrentMovie: () => set({ currentMovie: null, schedules: [], currentSchedule: null, seats: [] }),
}));

export default useFilmStore;