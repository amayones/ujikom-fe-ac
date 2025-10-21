// Environment-based API URL configuration
const BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://be-ujikom.amayones.my.id/api'
    : 'http://localhost:8000/api';

// For development, you can override this by setting VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL || BASE_URL;

// Get token from localStorage
const getToken = () => {
    try {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
            const parsed = JSON.parse(authStorage);
            return parsed.state?.token;
        }
    } catch (error) {
        console.error('Error getting token:', error);
    }
    return null;
};

// Get headers with auth token
const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    
    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};

const fetchWithTimeout = async (url, options = {}, timeout = 30000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
};

const api = {
    get: async (endpoint) => {
        try {
            const response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
                method: 'GET',
                headers: getHeaders()
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}`);
            }
            
            const data = await response.json();
            return { data, status: response.status };
        } catch (error) {
            console.error('GET request failed:', error.message);
            throw error;
        }
    },
    
    post: async (endpoint, data) => {
        try {
            const response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}`);
            }
            
            const result = await response.json();
            return { data: result, status: response.status };
        } catch (error) {
            console.error('POST request failed:', error.message);
            throw error;
        }
    },
    
    put: async (endpoint, data) => {
        try {
            const response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}`);
            }
            
            const result = await response.json();
            return { data: result, status: response.status };
        } catch (error) {
            console.error('PUT request failed:', error.message);
            throw error;
        }
    },
    
    delete: async (endpoint) => {
        try {
            const response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
                method: 'DELETE',
                headers: getHeaders()
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}`);
            }
            
            const result = await response.json();
            return { data: result, status: response.status };
        } catch (error) {
            console.error('DELETE request failed:', error.message);
            throw error;
        }
    }
};

export default api;
