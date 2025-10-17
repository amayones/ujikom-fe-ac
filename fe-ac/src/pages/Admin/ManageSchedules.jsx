import React, { useState } from 'react';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';

export default function ManageSchedules() {
    const [schedules] = useState([
        { id: 1, movie: 'Spider-Man: No Way Home', studio: 'Studio 1', date: '2024-01-20', time: '10:00', price: 50000 },
        { id: 2, movie: 'The Batman', studio: 'Studio 2', date: '2024-01-20', time: '13:00', price: 55000 },
        { id: 3, movie: 'Doctor Strange 2', studio: 'Studio 1', date: '2024-01-20', time: '16:00', price: 60000 }
    ]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Schedules</h1>
                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                        <Plus className="w-4 h-4" />
                        Add Schedule
                    </button>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left">Movie</th>
                                <th className="px-6 py-3 text-left">Studio</th>
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="px-6 py-3 text-left">Time</th>
                                <th className="px-6 py-3 text-left">Price</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map(schedule => (
                                <tr key={schedule.id} className="border-b border-gray-700">
                                    <td className="px-6 py-4">{schedule.movie}</td>
                                    <td className="px-6 py-4">{schedule.studio}</td>
                                    <td className="px-6 py-4">{schedule.date}</td>
                                    <td className="px-6 py-4">{schedule.time}</td>
                                    <td className="px-6 py-4">Rp {schedule.price.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                                                <Edit className="w-3 h-3" />
                                                Edit
                                            </button>
                                            <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
                                                <Trash2 className="w-3 h-3" />
                                                Delete
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
    );
}