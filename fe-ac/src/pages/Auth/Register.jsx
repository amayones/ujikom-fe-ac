import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAuthStore } from '../../stores/index.js';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [fieldErrors, setFieldErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, loading, error, clearError } = useAuthStore();

    // Clear error on component mount
    useEffect(() => {
        clearError();
    }, [clearError]);

    const validateForm = () => {
        const errors = {};
        
        // Name validation
        if (!formData.name.trim()) {
            errors.name = 'Nama harus diisi';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            errors.name = 'Nama hanya boleh berisi huruf dan spasi';
        }
        
        // Email validation
        if (!formData.email.trim()) {
            errors.email = 'Email harus diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Format email tidak valid';
        }
        
        // Password validation
        if (!formData.password) {
            errors.password = 'Password harus diisi';
        } else if (formData.password.length < 8) {
            errors.password = 'Password minimal 8 karakter';
        }
        
        // Confirm password validation
        if (!formData.password_confirmation) {
            errors.password_confirmation = 'Konfirmasi password harus diisi';
        } else if (formData.password !== formData.password_confirmation) {
            errors.password_confirmation = 'Password tidak cocok';
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
        

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        clearError();
        
        try {
            await register(formData);
        } catch (err) {
            console.error('Register error:', err);
            // Handle validation errors
            if (err.errors) {
                setFieldErrors(err.errors);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8">
            <div className="w-full max-w-md bg-black rounded-lg shadow-lg p-8">
                {/* Judul */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Daftar Akun Cinema
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Buat akun baru untuk menikmati layanan kami
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    {/* Name */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="masukkan nama lengkap"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 transition-colors ${
                                fieldErrors.name ? 'ring-2 ring-red-500 focus:ring-red-500' : 'focus:ring-red-500'
                            }`}
                            disabled={loading}
                        />
                        {fieldErrors.name && (
                            <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="masukkan email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 transition-colors ${
                                fieldErrors.email ? 'ring-2 ring-red-500 focus:ring-red-500' : 'focus:ring-red-500'
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
                                placeholder="buat password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 pr-10 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 transition-colors ${
                                    fieldErrors.password ? 'ring-2 ring-red-500 focus:ring-red-500' : 'focus:ring-red-500'
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

                    {/* Konfirmasi Password */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Konfirmasi Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="password_confirmation"
                                placeholder="ulangi password"
                                value={formData.password_confirmation}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 pr-10 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 transition-colors ${
                                    fieldErrors.password_confirmation ? 'ring-2 ring-red-500 focus:ring-red-500' : 'focus:ring-red-500'
                                }`}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                disabled={loading}
                            >
                                {showConfirmPassword ? (
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
                        {fieldErrors.password_confirmation && (
                            <p className="text-red-400 text-xs mt-1">{fieldErrors.password_confirmation}</p>
                        )}
                    </div>

                    {/* Tombol daftar */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded transition-colors flex items-center justify-center mt-6"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Mendaftar...
                            </>
                        ) : (
                            'Daftar'
                        )}
                    </button>
                </form>

                {/* Link login */}
                <p className="text-sm text-center text-gray-400 mt-6">
                    Sudah punya akun?{' '}
                    <Link to="/login" className="text-red-500 hover:underline font-medium">
                        Login di sini
                    </Link>
                </p>
            </div>
        </div>
    );
}
