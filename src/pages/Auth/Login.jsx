import React from 'react';

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-black rounded-lg shadow-lg p-8">
                {/* Judul */}
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Login Akun Cinema
                </h2>

                {/* Form */}
                <form className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="masukkan email"
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="masukkan password"
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    {/* Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <a href="/forgot-password" className="text-red-500 hover:underline">
                            Lupa password?
                        </a>
                    </div>

                    {/* Tombol login */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition"
                    >
                        Login
                    </button>
                </form>

                {/* Link daftar */}
                <p className="text-sm text-center text-gray-400 mt-6">
                    Belum punya akun?{' '}
                    <a href="/register" className="text-red-500 hover:underline">
                        Daftar sekarang
                    </a>
                </p>
            </div>
        </div>
    );
}
