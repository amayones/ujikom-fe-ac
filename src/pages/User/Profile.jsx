import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { filmService } from '../../services';
import api from '../../services/api';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X } from 'lucide-react';

export default function Profile() {
    const { user, login } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || user?.nama || '',
        email: user?.email || '',
        phone: user?.phone || user?.no_hp || '',
        address: user?.address || user?.alamat || '',
        birth_date: user?.birth_date || user?.tanggal_lahir || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await api.put('/customer/profile', formData);
            login(response.user, localStorage.getItem('token'));
            setIsEditing(false);
            alert('Profile berhasil diupdate');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Gagal update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || user?.nama || '',
            email: user?.email || '',
            phone: user?.phone || user?.no_hp || '',
            address: user?.address || user?.alamat || '',
            birth_date: user?.birth_date || user?.tanggal_lahir || ''
        });
        setIsEditing(false);
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold">{user?.name || user?.nama || 'User Profile'}</h1>
                    <p className="text-gray-400">Kelola informasi profil Anda</p>
                </div>

                {/* Profile Form */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Informasi Pribadi</h2>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                            >
                                <Edit3 className="w-4 h-4" />
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded-lg transition"
                                >
                                    <Save className="w-4 h-4" />
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        {/* Nama */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                <User className="w-4 h-4" />
                                Nama Lengkap
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Masukkan nama lengkap"
                                />
                            ) : (
                                <div className="p-3 bg-gray-700 rounded-lg">
                                    {formData.name || 'Belum diisi'}
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                <Mail className="w-4 h-4" />
                                Email
                            </label>
                            <div className="p-3 bg-gray-700 rounded-lg text-gray-400">
                                {formData.email || 'Belum diisi'}
                                <span className="text-xs block mt-1">Email tidak dapat diubah</span>
                            </div>
                        </div>

                        {/* No HP */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                <Phone className="w-4 h-4" />
                                Nomor HP
                            </label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Masukkan nomor HP"
                                />
                            ) : (
                                <div className="p-3 bg-gray-700 rounded-lg">
                                    {formData.phone || 'Belum diisi'}
                                </div>
                            )}
                        </div>

                        {/* Alamat */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                <MapPin className="w-4 h-4" />
                                Alamat
                            </label>
                            {isEditing ? (
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Masukkan alamat lengkap"
                                />
                            ) : (
                                <div className="p-3 bg-gray-700 rounded-lg">
                                    {formData.address || 'Belum diisi'}
                                </div>
                            )}
                        </div>

                        {/* Tanggal Lahir */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                <Calendar className="w-4 h-4" />
                                Tanggal Lahir
                            </label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    name="birth_date"
                                    value={formData.birth_date}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            ) : (
                                <div className="p-3 bg-gray-700 rounded-lg">
                                    {formData.birth_date ? 
                                        new Date(formData.birth_date).toLocaleDateString('id-ID') : 
                                        'Belum diisi'
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Account Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">12</div>
                        <div className="text-sm text-gray-400">Total Tiket</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400">8</div>
                        <div className="text-sm text-gray-400">Film Ditonton</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400">3</div>
                        <div className="text-sm text-gray-400">Bulan Bergabung</div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-gray-800 rounded-lg p-6 mt-8">
                    <h2 className="text-xl font-bold mb-4">Keamanan</h2>
                    <div className="space-y-4">
                        <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <div className="font-semibold">Ubah Password</div>
                            <div className="text-sm text-gray-400">Terakhir diubah 2 bulan lalu</div>
                        </button>
                        <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <div className="font-semibold">Verifikasi Email</div>
                            <div className="text-sm text-gray-400">Email sudah terverifikasi</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}