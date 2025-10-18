import axios from "axios";

const api = axios.create({
    baseURL: "https://be-ujikom.amayones.my.id/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 10000,
    withCredentials: false,
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Add CORS headers
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
    return config;
});

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
            console.error('Network/CORS error:', error.message);
            return Promise.reject(new Error('Server connection failed. Please check if the backend server is running and CORS is configured.'));
        }
        return Promise.reject(error);
    }
);

export default api;
