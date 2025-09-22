import React from 'react';

export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-black rounded-lg shadow-lg p-8">
                {/* Judul */}
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Daftar Akun Cinema
                </h2>

                {/* Form */}
                <form className="space-y-5">
                    {/* Nama */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            placeholder="masukkan nama lengkap"
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

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
                            placeholder="buat password"
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    {/* Konfirmasi Password */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Konfirmasi Password</label>
                        <input
                            type="password"
                            placeholder="ulangi password"
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    {/* Tombol daftar */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition"
                    >
                        Daftar
                    </button>
                </form>

                {/* Link login */}
                <p className="text-sm text-center text-gray-400 mt-6">
                    Sudah punya akun?{' '}
                    <a href="/login" className="text-red-500 hover:underline">
                        Login di sini
                    </a>
                </p>
            </div>
        </div>
    );
}
