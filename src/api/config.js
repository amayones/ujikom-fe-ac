import axios from 'axios';

// Import toast untuk show messages
let showToast = null;
export const setToastFunction = (toastFn) => {
  showToast = toastFn;
};

// Base axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor untuk menambahkan token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor untuk handle error dan messages
api.interceptors.response.use(
  (response) => {
    const data = response.data;
    
    // Show success message jika ada
    if (data.message && showToast) {
      showToast.success(data.message);
    }
    
    return data;
  },
  (error) => {
    const errorData = error.response?.data;
    
    // Show error message
    if (errorData?.message && showToast) {
      showToast.error(errorData.message);
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    throw errorData || error;
  }
);

export default api;