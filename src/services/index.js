// Mock services for testing React pages without API calls

export const authService = {
  login: async (email, password) => {
    // Mock login - always return success
    return { success: true, message: 'Login successful', user: { role: 'customer' } };
  },

  register: async (userData) => {
    // Mock register - always return success
    return { success: true, message: 'Registration successful' };
  },

  logout: async () => {
    // Mock logout - always return success
    return { success: true, message: 'Logout successful' };
  },

  getRoleBasedRedirect: (user) => {
    if (!user) return '/';
    const role = user.role?.toLowerCase() || 'customer';

    switch (role) {
      case 'admin': return '/admin/dashboard';
      case 'owner': return '/owner/dashboard';
      case 'cashier': return '/cashier/dashboard';
      default: return '/';
    }
  },

  validateToken: () => {
    // Mock token validation - always return true for testing
    return true;
  }
};

export const filmService = {
  getFilms: async (status = 'play_now') => {
    // Mock film data
    return {
      films: [
        { id: 1, title: 'Sample Movie 1', genre: 'Action', duration: 120, poster: '/ac.jpg' },
        { id: 2, title: 'Sample Movie 2', genre: 'Comedy', duration: 90, poster: '/ac.jpg' }
      ]
    };
  },
  getFilmDetail: async (id) => {
    return { film: { id, title: 'Sample Movie', genre: 'Action', description: 'Sample description' } };
  },
  getSchedules: async (filmId) => {
    return { schedules: [{ id: 1, time: '14:00', date: '2024-01-01' }] };
  },
  getAvailableSeats: async (scheduleId) => {
    return { seats: Array.from({ length: 50 }, (_, i) => ({ id: i + 1, code: `A${i + 1}`, available: true })) };
  },
  bookTicket: async (bookingData) => {
    return { success: true, booking: { id: 1, ...bookingData } };
  },
  getOrderHistory: async () => {
    return { orders: [{ id: 1, movie: 'Sample Movie', date: '2024-01-01' }] };
  }
};

export const adminService = {
  getFilms: async () => {
    return { films: [{ id: 1, title: 'Sample Movie', genre: 'Action' }] };
  },
  createFilm: async (filmData) => {
    return { film: { id: 1, ...filmData } };
  },
  updateFilm: async (id, filmData) => {
    return { film: { id, ...filmData } };
  },
  deleteFilm: async (id) => {
    return { message: 'Film deleted' };
  },
  getSchedules: async () => {
    return { schedules: [{ id: 1, movie: 'Sample Movie', time: '14:00' }] };
  },
  createSchedule: async (scheduleData) => {
    return { schedule: { id: 1, ...scheduleData } };
  },
  updateSchedule: async (id, scheduleData) => {
    return { schedule: { id, ...scheduleData } };
  },
  deleteSchedule: async (id) => {
    return { message: 'Schedule deleted' };
  }
};

export const ownerService = {
  getFinancialReport: async (startDate, endDate) => {
    return { report: { total: 1000000, period: `${startDate} - ${endDate}` } };
  }
};

export const cashierService = {
  getSchedules: async () => {
    return { schedules: [{ id: 1, movie: 'Sample Movie', time: '14:00' }] };
  },
  getAvailableSeats: async (scheduleId) => {
    return { seats: Array.from({ length: 50 }, (_, i) => ({ id: i + 1, code: `A${i + 1}`, available: true })) };
  },
  createTransaction: async (transactionData) => {
    return { transaction: { id: 1, ...transactionData } };
  },
  scanTicket: async (ticketCode) => {
    return { valid: true, ticket: { code: ticketCode } };
  }
};