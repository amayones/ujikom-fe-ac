import React, { useState } from 'react';
import { Armchair, Save } from 'lucide-react';

export default function ManageSeats() {
    const [selectedStudio, setSelectedStudio] = useState('1');
    const [seats, setSeats] = useState([
        { id: 1, code: 'A1', status: 'available' },
        { id: 2, code: 'A2', status: 'maintenance' },
        { id: 3, code: 'A3', status: 'available' },
        { id: 4, code: 'B1', status: 'available' },
        { id: 5, code: 'B2', status: 'available' },
        { id: 6, code: 'B3', status: 'broken' }
    ]);

    const studios = [
        { id: '1', name: 'Studio 1' },
        { id: '2', name: 'Studio 2' },
        { id: '3', name: 'Studio 3' }
    ];

    const statusOptions = [
        { value: 'available', label: 'Available', color: 'bg-green-500' },
        { value: 'maintenance', label: 'Maintenance', color: 'bg-yellow-500' },
        { value: 'broken', label: 'Broken', color: 'bg-red-500' }
    ];

    const handleStatusChange = (seatId, newStatus) => {
        setSeats(seats.map(seat => 
            seat.id === seatId ? { ...seat, status: newStatus } : seat
        ));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Kelola Status Kursi</h1>
                
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Pilih Studio</label>
                    <select 
                        value={selectedStudio}
                        onChange={(e) => setSelectedStudio(e.target.value)}
                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2"
                    >
                        {studios.map(studio => (
                            <option key={studio.id} value={studio.id}>{studio.name}</option>
                        ))}
                    </select>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="grid grid-cols-6 md:grid-cols-10 gap-4 mb-6">
                        {seats.map((seat) => (
                            <div key={seat.id} className="text-center">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${
                                    seat.status === 'available' ? 'bg-green-500' :
                                    seat.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}>
                                    <Armchair className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-xs">{seat.code}</p>
                                <select
                                    value={seat.status}
                                    onChange={(e) => handleStatusChange(seat.id, e.target.value)}
                                    className="mt-1 text-xs bg-gray-700 border border-gray-600 rounded px-1 py-1"
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                            {statusOptions.map(option => (
                                <div key={option.value} className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded ${option.color}`}></div>
                                    <span className="text-sm">{option.label}</span>
                                </div>
                            ))}
                        </div>
                        
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}