// Frontend services - UI focus only (no API calls)

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
    // Mock film data - return array directly
    return [
      { id: 1, title: 'Avengers: Endgame', genre: 'Action', duration: 180, poster: 'https://be-ujikom.amayones.my.id/ac.jpg' },
      { id: 2, title: 'Spider-Man: No Way Home', genre: 'Action', duration: 148, poster: 'https://be-ujikom.amayones.my.id/ac.jpg' },
      { id: 3, title: 'Top Gun: Maverick', genre: 'Action', duration: 130, poster: 'https://be-ujikom.amayones.my.id/ac.jpg' },
      { id: 4, title: 'Black Panther: Wakanda Forever', genre: 'Action', duration: 161, poster: 'https://be-ujikom.amayones.my.id/ac.jpg' }
    ];
  },
  getFilmDetail: async (id) => {
    return { id, title: 'Sample Movie', genre: 'Action', description: 'Sample description' };
  },
  getSchedules: async (filmId) => {
    return [
      { id: 1, jam: '14:00', date: '2024-01-01', studio: { nama: 'Studio 1' }, price: { harga: 50000 } },
      { id: 2, jam: '16:30', date: '2024-01-01', studio: { nama: 'Studio 2' }, price: { harga: 45000 } },
      { id: 3, jam: '19:00', date: '2024-01-01', studio: { nama: 'Studio 1' }, price: { harga: 55000 } }
    ];
  },
  getAvailableSeats: async (scheduleId) => {
    return Array.from({ length: 80 }, (_, i) => ({ 
      id: i + 1, 
      seat_number: i + 1,
      nomor_kursi: i + 1,
      status: Math.random() > 0.7 ? 'booked' : 'available'
    }));
  },
  bookTicket: async (bookingData) => {
    return { success: true, booking: { id: 1, ...bookingData } };
  },
  getOrderHistory: async () => {
    return [
      { id: 1, movie: 'Sample Movie', date: '2024-01-01' },
      { id: 2, movie: 'Another Movie', date: '2024-01-02' }
    ];
  }
};

export const adminService = {
  getFilms: async () => {
    return [
      { id: 1, title: 'Avengers: Endgame', genre: 'Action', duration: 180, poster: 'https://via.placeholder.com/300x400', director: 'Russo Brothers', status: 'play_now' },
      { id: 2, title: 'Spider-Man: No Way Home', genre: 'Action', duration: 148, poster: 'https://via.placeholder.com/300x400', director: 'Jon Watts', status: 'play_now' },
      { id: 3, title: 'Top Gun: Maverick', genre: 'Action', duration: 130, poster: 'https://via.placeholder.com/300x400', director: 'Joseph Kosinski', status: 'play_now' }
    ];
  },
  createFilm: async (filmData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id: Date.now(), ...filmData };
  },
  updateFilm: async (id, filmData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id, ...filmData };
  },
  deleteFilm: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Film berhasil dihapus' };
  },
  getGenres: async () => {
    return [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Adventure' },
      { id: 3, name: 'Comedy' },
      { id: 4, name: 'Drama' },
      { id: 5, name: 'Horror' },
      { id: 6, name: 'Romance' },
      { id: 7, name: 'Sci-Fi' },
      { id: 8, name: 'Thriller' },
      { id: 9, name: 'Fantasy' },
      { id: 10, name: 'Animation' }
    ];
  },
  getSchedules: async () => {
    return [
      { id: 1, movie: 'Avengers: Endgame', time: '14:00', studio: 'Studio 1' },
      { id: 2, movie: 'Spider-Man: No Way Home', time: '16:30', studio: 'Studio 2' },
      { id: 3, movie: 'Top Gun: Maverick', time: '19:00', studio: 'Studio 1' }
    ];
  },
  createSchedule: async (scheduleData) => {
    return { id: Math.random(), ...scheduleData };
  },
  updateSchedule: async (id, scheduleData) => {
    return { id, ...scheduleData };
  },
  deleteSchedule: async (id) => {
    return { message: 'Schedule deleted' };
  },
  getCustomers: async () => {
    return [
      { id: 1, nama: 'John Doe', email: 'john@email.com', role: 'customer', no_hp: '081234567890', status: 'active' },
      { id: 2, nama: 'Jane Smith', email: 'jane@email.com', role: 'customer', no_hp: '081234567891', status: 'active' },
      { id: 3, nama: 'Bob Johnson', email: 'bob@email.com', role: 'customer', no_hp: '081234567892', status: 'inactive' }
    ];
  },
  deleteUser: async (id) => {
    return { message: 'User deleted' };
  }
};

export const ownerService = {
  getFinancialReport: async (startDate, endDate) => {
    return { 
      report: { 
        total: 1000000 || 0, 
        period: `${startDate || 'N/A'} - ${endDate || 'N/A'}` 
      } 
    };
  },
  getMonthlyReport: async () => {
    return {
      monthly_report: [
        { month: 1, year: 2024, total_income: 125000000 || 0, total_expense: 85000000 || 0, profit: 40000000 || 0, tickets_sold: 2500 || 0 },
        { month: 2, year: 2024, total_income: 135000000 || 0, total_expense: 90000000 || 0, profit: 45000000 || 0, tickets_sold: 2800 || 0 },
        { month: 3, year: 2024, total_income: 145000000 || 0, total_expense: 95000000 || 0, profit: 50000000 || 0, tickets_sold: 3200 || 0 },
        { month: 4, year: 2024, total_income: 155000000 || 0, total_expense: 100000000 || 0, profit: 55000000 || 0, tickets_sold: 3500 || 0 },
        { month: 5, year: 2024, total_income: 165000000 || 0, total_expense: 105000000 || 0, profit: 60000000 || 0, tickets_sold: 3800 || 0 }
      ]
    };
  }
};

export const cashierService = {
  getSchedules: async () => {
    return [
      { id: 1, movie: 'Avengers: Endgame', time: '14:00', studio: 'Studio 1' },
      { id: 2, movie: 'Spider-Man: No Way Home', time: '16:30', studio: 'Studio 2' },
      { id: 3, movie: 'Top Gun: Maverick', time: '19:00', studio: 'Studio 1' }
    ];
  },
  getAvailableSeats: async (scheduleId) => {
    return Array.from({ length: 50 }, (_, i) => ({ 
      id: i + 1, 
      code: `A${i + 1}`, 
      available: Math.random() > 0.3 
    }));
  },
  createTransaction: async (transactionData) => {
    return { id: Math.random(), ...transactionData };
  },
  scanTicket: async (ticketCode) => {
    return { valid: true, ticket: { code: ticketCode } };
  }
};