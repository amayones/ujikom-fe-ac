import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/index.js';
import { authService } from '../../services/index.js';
import api from '../../api/config.js';
import { testApiConnection, testAuthFlow } from '../../utils/apiTest.js';

export default function ApiTest() {
    const { user, token, login, logout, loading } = useAuthStore();
    const [testData, setTestData] = useState({
        email: 'test@example.com',
        password: 'password123'
    });
    const [apiResponse, setApiResponse] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('checking');
    const [apiUrl, setApiUrl] = useState('');
    const [testResults, setTestResults] = useState(null);
    const [testLoading, setTestLoading] = useState(false);

    useEffect(() => {
        checkConnection();
        setApiUrl(api.defaults.baseURL);
    }, []);

    const checkConnection = async () => {
        try {
            const response = await fetch(api.defaults.baseURL.replace('/api', '/'));
            if (response.ok) {
                setConnectionStatus('connected');
            } else {
                setConnectionStatus('error');
            }
        } catch (error) {
            setConnectionStatus('error');
        }
    };

    const runApiTests = async () => {
        setTestLoading(true);
        try {
            const results = await testApiConnection();
            setTestResults(results);
        } catch (error) {
            setTestResults({ error: error.message });
        }
        setTestLoading(false);
    };

    const runAuthTests = async () => {
        setTestLoading(true);
        try {
            const results = await testAuthFlow();
            setTestResults(results);
        } catch (error) {
            setTestResults({ error: error.message });
        }
        setTestLoading(false);
    };

    const handleTestLogin = async () => {
        try {
            const result = await login(testData.email, testData.password);
            setApiResponse({ type: 'success', data: result });
        } catch (error) {
            setApiResponse({ type: 'error', data: error });
        }
    };

    const handleTestMe = async () => {
        try {
            const result = await authService.me();
            setApiResponse({ type: 'success', data: result });
        } catch (error) {
            setApiResponse({ type: 'error', data: error });
        }
    };

    const handleTestLogout = async () => {
        try {
            await logout();
            setApiResponse({ type: 'success', data: 'Logout successful' });
        } catch (error) {
            setApiResponse({ type: 'error', data: error });
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">API Test Page</h1>
                
                {/* Connection Status */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Connection Status</h2>
                    <div className="space-y-2">
                        <p className="text-gray-300">
                            <span className="font-medium">API URL:</span> {apiUrl}
                        </p>
                        <p className="text-gray-300">
                            <span className="font-medium">Status:</span> 
                            <span className={`ml-2 px-2 py-1 rounded text-sm ${
                                connectionStatus === 'connected' ? 'bg-green-600 text-white' :
                                connectionStatus === 'error' ? 'bg-red-600 text-white' :
                                'bg-yellow-600 text-white'
                            }`}>
                                {connectionStatus === 'connected' ? 'Connected' :
                                 connectionStatus === 'error' ? 'Connection Error' :
                                 'Checking...'}
                            </span>
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={checkConnection}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                            >
                                Recheck Connection
                            </button>
                            <button
                                onClick={runApiTests}
                                disabled={testLoading}
                                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded text-sm"
                            >
                                {testLoading ? 'Testing...' : 'Run API Tests'}
                            </button>
                            <button
                                onClick={runAuthTests}
                                disabled={testLoading}
                                className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white px-4 py-2 rounded text-sm"
                            >
                                {testLoading ? 'Testing...' : 'Test Auth Flow'}
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Auth Status */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Auth Status</h2>
                    <div className="space-y-2">
                        <p className="text-gray-300">
                            <span className="font-medium">Token:</span> {token ? 'Present' : 'None'}
                        </p>
                        <p className="text-gray-300">
                            <span className="font-medium">User:</span> {user ? user.email : 'Not logged in'}
                        </p>
                        <p className="text-gray-300">
                            <span className="font-medium">Role:</span> {user ? user.role : 'N/A'}
                        </p>
                        <p className="text-gray-300">
                            <span className="font-medium">Loading:</span> {loading ? 'Yes' : 'No'}
                        </p>
                    </div>
                </div>

                {/* Test Controls */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Test Controls</h2>
                    
                    {/* Login Test */}
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-white mb-2">Test Login</h3>
                        <div className="flex gap-4 mb-2">
                            <input
                                type="email"
                                placeholder="Email"
                                value={testData.email}
                                onChange={(e) => setTestData({...testData, email: e.target.value})}
                                className="px-3 py-2 bg-gray-700 text-white rounded"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={testData.password}
                                onChange={(e) => setTestData({...testData, password: e.target.value})}
                                className="px-3 py-2 bg-gray-700 text-white rounded"
                            />
                        </div>
                        <button
                            onClick={handleTestLogin}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded"
                        >
                            Test Login
                        </button>
                    </div>

                    {/* Me Test */}
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-white mb-2">Test /me Endpoint</h3>
                        <button
                            onClick={handleTestMe}
                            disabled={!token || loading}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded"
                        >
                            Test /me
                        </button>
                    </div>

                    {/* Logout Test */}
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-white mb-2">Test Logout</h3>
                        <button
                            onClick={handleTestLogout}
                            disabled={!token || loading}
                            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-4 py-2 rounded"
                        >
                            Test Logout
                        </button>
                    </div>
                </div>

                {/* Test Results */}
                {testResults && (
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Test Results</h2>
                        {testResults.error ? (
                            <div className="bg-red-900/50 border border-red-500 p-4 rounded">
                                <p className="text-red-200">{testResults.error}</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {testResults.baseUrl && (
                                    <p className="text-gray-300">
                                        <span className="font-medium">Base URL:</span> {testResults.baseUrl}
                                    </p>
                                )}
                                {testResults.tests?.map((test, index) => (
                                    <div key={index} className={`p-4 rounded border ${
                                        test.status === 'success' ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'
                                    }`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-medium text-white">{test.name}</h3>
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                test.status === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                                            }`}>
                                                {test.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 text-sm mb-2">{test.message}</p>
                                        {test.data && (
                                            <details className="text-xs">
                                                <summary className="cursor-pointer text-gray-400 hover:text-white">Show Data</summary>
                                                <pre className="mt-2 p-2 bg-gray-900 rounded overflow-auto text-gray-200">
                                                    {JSON.stringify(test.data, null, 2)}
                                                </pre>
                                            </details>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* API Response */}
                {apiResponse && (
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Manual Test Response</h2>
                        <div className={`p-4 rounded ${apiResponse.type === 'success' ? 'bg-green-900/50 border border-green-500' : 'bg-red-900/50 border border-red-500'}`}>
                            <pre className="text-sm text-gray-200 overflow-auto">
                                {JSON.stringify(apiResponse.data, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}