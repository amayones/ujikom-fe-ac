import api from './api';

export const cashierService = {
  bookOfflineTicket: async (bookingData) => {
    const response = await api.post('/cashier/book-offline', bookingData);
    return response.data;
  },

  printTicket: async (orderId) => {
    const response = await api.get(`/cashier/print-ticket/${orderId}`);
    return response.data;
  },

  getOnlineOrders: async () => {
    const response = await api.get('/cashier/online-orders');
    return response.data;
  },

  processOnlineTicket: async (orderId, action) => {
    const response = await api.put(`/cashier/process-order/${orderId}`, { action });
    return response.data;
  }
};

// Backward compatibility
export const kasirService = cashierService;