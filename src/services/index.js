import api from './api';

// Consolidated service functions
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response.data;
  },
  getRoleBasedRedirect: (user) => {
    if (!user) return '/';
    const role = user.role?.toLowerCase() || user.level?.toLowerCase() || 'customer';
    const roleMap = { 'pelanggan': 'customer', 'kasir': 'cashier' };
    const normalizedRole = roleMap[role] || role;
    
    switch (normalizedRole) {
      case 'admin': return '/admin/dashboard';
      case 'owner': return '/owner/dashboard';
      case 'cashier': return '/cashier/dashboard';
      default: return '/';
    }
  }
};

export const filmService = {
  getFilms: async (status = 'play_now') => {
    const response = await api.get(`/films?status=${status}`);
    return response.data;
  },
  getFilmDetail: async (id) => {
    const response = await api.get(`/films/${id}`);
    return response.data;
  },
  getSchedules: async (filmId) => {
    const response = await api.get(`/customer/schedules/${filmId}`);
    return response.data;
  },
  getAvailableSeats: async (scheduleId) => {
    const response = await api.get(`/customer/seats/${scheduleId}`);
    return response.data;
  },
  bookTicket: async (bookingData) => {
    const response = await api.post('/customer/book', bookingData);
    return response.data;
  },
  getOrderHistory: async () => {
    const response = await api.get('/customer/orders');
    return response.data;
  }
};

export const adminService = {
  getFilms: async () => {
    const response = await api.get('/admin/films');
    return response.data;
  },
  createFilm: async (filmData) => {
    const response = await api.post('/admin/films', filmData);
    return response.data;
  },
  updateFilm: async (id, filmData) => {
    const response = await api.put(`/admin/films/${id}`, filmData);
    return response.data;
  },
  deleteFilm: async (id) => {
    const response = await api.delete(`/admin/films/${id}`);
    return response.data;
  },
  getSchedules: async () => {
    const response = await api.get('/admin/schedules');
    return response.data;
  },
  createSchedule: async (scheduleData) => {
    const response = await api.post('/admin/schedules', scheduleData);
    return response.data;
  },
  updateSchedule: async (id, scheduleData) => {
    const response = await api.put(`/admin/schedules/${id}`, scheduleData);
    return response.data;
  },
  deleteSchedule: async (id) => {
    const response = await api.delete(`/admin/schedules/${id}`);
    return response.data;
  }
};

export const ownerService = {
  getFinancialReport: async (startDate, endDate) => {
    const response = await api.get(`/owner/financial-report?start_date=${startDate}&end_date=${endDate}`);
    return response.data;
  }
};

export const cashierService = {
  getSchedules: async () => {
    const response = await api.get('/cashier/schedules');
    return response.data;
  },
  getAvailableSeats: async (scheduleId) => {
    const response = await api.get(`/cashier/seats/${scheduleId}`);
    return response.data;
  },
  createTransaction: async (transactionData) => {
    const response = await api.post('/cashier/transactions', transactionData);
    return response.data;
  },
  scanTicket: async (ticketCode) => {
    const response = await api.post('/cashier/scan-ticket', { ticket_code: ticketCode });
    return response.data;
  }
};