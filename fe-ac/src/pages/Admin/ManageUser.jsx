import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2 } from 'lucide-react';
import Toast from '../../components/Toast';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useUsersStore } from '../../stores/index.js';

export default function ManageUser() {
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const { users, loading, fetchUsers, createUser, updateUser, deleteUser } = useUsersStore();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'customer',
        password: ''
    });
    const [toast, setToast] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, userId: null });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            await fetchUsers();
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (editingUser) {
                await updateUser(editingUser.id, formData);
            } else {
                await createUser(formData);
            }
            
            setShowModal(false);
            setEditingUser(null);
            setFormData({ name: '', email: '', role: 'customer', password: '' });
            setToast({ message: editingUser ? 'User berhasil diupdate!' : 'User berhasil ditambahkan!', type: 'success' });
        } catch (error) {
            console.error('Failed to save user:', error);
            setToast({ message: error.message || 'Gagal menyimpan user', type: 'error' });
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name || '',
            email: user.email || '',
            role: user.role || 'customer',
            password: ''
        });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setConfirmDialog({ isOpen: true, userId: id });
    };

    const confirmDelete = async () => {
        try {
            await deleteUser(confirmDialog.userId);
            setToast({ message: 'User berhasil dihapus!', type: 'success' });
        } catch (error) {
            console.error('Failed to delete user:', error);
            setToast({ message: error.message || 'Gagal menghapus user', type: 'error' });
        } finally {
            setConfirmDialog({ isOpen: false, userId: null });
        }
    };

    const getRoleBadge = (role) => {
        const colors = {
            admin: 'bg-purple-600/20 text-purple-400',
            owner: 'bg-yellow-600/20 text-yellow-400',
            cashier: 'bg-blue-600/20 text-blue-400',
            customer: 'bg-green-600/20 text-green-400'
        };
        return colors[role] || colors.customer;
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Kelola User</h1>
                        <p className="text-gray-400">Manage semua pengguna sistem</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingUser(null);
                            setFormData({ name: '', email: '', role: 'customer', password: '' });
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah User
                    </button>
                </div>

                {/* Users Table */}
                {loading ? (
                    <div className="text-center py-8">
                        <div className="text-gray-400">Loading...</div>
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="text-gray-400">Belum ada user. Klik "Tambah User" untuk membuat user baru.</div>
                    </div>
                ) : (
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-700">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-4">
                                                    <Users className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium">{user.name}</div>
                                                    <div className="text-sm text-gray-400">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadge(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="text-blue-400 hover:text-blue-300"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-gray-800/95 backdrop-blur-md rounded-xl p-6 w-full max-w-md border border-gray-700/50 shadow-2xl">
                            <h2 className="text-xl font-bold mb-4">
                                {editingUser ? 'Edit User' : 'Tambah User Baru'}
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Nama</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="cashier">Cashier</option>
                                        <option value="admin">Admin</option>
                                        <option value="owner">Owner</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Password {editingUser && '(kosongkan jika tidak ingin mengubah)'}
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                        required={!editingUser}
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-2 rounded-lg transition"
                                    >
                                        {loading ? 'Menyimpan...' : (editingUser ? 'Update' : 'Tambah')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Toast */}
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}

                {/* Confirm Dialog */}
                <ConfirmDialog
                    isOpen={confirmDialog.isOpen}
                    title="Hapus User"
                    message="Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan."
                    onConfirm={confirmDelete}
                    onCancel={() => setConfirmDialog({ isOpen: false, userId: null })}
                    type="danger"
                />
            </div>
        </div>
    );
}