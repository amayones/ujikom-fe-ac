import api from '../../api/config.js';

export const adminFilmsService = {
  async getAll() {
    return await api.get('/films');
  },

  async create(filmData) {
    return await api.post('/films', filmData);
  },

  async update(id, filmData) {
    return await api.put(`/films/${id}`, filmData);
  },

  async delete(id) {
    return await api.delete(`/films/${id}`);
  }
};