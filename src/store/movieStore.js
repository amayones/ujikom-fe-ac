import { create } from 'zustand';
import api from '../api.js';

const useMovieStore = create((set, get) => ({
  movies: [],
  loading: false,
  error: null,

  fetchMovies: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/admin/films');
      set({ movies: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch movies', loading: false });
    }
  },

  getMovie: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/admin/films/${id}`);
      set({ loading: false });
      return response.data.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch movie', loading: false });
      throw error;
    }
  },

  addMovie: async (movieData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/admin/films', movieData);
      const newMovie = response.data.data;
      set(state => ({ 
        movies: [...state.movies, newMovie], 
        loading: false 
      }));
      return newMovie;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to add movie', loading: false });
      throw error;
    }
  },

  updateMovie: async (id, movieData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/admin/films/${id}`, movieData);
      const updatedMovie = response.data.data;
      set(state => ({
        movies: state.movies.map(movie => 
          movie.id === id ? updatedMovie : movie
        ),
        loading: false
      }));
      return updatedMovie;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update movie', loading: false });
      throw error;
    }
  },

  deleteMovie: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/admin/films/${id}`);
      set(state => ({
        movies: state.movies.filter(movie => movie.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete movie', loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default useMovieStore;