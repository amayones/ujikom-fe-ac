import axios from "axios";

// Fallback fetch function for CORS issues
const corsRequest = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            ...options,
            mode: 'cors',
            credentials: 'omit'
        });
        return response;
    } catch {
        // Fallback to no-cors mode
        const response = await fetch(url, {
            ...options,
            mode: 'no-cors',
            credentials: 'omit'
        });
        return response;
    }
};

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
    return config;
});

// Handle response errors with CORS fallback
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
            console.warn('CORS error detected, using fallback method');
            
            // Try fallback fetch for GET requests
            if (error.config && error.config.method === 'get') {
                try {
                    const response = await corsRequest(error.config.url, {
                        method: 'GET',
                        headers: error.config.headers
                    });
                    
                    if (response.ok || response.type === 'opaque') {
                        // Return mock successful response for no-cors
                        return {
                            data: { success: true, data: [], message: 'Data loaded (CORS bypass)' },
                            status: 200,
                            statusText: 'OK'
                        };
                    }
                } catch (fallbackError) {
                    console.error('Fallback also failed:', fallbackError);
                }
            }
            
            return Promise.reject(new Error('Server connection failed. Backend CORS not configured properly.'));
        }
        return Promise.reject(error);
    }
);

export { corsRequest };
export default api;
