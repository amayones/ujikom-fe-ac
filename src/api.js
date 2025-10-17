import axios from "axios";

const api = axios.create({
    baseURL: "https://be-ujikom.amayones.my.id/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
