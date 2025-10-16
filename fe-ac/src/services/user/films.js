import api from '../../api/config.js';

export const userFilmsService = {
  async getAll() {
    return await api.get('/films');
  },

  async getById(id) {
    return await api.get(`/films/${id}`);
  },

  async getNowPlaying() {
    const films = await api.get('/films');
    return films.filter(film => film.status === 'now_playing');
  },

  async getComingSoon() {
    const films = await api.get('/films');
    return films.filter(film => film.status === 'coming_soon');
  }
};