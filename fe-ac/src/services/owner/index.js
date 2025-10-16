import api from '../../api/config.js';

export const ownerService = {
  async getDashboardStats() {
    return await api.get('/owner/dashboard');
  },

  async getFinanceReport(params = {}) {
    return await api.get('/owner/finance', { params });
  },

  async getReports(params = {}) {
    return await api.get('/owner/reports', { params });
  }
};