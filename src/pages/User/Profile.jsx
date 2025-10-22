import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Edit2, Save, X, LogOut, Star, Film, Ticket, CheckCircle } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useBookingStore from '../../store/bookingStore';

export default function Profile() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const { isEditing, profile, editData, setIsEditing, setProfile, setEditData, saveProfile, cancelEdit } = useBookingStore();
    
    useEffect(() => {
        setProfile({
            name: user?.name || 'John Doe',
            email: user?.email || 'john@example.com',
            phone: user?.phone || '+62 812-3456-7890',
            address: user?.address || 'Jl. Sudirman No. 123, Jakarta'
        });
    }, [user, setProfile]);

    const handleSave = () => {
        saveProfile();
        // Using modern notification instead of alert
    };

    const handleCancel = () => {
        cancelEdit();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-rose-900 text-white">
            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(244,114,182,0.3),transparent_70%)]" />
                <div className="relative z-10 text-center py-16 px-6">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-rose-700/30 backdrop-blur-sm rounded-full border border-rose-600/50 mb-6">
                        <User className="text-rose-400" size={24} />
                        <span className="text-rose-300 font-semibold">USER PROFILE</span>
                    </div>
                    <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                        My Profile
                    </h1>
                    <p className="text-xl text-rose-300 max-w-2xl mx-auto">
                        Manage your personal information and account settings
                    </p>
                </div>
            </div>
            
            <div className="max-w-4xl mx-auto px-6 pb-20">
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 shadow-lg">
                    {/* Profile Header */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
                        <div className="flex flex-col lg:flex-row items-center gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                    <User className="w-12 h-12 text-white" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-slate-800">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <div className="text-center lg:text-left">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h2>
                                <div className="flex items-center gap-2 justify-center lg:justify-start">
                                    <div className="px-3 py-1 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full border border-rose-400/30">
                                        <span className="text-rose-600 text-sm font-semibold flex items-center gap-1">
                                            <Star className="w-3 h-3" />
                                            Premium Customer
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                </>
                            )}
                            <button
                                onClick={async () => {
                                    await logout();
                                    navigate('/login');
                                }}
                                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Profile Fields */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-white/20 rounded-2xl p-6 border border-rose-200">
                                <label className="flex items-center gap-3 text-rose-700 mb-4 font-semibold">
                                    <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                                        className="w-full bg-white/90 text-gray-800 px-4 py-3 rounded-xl border border-rose-300 focus:border-rose-500 focus:outline-none transition-colors"
                                        placeholder="Enter your full name"
                                    />
                                ) : (
                                    <p className="text-gray-800 text-lg font-medium bg-white/50 px-4 py-3 rounded-xl">{profile.name}</p>
                                )}
                            </div>

                            <div className="bg-white/20 rounded-2xl p-6 border border-rose-200">
                                <label className="flex items-center gap-3 text-rose-700 mb-4 font-semibold">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                        <Mail className="w-4 h-4 text-white" />
                                    </div>
                                    Email Address
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={editData.email}
                                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                                        className="w-full bg-white/90 text-gray-800 px-4 py-3 rounded-xl border border-rose-300 focus:border-blue-400 focus:outline-none transition-colors"
                                        placeholder="Enter your email"
                                    />
                                ) : (
                                    <p className="text-gray-800 text-lg font-medium bg-white/50 px-4 py-3 rounded-xl">{profile.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white/20 rounded-2xl p-6 border border-rose-200">
                                <label className="flex items-center gap-3 text-rose-700 mb-4 font-semibold">
                                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                        <Phone className="w-4 h-4 text-white" />
                                    </div>
                                    Phone Number
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={editData.phone}
                                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                                        className="w-full bg-white/90 text-gray-800 px-4 py-3 rounded-xl border border-rose-300 focus:border-green-400 focus:outline-none transition-colors"
                                        placeholder="Enter your phone number"
                                    />
                                ) : (
                                    <p className="text-gray-800 text-lg font-medium bg-white/50 px-4 py-3 rounded-xl">{profile.phone}</p>
                                )}
                            </div>

                            <div className="bg-white/20 rounded-2xl p-6 border border-rose-200">
                                <label className="flex items-center gap-3 text-rose-700 mb-4 font-semibold">
                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-white" />
                                    </div>
                                    Address
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={editData.address}
                                        onChange={(e) => setEditData({...editData, address: e.target.value})}
                                        rows={4}
                                        className="w-full bg-white/90 text-gray-800 px-4 py-3 rounded-xl border border-rose-300 focus:border-purple-400 focus:outline-none transition-colors resize-none"
                                        placeholder="Enter your address"
                                    />
                                ) : (
                                    <p className="text-gray-800 text-lg font-medium bg-white/50 px-4 py-3 rounded-xl min-h-[100px] flex items-start">{profile.address}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Account Stats */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border border-emerald-400/30 text-center">
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mb-2">
                                <Film className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mb-1">12</div>
                            <div className="text-gray-600">Movies Watched</div>
                        </div>
                        <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-2xl p-6 border border-violet-400/30 text-center">
                            <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center mb-2">
                                <Ticket className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-violet-600 mb-1">8</div>
                            <div className="text-gray-600">Tickets Booked</div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl p-6 border border-amber-400/30 text-center">
                            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mb-2">
                                <Star className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-amber-600 mb-1">Premium</div>
                            <div className="text-gray-600">Member Status</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}