import api from '../../api/config.js';

export const userSchedulesService = {
  async getAll() {
    return await api.get('/schedules');
  },

  async getById(id) {
    return await api.get(`/schedules/${id}`);
  },

  async getByFilmId(filmId) {
    const schedules = await api.get('/schedules');
    return schedules.filter(schedule => schedule.film_id === parseInt(filmId));
  }
};