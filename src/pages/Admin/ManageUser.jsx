import React, { useState, useEffect } from 'react';
import { adminService } from '../../services';
import { Users, Search, Filter, Edit, Trash2, UserPlus } from 'lucide-react';

export default function ManageUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await adminService.getCustomers();
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            // Mock data
            setUsers([
                { id: 1, nama: 'John Doe', email: 'john@email.com', role: 'pelanggan', no_hp: '081234567890', status: 'active' },
                { id: 2, nama: 'Jane Smith', email: 'jane@email.com', role: 'kasir', no_hp: '081234567891', status: 'active' },
                { id: 3, nama: 'Bob Johnson', email: 'bob@email.com', role: 'pelanggan', no_hp: '081234567892', status: 'inactive' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus user ini?')) {
            try {
                await adminService.deleteUser(id);
                await fetchUsers();
            } catch (error) {
                console.error('Failed to delete user:', error);
                alert('Gagal menghapus user');
            }
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = (user.name || user.nama || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Kelola Pengguna</h1>
                        <p className="text-gray-400">Manage semua pengguna sistem</p>
                    </div>
                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
                        <UserPlus className="w-5 h-5" />
                        Tambah User
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Cari pengguna..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="pl-10 pr-8 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="all">Semua Role</option>
                            <option value="pelanggan">Pelanggan</option>
                            <option value="kasir">Kasir</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Pengguna</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">No HP</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredUsers.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-700">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-4">
                                                    <Users className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium">{user.name || user.nama}</div>
                                                    <div className="text-sm text-gray-400">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                user.role === 'admin' ? 'bg-purple-600/20 text-purple-400' :
                                                user.role === 'kasir' ? 'bg-blue-600/20 text-blue-400' :
                                                'bg-green-600/20 text-green-400'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{user.phone || user.no_hp}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                user.status === 'active' 
                                                    ? 'bg-green-600/20 text-green-400'
                                                    : 'bg-red-600/20 text-red-400'
                                            }`}>
                                                {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="text-blue-400 hover:text-blue-300">
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
                </div>
            </div>
        </div>
    );
}