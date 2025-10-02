import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Film, Users, Calendar, DollarSign, TrendingUp, Eye } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalFilms: 0,
        totalCustomers: 0,
        totalSchedules: 0,
        totalRevenue: 0,
        todayBookings: 0,
        activeFilms: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Simulate API calls
                setStats({
                    totalFilms: 25,
                    totalCustomers: 1250,
                    totalSchedules: 48,
                    totalRevenue: 125000000,
                    todayBookings: 45,
                    activeFilms: 12
                });
                
                setRecentBookings([
                    { id: 1, customer: 'John Doe', film: 'Avengers: Endgame', time: '19:30', status: 'confirmed' },
                    { id: 2, customer: 'Jane Smith', film: 'Oppenheimer', time: '21:00', status: 'pending' },
                    { id: 3, customer: 'Bob Johnson', film: 'Barbie', time: '17:15', status: 'confirmed' }
                ]);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statCards = [
        { title: 'Total Film', value: stats.totalFilms, icon: Film, color: 'blue', change: '+2 bulan ini' },
        { title: 'Total Pelanggan', value: stats.totalCustomers, icon: Users, color: 'green', change: '+15% bulan ini' },
        { title: 'Jadwal Aktif', value: stats.totalSchedules, icon: Calendar, color: 'purple', change: '+8 minggu ini' },
        { title: 'Pendapatan', value: `Rp ${(stats.totalRevenue / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'yellow', change: '+12% bulan ini' },
        { title: 'Booking Hari Ini', value: stats.todayBookings, icon: TrendingUp, color: 'red', change: '+5 dari kemarin' },
        { title: 'Film Aktif', value: stats.activeFilms, icon: Eye, color: 'indigo', change: '8 sedang tayang' }
    ];

    if (loading) {
        return (
            <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-gray-400">Selamat datang di panel admin Absolute Cinema</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {statCards.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={index} className="bg-gray-800 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-lg bg-${stat.color}-600/20`}>
                                        <IconComponent className={`w-6 h-6 text-${stat.color}-400`} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                        <p className="text-sm text-gray-400">{stat.title}</p>
                                    </div>
                                </div>
                                <p className="text-xs text-green-400">{stat.change}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Bookings */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Booking Terbaru</h2>
                        <div className="space-y-4">
                            {recentBookings.map(booking => (
                                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                                    <div>
                                        <p className="font-semibold">{booking.customer}</p>
                                        <p className="text-sm text-gray-400">{booking.film} - {booking.time}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        booking.status === 'confirmed' 
                                            ? 'bg-green-600/20 text-green-400'
                                            : 'bg-yellow-600/20 text-yellow-400'
                                    }`}>
                                        {booking.status === 'confirmed' ? 'Dikonfirmasi' : 'Menunggu'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Aksi Cepat</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-center">
                                <Film className="w-8 h-8 mx-auto mb-2" />
                                <p className="text-sm font-medium">Tambah Film</p>
                            </button>
                            <button className="p-4 bg-green-600 hover:bg-green-700 rounded-lg transition text-center">
                                <Calendar className="w-8 h-8 mx-auto mb-2" />
                                <p className="text-sm font-medium">Buat Jadwal</p>
                            </button>
                            <button className="p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition text-center">
                                <Users className="w-8 h-8 mx-auto mb-2" />
                                <p className="text-sm font-medium">Kelola User</p>
                            </button>
                            <button className="p-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition text-center">
                                <DollarSign className="w-8 h-8 mx-auto mb-2" />
                                <p className="text-sm font-medium">Set Harga</p>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Performance Chart Placeholder */}
                <div className="bg-gray-800 rounded-lg p-6 mt-8">
                    <h2 className="text-xl font-bold mb-4">Performa Penjualan</h2>
                    <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400">Chart akan ditampilkan di sini</p>
                    </div>
                </div>
            </div>
        </div>
    );
}