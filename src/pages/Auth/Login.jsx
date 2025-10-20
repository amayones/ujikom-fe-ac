import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(formData.email, formData.password);
        if (result.success) {
            // Redirect based on user role
            const user = result.user;
            switch (user.role) {
                case 'admin':
                    navigate('/admin');
                    break;
                case 'owner':
                    navigate('/owner');
                    break;
                case 'cashier':
                    navigate('/cashier');
                    break;
                case 'customer':
                default:
                    navigate('/');
                    break;
            }
        }
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

                {error && (
                    <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-sm">
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
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                        />

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
                                className="w-full px-4 py-2 pr-10 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
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
                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded transition-colors"
                    >
                        {loading ? 'Loading...' : 'Login'}
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
