import React from 'react';
import { DollarSign, TrendingUp, Users, Film } from 'lucide-react';

export default function OwnerDashboard() {
    const stats = [
        { title: 'Total Revenue', value: 'Rp 25M', icon: DollarSign, color: 'bg-green-500', change: '+12%' },
        { title: 'Monthly Growth', value: '15.5%', icon: TrendingUp, color: 'bg-blue-500', change: '+2.3%' },
        { title: 'Active Users', value: '2,456', icon: Users, color: 'bg-purple-500', change: '+8%' },
        { title: 'Movies', value: '18', icon: Film, color: 'bg-red-500', change: '+3' }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Owner Dashboard</h1>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-green-400 text-sm">{stat.change}</span>
                            </div>
                            <p className="text-gray-400 text-sm">{stat.title}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Revenue Chart</h3>
                        <div className="h-64 bg-gray-700 rounded flex items-center justify-center">
                            <p className="text-gray-400">Revenue Chart Placeholder</p>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Popular Movies</h3>
                        <div className="space-y-4">
                            {['Spider-Man: No Way Home', 'The Batman', 'Doctor Strange 2'].map((movie, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span>{movie}</span>
                                    <span className="text-green-400">{(450 - index * 50)} tickets</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Financial Reports</h3>
                        <p className="text-gray-400 mb-4">View detailed financial analytics</p>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                            View Reports
                        </button>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Performance</h3>
                        <p className="text-gray-400 mb-4">Monitor cinema performance</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                            View Analytics
                        </button>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Settings</h3>
                        <p className="text-gray-400 mb-4">Manage cinema settings</p>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
                            Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}