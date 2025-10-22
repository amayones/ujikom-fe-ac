import { create } from 'zustand';
import api from '../api';

const useFilmStore = create((set, get) => ({
    films: [],
    currentFilm: null,
    loading: false,
    error: null,

    fetchFilms: async (status = null) => {
        set({ loading: true, error: null });
        try {
            const endpoint = status ? `/films?status=${status}` : '/films';
            const response = await api.get(endpoint);
            set({ films: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch films', loading: false });
        }
    },

    fetchNowPlayingFilms: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/films?status=now_playing');
            set({ films: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch films', loading: false });
        }
    },

    fetchComingSoonFilms: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/films?status=coming_soon');
            set({ films: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch films', loading: false });
        }
    },

    fetchEndedFilms: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/films?status=ended');
            set({ films: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch films', loading: false });
        }
    },

    fetchFilmById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/films/${id}`);
            set({ currentFilm: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch film', loading: false });
        }
    },

    getNowPlayingFilms: () => {
        const { films } = get();
        return films.filter(film => film.status === 'now_playing');
    },

    getComingSoonFilms: () => {
        const { films } = get();
        return films.filter(film => film.status === 'coming_soon');
    },

    createFilm: async (filmData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/admin/films', filmData);
            const newFilm = response.data.data;
            set(state => ({ 
                films: [...state.films, newFilm], 
                loading: false 
            }));
            return { success: true, data: newFilm };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to create film';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    updateFilm: async (id, filmData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.put(`/admin/films/${id}`, filmData);
            const updatedFilm = response.data.data;
            set(state => ({
                films: state.films.map(film => 
                    film.id === id ? updatedFilm : film
                ),
                loading: false
            }));
            return { success: true, data: updatedFilm };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update film';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    deleteFilm: async (id) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/admin/films/${id}`);
            set(state => ({
                films: state.films.filter(film => film.id !== id),
                loading: false
            }));
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to delete film';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    fetchAdminFilms: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/admin/films');
            set({ films: response.data?.data || [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch films', loading: false });
        }
    },

    clearError: () => set({ error: null })
}));

export default useFilmStore;