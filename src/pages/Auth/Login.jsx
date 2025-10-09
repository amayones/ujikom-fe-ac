import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useAuth();

    // Redirect if already authenticated and handle success message
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }

        // Check for success message from registration
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
            // Clear the message from location state
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [isAuthenticated, navigate, location]);

    const validateForm = () => {
        const errors = {};

        if (!formData.email.trim()) {
            errors.email = 'Email harus diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Format email tidak valid';
        }

        if (!formData.password) {
            errors.password = 'Password harus diisi';
        } else if (formData.password.length < 3) {
            errors.password = 'Password minimal 3 karakter';
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: '' }));
        }

        // Clear general error and success message
        if (error) setError('');
        if (successMessage) setSuccessMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');

        // Mock login for testing - always succeeds
        setTimeout(() => {
            const mockUser = {
                id: 1,
                email: formData.email,
                role: 'customer',
                name: 'Test User'
            };
            const mockToken = 'mock-token-123';

            login(mockUser, mockToken);
            navigate('/', { replace: true });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-md bg-black rounded-lg shadow-lg p-8">
                {/* Judul */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Login Akun Cinema
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Masuk untuk melanjutkan ke akun Anda
                    </p>
                </div>

                {successMessage && (
                    <div className="bg-green-600 text-white p-3 rounded mb-4 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="bg-red-600 text-white p-3 rounded mb-4 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="masukkan email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 transition-colors ${fieldErrors.email ? 'ring-2 ring-red-500 focus:ring-red-500' : 'focus:ring-red-500'
                                }`}
                            disabled={loading}
                        />
                        {fieldErrors.email && (
                            <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="masukkan password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 pr-10 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 transition-colors ${fieldErrors.password ? 'ring-2 ring-red-500 focus:ring-red-500' : 'focus:ring-red-500'
                                    }`}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                disabled={loading}
                            >
                                {showPassword ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {fieldErrors.password && (
                            <p className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>
                        )}
                    </div>

                    {/* Forgot */}
                    <div className="flex items-center justify-end text-sm">
                        <Link to="/forgot-password" className="text-red-500 hover:underline">
                            Lupa password?
                        </Link>
                    </div>

                    {/* Tombol login */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded transition-colors flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Memproses...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

                {/* Link daftar */}
                <p className="text-sm text-center text-gray-400 mt-6">
                    Belum punya akun?{' '}
                    <Link to="/register" className="text-red-500 hover:underline font-medium">
                        Daftar sekarang
                    </Link>
                </p>
            </div>

        </div>
    );
}
