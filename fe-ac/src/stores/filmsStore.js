import { create } from 'zustand';
import { adminFilmsService, userFilmsService } from '../services/index.js';

export const useFilmsStore = create((set, get) => ({
  films: [],
  nowPlaying: [],
  comingSoon: [],
  loading: false,

  // Admin actions
  fetchFilms: async () => {
    set({ loading: true });
    try {
      const films = await adminFilmsService.getAll();
      set({ films, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  createFilm: async (filmData) => {
    set({ loading: true });
    try {
      const newFilm = await adminFilmsService.create(filmData);
      set(state => ({ 
        films: [...state.films, newFilm], 
        loading: false 
      }));
      return newFilm;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateFilm: async (id, filmData) => {
    set({ loading: true });
    try {
      const updatedFilm = await adminFilmsService.update(id, filmData);
      set(state => ({
        films: state.films.map(film => film.id === id ? updatedFilm : film),
        loading: false
      }));
      return updatedFilm;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  deleteFilm: async (id) => {
    set({ loading: true });
    try {
      await adminFilmsService.delete(id);
      set(state => ({
        films: state.films.filter(film => film.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // User actions
  fetchNowPlaying: async () => {
    set({ loading: true });
    try {
      const nowPlaying = await userFilmsService.getNowPlaying();
      set({ nowPlaying, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  fetchComingSoon: async () => {
    set({ loading: true });
    try {
      const comingSoon = await userFilmsService.getComingSoon();
      set({ comingSoon, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  fetchHomeFilms: async () => {
    set({ loading: true });
    try {
      const [nowPlaying, comingSoon] = await Promise.all([
        userFilmsService.getNowPlaying(),
        userFilmsService.getComingSoon()
      ]);
      set({ 
        nowPlaying: nowPlaying.slice(0, 4), 
        comingSoon: comingSoon.slice(0, 3), 
        loading: false 
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  }
}));