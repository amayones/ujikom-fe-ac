import React from 'react';
import { Film, Users, Calendar, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SimpleDashboard() {
    const quickActions = [
        { 
            title: 'Manage Movies', 
            description: 'Add, edit, or remove movies',
            icon: Film, 
            color: 'from-blue-500 to-blue-600',
            link: '/admin/movies'
        },
        { 
            title: 'Manage Customers', 
            description: 'View and manage customer accounts',
            icon: Users, 
            color: 'from-green-500 to-green-600',
            link: '/admin/customers'
        },
        { 
            title: 'Manage Schedules', 
            description: 'Set up movie showtimes',
            icon: Calendar, 
            color: 'from-purple-500 to-purple-600',
            link: '/admin/schedules'
        },
        { 
            title: 'System Settings', 
            description: 'Configure cinema settings',
            icon: Settings, 
            color: 'from-red-500 to-red-600',
            link: '/admin/settings'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
                        Admin Panel
                    </h1>
                    <p className="text-gray-400 text-lg">Manage your cinema operations</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {quickActions.map((action, index) => (
                        <Link 
                            key={index}
                            to={action.link}
                            className={`bg-gradient-to-r ${action.color} rounded-xl p-8 hover:scale-105 transition-all duration-300 group block`}
                        >
                            <div className="flex items-center gap-6">
                                <div className="bg-white/20 p-4 rounded-lg group-hover:bg-white/30 transition-colors">
                                    <action.icon className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{action.title}</h3>
                                    <p className="text-white/80">{action.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-400">18</p>
                            <p className="text-gray-400 text-sm">Movies</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-400">1,234</p>
                            <p className="text-gray-400 text-sm">Customers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-purple-400">45</p>
                            <p className="text-gray-400 text-sm">Schedules</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-red-400">8</p>
                            <p className="text-gray-400 text-sm">Staff</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}