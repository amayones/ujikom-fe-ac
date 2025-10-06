import axios from 'axios';

const API_BASE_URL = 'https://be-ujikom.amayones.my.id/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (error.response?.status === 429) {
      console.warn('Terlalu banyak permintaan, coba lagi nanti');
    } else if (error.response?.status >= 500) {
      console.error('Server error:', error.response?.data?.message || 'Terjadi kesalahan server');
    }
    return Promise.reject(error);
  }
);

export default api;