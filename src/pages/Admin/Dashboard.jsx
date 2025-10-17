import React from 'react';
import { Film, Users, Calendar, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { title: 'Total Films', value: '12', icon: Film, color: 'bg-blue-500' },
        { title: 'Total Users', value: '1,234', icon: Users, color: 'bg-green-500' },
        { title: 'Schedules', value: '45', icon: Calendar, color: 'bg-purple-500' },
        { title: 'Revenue', value: 'Rp 15M', icon: TrendingUp, color: 'bg-red-500' }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">{stat.title}</p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Manage Films</h3>
                        <p className="text-gray-400 mb-4">Add, edit, or remove films from the system</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                            Manage Films
                        </button>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Manage Users</h3>
                        <p className="text-gray-400 mb-4">View and manage user accounts</p>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                            Manage Users
                        </button>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Schedules</h3>
                        <p className="text-gray-400 mb-4">Create and manage movie schedules</p>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
                            Manage Schedules
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}