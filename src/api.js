import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://be-ujikom.amayones.my.id/api';

const api = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// add auth token to requests
api.interceptors.request.use(
    (config) => {
        try {
            const authStorage = localStorage.getItem('auth-storage');
            if (authStorage) {
                const parsed = JSON.parse(authStorage);
                const token = parsed.state?.token;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
        } catch (error) {
            console.error('error getting token:', error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// handle 401 responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth-storage');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
