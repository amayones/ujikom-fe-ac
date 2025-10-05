import api from './api';

export const filmService = {
  getFilms: async (status = 'play_now') => {
    const response = await api.get(`/films?status=${status}`);
    return response.data;
  },

  getFilmDetail: async (id) => {
    const response = await api.get(`/films/${id}`);
    return response.data;
  },

  getSchedules: async (filmId) => {
    const response = await api.get(`/customer/schedules/${filmId}`);
    return response.data;
  },

  getAvailableSeats: async (scheduleId) => {
    const response = await api.get(`/customer/seats/${scheduleId}`);
    return response.data;
  },

  bookTicket: async (bookingData) => {
    const response = await api.post('/customer/book', bookingData);
    return response.data;
  },

  getOrderHistory: async () => {
    const response = await api.get('/customer/orders');
    return response.data;
  }
};