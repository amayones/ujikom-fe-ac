import api from '../api/config.js';

export const testApiConnection = async () => {
    const results = {
        baseUrl: api.defaults.baseURL,
        tests: []
    };

    // Test 1: Basic connection
    try {
        const response = await fetch(api.defaults.baseURL.replace('/api', '/'));
        results.tests.push({
            name: 'Basic Connection',
            status: response.ok ? 'success' : 'failed',
            message: response.ok ? 'Server is reachable' : `HTTP ${response.status}`,
            data: null
        });
    } catch (error) {
        results.tests.push({
            name: 'Basic Connection',
            status: 'failed',
            message: error.message,
            data: null
        });
    }

    // Test 2: API Health Check (if exists)
    try {
        const response = await api.get('/');
        results.tests.push({
            name: 'API Health Check',
            status: 'success',
            message: 'API is responding',
            data: response
        });
    } catch (error) {
        results.tests.push({
            name: 'API Health Check',
            status: 'failed',
            message: error.message || 'API not responding',
            data: error.response?.data || null
        });
    }

    // Test 3: Test login endpoint
    try {
        const response = await api.post('/login', {
            email: 'test@example.com',
            password: 'password123'
        });
        results.tests.push({
            name: 'Login Endpoint',
            status: 'success',
            message: 'Login endpoint working',
            data: response
        });
    } catch (error) {
        results.tests.push({
            name: 'Login Endpoint',
            status: error.response?.status === 401 ? 'success' : 'failed',
            message: error.response?.status === 401 ? 'Login endpoint working (invalid credentials expected)' : error.message,
            data: error.response?.data || null
        });
    }

    return results;
};

export const testAuthFlow = async () => {
    const results = {
        tests: []
    };

    try {
        // Test register
        const registerData = {
            name: 'Test User ' + Date.now(),
            email: `test${Date.now()}@example.com`,
            password: 'password123',
            password_confirmation: 'password123'
        };

        const registerResponse = await api.post('/register', registerData);
        results.tests.push({
            name: 'Register',
            status: 'success',
            message: 'Registration successful',
            data: registerResponse
        });

        // Test login with registered user
        const loginResponse = await api.post('/login', {
            email: registerData.email,
            password: registerData.password
        });
        results.tests.push({
            name: 'Login',
            status: 'success',
            message: 'Login successful',
            data: loginResponse
        });

        // Test /me endpoint
        const token = loginResponse.data.token;
        const meResponse = await api.get('/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        results.tests.push({
            name: 'Me Endpoint',
            status: 'success',
            message: 'Me endpoint working',
            data: meResponse
        });

    } catch (error) {
        results.tests.push({
            name: 'Auth Flow',
            status: 'failed',
            message: error.message,
            data: error.response?.data || null
        });
    }

    return results;
};