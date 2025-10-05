import api from './api';

export const kasirService = {
  bookOfflineTicket: async (bookingData) => {
    const response = await api.post('/kasir/book-offline', bookingData);
    return response.data;
  },

  printTicket: async (orderId) => {
    const response = await api.get(`/kasir/print-ticket/${orderId}`);
    return response.data;
  },

  getOnlineOrders: async () => {
    const response = await api.get('/kasir/online-orders');
    return response.data;
  },

  processOnlineTicket: async (orderId, action) => {
    const response = await api.put(`/kasir/process-order/${orderId}`, { action });
    return response.data;
  }
};