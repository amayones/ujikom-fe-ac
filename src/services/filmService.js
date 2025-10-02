import api from './api';

export const filmService = {
  getFilms: async (status = 'play_now') => {
    const response = await api.get(`/pelanggan/films?status=${status}`);
    return response.data;
  },

  getFilmDetail: async (id) => {
    const response = await api.get(`/pelanggan/films/${id}`);
    return response.data;
  },

  getSchedules: async (filmId) => {
    const response = await api.get(`/pelanggan/schedules/${filmId}`);
    return response.data;
  },

  getAvailableSeats: async (scheduleId) => {
    const response = await api.get(`/pelanggan/seats/${scheduleId}`);
    return response.data;
  },

  bookTicket: async (bookingData) => {
    const response = await api.post('/pelanggan/book', bookingData);
    return response.data;
  },

  getOrderHistory: async () => {
    const response = await api.get('/pelanggan/orders');
    return response.data;
  }
};