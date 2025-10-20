const BASE_URL = 'https://be-ujikom.amayones.my.id/api';

const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
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
            const response = await fetchWithTimeout(`${BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
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
            const response = await fetchWithTimeout(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
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
            const response = await fetchWithTimeout(`${BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
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
            const response = await fetchWithTimeout(`${BASE_URL}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
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
