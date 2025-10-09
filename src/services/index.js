import api from './api';

// Consolidated service functions
export const authService = {
  login: async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error('Email dan password harus diisi');
      }
      
      const response = await api.post('/login', { 
        email: email.trim().toLowerCase(), 
        password 
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Login gagal');
      }
      
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        const retryAfter = error.response.data?.retry_after || 60;
        throw new Error(`Terlalu banyak percobaan login. Coba lagi dalam ${retryAfter} detik.`);
      }
      
      if (error.response?.status === 422) {
        const errors = error.response.data?.errors;
        if (errors) {
          const firstError = Object.values(errors)[0];
          throw new Error(Array.isArray(firstError) ? firstError[0] : firstError);
        }
      }
      
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Terjadi kesalahan saat login'
      );
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 422) {
        const errors = error.response.data?.errors;
        if (errors) {
          const firstError = Object.values(errors)[0];
          throw new Error(Array.isArray(firstError) ? firstError[0] : firstError);
        }
      }
      
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Terjadi kesalahan saat registrasi'
      );
    }
  },
  
  logout: async () => {
    try {
      const response = await api.post('/logout');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails on server, clear local storage
      return { success: true, message: 'Logout berhasil' };
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
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
  },
  
  validateToken: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) return false;
    
    try {
      JSON.parse(user);
      return true;
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
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