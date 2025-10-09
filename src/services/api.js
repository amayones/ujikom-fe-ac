import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://be-ujikom.amayones.my.id/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    const { response, code, message } = error;
    
    // CORS or Network error
    if (code === 'ECONNABORTED' || !response || message.includes('CORS') || message.includes('blocked')) {
      console.error('Network/CORS error:', message);
      return Promise.reject({
        ...error,
        message: 'Koneksi bermasalah atau CORS error. Periksa server.'
      });
    }
    
    // Handle different status codes
    switch (response?.status) {
      case 401:
        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/login')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        break;
      case 429:
        const retryAfter = response.data?.retry_after || 60;
        console.warn(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
        break;
      case 422:
        // Validation errors - let component handle
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        console.error('Server error:', response?.data?.message || 'Terjadi kesalahan server');
        break;
    }
    
    return Promise.reject(error);
  }
);

export default api;