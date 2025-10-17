import React, { useEffect } from 'react';
import { Film, Users, Calendar, TrendingUp, Clock, Star, Activity, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import useDashboardStore from '../../store/dashboardStore';

export default function AdminDashboard() {
    const { stats, recentMovies, recentCustomers, upcomingSchedules, loading, error, fetchDashboardData } = useDashboardStore();

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const statsCards = [
        { 
            title: 'Total Movies', 
            value: stats.totalMovies, 
            icon: Film, 
            color: 'from-blue-500 to-blue-600',
            change: '+12%',
            changeColor: 'text-green-400'
        },
        { 
            title: 'Customers', 
            value: stats.totalCustomers, 
            icon: Users, 
            color: 'from-green-500 to-green-600',
            change: '+8%',
            changeColor: 'text-green-400'
        },
        { 
            title: 'Schedules', 
            value: stats.totalSchedules, 
            icon: Calendar, 
            color: 'from-purple-500 to-purple-600',
            change: '+15%',
            changeColor: 'text-green-400'
        },
        { 
            title: 'Revenue', 
            value: `Rp ${(stats.totalRevenue / 1000000).toFixed(1)}M`, 
            icon: TrendingUp, 
            color: 'from-red-500 to-red-600',
            change: '+23%',
            changeColor: 'text-green-400'
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-gray-400">Loading dashboard...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-400">Welcome back! Here's what's happening at your cinema.</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 bg-red-600 text-white rounded-lg">
                        {error}
                    </div>
                )}
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statsCards.map((stat, index) => (
                        <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg shadow-lg`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className={`text-sm font-medium ${stat.changeColor}`}>
                                    {stat.change}
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                                <p className="text-3xl font-bold">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Recent Movies */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center gap-3 mb-6">
                            <Film className="w-5 h-5 text-blue-400" />
                            <h3 className="text-xl font-semibold">Recent Movies</h3>
                        </div>
                        <div className="space-y-4">
                            {recentMovies.slice(0, 4).map((movie) => (
                                <div key={movie.id} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                        <Film className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{movie.title}</p>
                                        <p className="text-gray-400 text-xs">{movie.genre}</p>
                                    </div>
                                    <div className={`px-2 py-1 rounded text-xs ${
                                        movie.status === 'now_playing' ? 'bg-green-600' : 'bg-yellow-600'
                                    }`}>
                                        {movie.status === 'now_playing' ? 'Playing' : 'Coming'}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link to="/admin/movies" className="block mt-4 text-center text-blue-400 hover:text-blue-300 text-sm">
                            View All Movies →
                        </Link>
                    </div>

                    {/* Recent Customers */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="w-5 h-5 text-green-400" />
                            <h3 className="text-xl font-semibold">New Customers</h3>
                        </div>
                        <div className="space-y-4">
                            {recentCustomers.slice(0, 4).map((customer) => (
                                <div key={customer.id} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm">
                                            {customer.name?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{customer.name}</p>
                                        <p className="text-gray-400 text-xs">{customer.email}</p>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {new Date(customer.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link to="/admin/customers" className="block mt-4 text-center text-green-400 hover:text-green-300 text-sm">
                            View All Customers →
                        </Link>
                    </div>

                    {/* Upcoming Schedules */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center gap-3 mb-6">
                            <Calendar className="w-5 h-5 text-purple-400" />
                            <h3 className="text-xl font-semibold">Today's Schedules</h3>
                        </div>
                        <div className="space-y-4">
                            {upcomingSchedules.slice(0, 4).map((schedule) => (
                                <div key={schedule.id} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{schedule.film?.title || 'Movie'}</p>
                                        <p className="text-gray-400 text-xs">Studio {schedule.studio_id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{schedule.time}</p>
                                        <p className="text-xs text-gray-400">{schedule.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link to="/admin/schedules" className="block mt-4 text-center text-purple-400 hover:text-purple-300 text-sm">
                            View All Schedules →
                        </Link>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link to="/admin/movies" className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <Film className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                            <div>
                                <h3 className="text-lg font-semibold text-white">Movies</h3>
                                <p className="text-blue-100 text-sm">Manage films</p>
                            </div>
                        </div>
                    </Link>
                    
                    <Link to="/admin/customers" className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 hover:from-green-700 hover:to-green-800 transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <Users className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                            <div>
                                <h3 className="text-lg font-semibold text-white">Customers</h3>
                                <p className="text-green-100 text-sm">Manage users</p>
                            </div>
                        </div>
                    </Link>
                    
                    <Link to="/admin/schedules" className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <Calendar className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                            <div>
                                <h3 className="text-lg font-semibold text-white">Schedules</h3>
                                <p className="text-purple-100 text-sm">Manage showtimes</p>
                            </div>
                        </div>
                    </Link>
                    
                    <Link to="/admin/prices" className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 hover:from-red-700 hover:to-red-800 transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <TrendingUp className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                            <div>
                                <h3 className="text-lg font-semibold text-white">Pricing</h3>
                                <p className="text-red-100 text-sm">Manage prices</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}