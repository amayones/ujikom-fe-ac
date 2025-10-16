import api from '../../api/config.js';

export const adminUsersService = {
  async getAll() {
    return await api.get('/users');
  },

  async create(userData) {
    return await api.post('/users', userData);
  },

  async update(id, userData) {
    return await api.put(`/users/${id}`, userData);
  },

  async delete(id) {
    return await api.delete(`/users/${id}`);
  }
};