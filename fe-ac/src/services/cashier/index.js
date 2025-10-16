import api from '../../api/config.js';

export const cashierService = {
  async getDashboardStats() {
    return await api.get('/cashier/dashboard');
  },

  async getTransactions(params = {}) {
    return await api.get('/cashier/transactions', { params });
  },

  async scanTicket(ticketCode) {
    return await api.post('/cashier/scan-ticket', { ticket_code: ticketCode });
  },

  async processTransaction(transactionData) {
    return await api.post('/cashier/transactions', transactionData);
  }
};