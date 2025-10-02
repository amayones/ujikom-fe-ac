import api from './api';

export const ownerService = {
  getFinancialReport: async () => {
    const response = await api.get('/owner/financial-report');
    return response.data;
  },

  getMonthlyReport: async () => {
    const response = await api.get('/owner/monthly-report');
    return response.data;
  },

  addExpense: async (expenseData) => {
    const response = await api.post('/owner/expenses', expenseData);
    return response.data;
  }
};