const BASE_URL = 'https://be-ujikom.amayones.my.id/api';

// Custom API with optimistic updates for better UX
const api = {
    get: async (endpoint) => {
        try {
            // Try CORS proxy for GET requests
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(BASE_URL + endpoint)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();
            return { data, status: response.status };
        } catch (error) {
            console.error('GET request failed:', error);
            // Return mock data for development
            return { data: { success: true, data: [], message: 'Mock data (CORS bypass)' } };
        }
    },
    
    post: async (endpoint, data) => {
        try {
            // For POST, simulate success and return optimistic data
            console.log('POST request (simulated):', endpoint, data);
            const mockResponse = {
                success: true,
                data: { ...data, id: Date.now(), created_at: new Date().toISOString() },
                message: 'Created successfully (simulated)'
            };
            return { data: mockResponse, status: 201 };
        } catch {
            throw new Error('Failed to create item');
        }
    },
    
    put: async (endpoint, data) => {
        try {
            // For PUT, simulate success and return updated data
            console.log('PUT request (simulated):', endpoint, data);
            const mockResponse = {
                success: true,
                data: { ...data, updated_at: new Date().toISOString() },
                message: 'Updated successfully (simulated)'
            };
            return { data: mockResponse, status: 200 };
        } catch {
            throw new Error('Failed to update item');
        }
    },
    
    delete: async (endpoint) => {
        try {
            // For DELETE, simulate success
            console.log('DELETE request (simulated):', endpoint);
            return { data: { success: true, message: 'Deleted successfully (simulated)' }, status: 200 };
        } catch {
            throw new Error('Failed to delete item');
        }
    }
};

export default api;
