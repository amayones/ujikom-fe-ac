import api from '../../api/config.js';

export const adminSchedulesService = {
  async getAll() {
    return await api.get('/schedules');
  },

  async create(scheduleData) {
    return await api.post('/schedules', scheduleData);
  },

  async update(id, scheduleData) {
    return await api.put(`/schedules/${id}`, scheduleData);
  },

  async delete(id) {
    return await api.delete(`/schedules/${id}`);
  },

  async getStudios() {
    return await api.get('/studios');
  },

  async getPrices() {
    return await api.get('/prices');
  }
};