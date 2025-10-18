// CORS Proxy using allorigins.win
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const BASE_URL = 'https://be-ujikom.amayones.my.id/api';

// Custom fetch function that bypasses CORS
const corsRequest = async (endpoint, options = {}) => {
    const url = `${CORS_PROXY}${encodeURIComponent(BASE_URL + endpoint)}`;
    
    try {
        const response = await fetch(url, {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return { data, status: response.status, statusText: response.statusText };
    } catch (error) {
        console.error('CORS request failed:', error);
        throw error;
    }
};

// Axios-like API wrapper
const api = {
    get: (endpoint) => corsRequest(endpoint, { method: 'GET' }),
    post: (endpoint, data) => corsRequest(endpoint, { method: 'POST', body: JSON.stringify(data) }),
    put: (endpoint, data) => corsRequest(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (endpoint) => corsRequest(endpoint, { method: 'DELETE' })
};

export { corsRequest };
export default api;
