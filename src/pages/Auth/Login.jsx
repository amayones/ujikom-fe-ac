import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await authService.login(email, password);
            login(response.user, response.token);
            
            // Redirect based on user role
            const redirectPath = authService.getRoleBasedRedirect(response.user);
            navigate(redirectPath);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-black rounded-lg shadow-lg p-8">
                {/* Judul */}
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Login Akun Cinema
                </h2>

                {error && (
                    <div className="bg-red-600 text-white p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="masukkan email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    {/* Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <Link to="/forgot-password" className="text-red-500 hover:underline">
                            Lupa password?
                        </Link>
                    </div>

                    {/* Tombol login */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded transition"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>

                {/* Link daftar */}
                <p className="text-sm text-center text-gray-400 mt-6">
                    Belum punya akun?{' '}
                    <Link to="/register" className="text-red-500 hover:underline">
                        Daftar sekarang
                    </Link>
                </p>
            </div>
        </div>
    );
}
