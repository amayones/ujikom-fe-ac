import React from "react";
import { UserCircle, Ticket, Settings, ArrowLeft } from "lucide-react";

export default function Profile() {
    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 py-10 flex justify-center">
            <div className="w-full max-w-5xl bg-black rounded-lg shadow-lg p-6 md:p-10 relative">

                {/* Tombol Back */}
                <a
                    href="/"
                    className="absolute top-4 left-4 flex items-center text-gray-300 hover:text-red-500 transition-colors"
                >
                    <ArrowLeft size={18} className="mr-1" /> Back
                </a>

                {/* Header Profile */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-6">
                    {/* Avatar */}
                    <div className="flex flex-col items-center">
                        <div className="w-28 h-28 bg-gray-800 rounded-full flex items-center justify-center">
                            <UserCircle size={64} className="text-gray-500" />
                        </div>
                        <button className="mt-3 text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded">
                            Ganti Foto
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold">John Doe</h2>
                        <p className="text-gray-400">johndoe@email.com</p>
                        <p className="text-gray-400">+62 812-3456-7890</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex mt-8 border-b border-gray-700">
                    <button className="px-4 py-2 text-red-500 border-b-2 border-red-500 font-semibold flex items-center gap-2">
                        <UserCircle size={16} /> Profile Info
                    </button>
                    {/* <button className="px-4 py-2 text-gray-400 hover:text-white flex items-center gap-2">
                        <Ticket size={16} /> History
                    </button>
                    <button className="px-4 py-2 text-gray-400 hover:text-white flex items-center gap-2">
                        <Settings size={16} /> Settings
                    </button> */}
                </div>

                {/* Content: Profile Info */}
                <div className="mt-6">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Nama</label>
                            <input
                                type="text"
                                defaultValue="John Doe"
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                defaultValue="johndoe@email.com"
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">No. HP</label>
                            <input
                                type="text"
                                defaultValue="+62 812-3456-7890"
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Alamat</label>
                            <textarea
                                rows="3"
                                defaultValue="Jl. Sudirman No. 123, Jakarta"
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </form>

                    {/* Update Password */}
                    <div className="mt-6">
                        <label className="block text-sm text-gray-300 mb-1">
                            Ganti Password
                        </label>
                        <input
                            type="password"
                            placeholder="Masukkan password baru"
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    {/* Save Button */}
                    <div className="mt-6 text-right">
                        <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
