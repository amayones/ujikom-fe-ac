import api from './api';

export const adminService = {
  // Film management
  getFilms: async () => {
    const response = await api.get('/admin/films');
    return response.data;
  },

  storeFilm: async (filmData) => {
    const response = await api.post('/admin/films', filmData);
    return response.data;
  },

  updateFilm: async (id, filmData) => {
    const response = await api.put(`/admin/films/${id}`, filmData);
    return response.data;
  },

  deleteFilm: async (id) => {
    const response = await api.delete(`/admin/films/${id}`);
    return response.data;
  },

  // Customer management
  getCustomers: async () => {
    const response = await api.get('/admin/customers');
    return response.data;
  },

  // Schedule management
  getSchedules: async () => {
    const response = await api.get('/admin/schedules');
    return response.data;
  },

  storeSchedule: async (scheduleData) => {
    const response = await api.post('/admin/schedules', scheduleData);
    return response.data;
  },

  // Price management
  getPrices: async () => {
    const response = await api.get('/admin/prices');
    return response.data;
  },

  storePrice: async (priceData) => {
    const response = await api.post('/admin/prices', priceData);
    return response.data;
  }
};