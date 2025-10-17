import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+62 812-3456-7890',
        address: 'Jl. Sudirman No. 123, Jakarta'
    });

    const [editData, setEditData] = useState({ ...profile });

    const handleSave = () => {
        setProfile({ ...editData });
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const handleCancel = () => {
        setEditData({ ...profile });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Profile</h1>
                
                <div className="bg-gray-800 rounded-lg p-6">
                    {/* Profile Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                                <User className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{profile.name}</h2>
                                <p className="text-gray-400">Customer</p>
                            </div>
                        </div>
                        
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                            >
                                <Edit2 className="w-4 h-4" />
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                                >
                                    <Save className="w-4 h-4" />
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Profile Fields */}
                    <div className="space-y-6">
                        <div>
                            <label className="flex items-center gap-2 text-gray-400 mb-2">
                                <User className="w-4 h-4" />
                                Full Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                                />
                            ) : (
                                <p className="text-white">{profile.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-gray-400 mb-2">
                                <Mail className="w-4 h-4" />
                                Email
                            </label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={editData.email}
                                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                                />
                            ) : (
                                <p className="text-white">{profile.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-gray-400 mb-2">
                                <Phone className="w-4 h-4" />
                                Phone Number
                            </label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    value={editData.phone}
                                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                                />
                            ) : (
                                <p className="text-white">{profile.phone}</p>
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-gray-400 mb-2">
                                <MapPin className="w-4 h-4" />
                                Address
                            </label>
                            {isEditing ? (
                                <textarea
                                    value={editData.address}
                                    onChange={(e) => setEditData({...editData, address: e.target.value})}
                                    rows={3}
                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                                />
                            ) : (
                                <p className="text-white">{profile.address}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}