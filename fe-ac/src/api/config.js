import axios from 'axios';

// Import toast untuk show messages
let showToast = null;
export const setToastFunction = (toastFn) => {
  showToast = toastFn;
};

// Base axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://be-ujikom.amayones.my.id/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false
});

// Request interceptor untuk menambahkan token
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
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // Handle validation errors (422)
    if (error.response?.status === 422 && errorData?.data) {
      const validationError = new Error(errorData.message || 'Validation failed');
      validationError.errors = errorData.data;
      throw validationError;
    }
    
    throw errorData || error;
  }
);

export default api;