import React, { useState } from 'react';
import api from '../services/api';

export default function ApiTest() {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const testApi = async () => {
        setLoading(true);
        setResult('Testing...');
        
        try {
            const response = await api.get('/test');
            setResult(`✅ Success: ${JSON.stringify(response.data, null, 2)}`);
        } catch (error) {
            setResult(`❌ Error: ${error.message}\nDetails: ${JSON.stringify(error, null, 2)}`);
        } finally {
            setLoading(false);
        }
    };

    const testLogin = async () => {
        setLoading(true);
        setResult('Testing login...');
        
        try {
            const response = await api.post('/login', {
                email: 'test@test.com',
                password: 'test123'
            });
            setResult(`✅ Login Response: ${JSON.stringify(response.data, null, 2)}`);
        } catch (error) {
            setResult(`❌ Login Error: ${error.message}\nResponse: ${JSON.stringify(error.response?.data, null, 2)}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-gray-800 text-white">
            <h3 className="text-lg font-bold mb-4">API Test</h3>
            <div className="space-x-2 mb-4">
                <button 
                    onClick={testApi}
                    disabled={loading}
                    className="bg-blue-600 px-4 py-2 rounded disabled:bg-gray-600"
                >
                    Test API Connection
                </button>
                <button 
                    onClick={testLogin}
                    disabled={loading}
                    className="bg-green-600 px-4 py-2 rounded disabled:bg-gray-600"
                >
                    Test Login
                </button>
            </div>
            <pre className="bg-black p-4 rounded text-sm overflow-auto max-h-96">
                {result || 'Click a button to test'}
            </pre>
        </div>
    );
}