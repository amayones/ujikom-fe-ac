import React, { useState, useEffect } from 'react';
import { Monitor, Armchair } from 'lucide-react';
import useSeatStore from '../../store/seatStore';

export default function ManageSeats() {
    const { seats, loading, error, fetchSeats, updateSeat, clearError } = useSeatStore();
    const [selectedStudio, setSelectedStudio] = useState(1);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        fetchSeats(selectedStudio);
    }, [selectedStudio, fetchSeats]);

    useEffect(() => {
        if (error) {
            setNotification(error);
            setTimeout(() => {
                setNotification('');
                clearError();
            }, 3000);
        }
    }, [error, clearError]);

    const toggleSeatStatus = async (seat) => {
        const newStatus = seat.status === 'available' 
            ? 'occupied' 
            : seat.status === 'occupied' 
                ? 'maintenance' 
                : 'available';
        
        try {
            await updateSeat(seat.id, { status: newStatus });
            setNotification(`Seat ${seat.id} status updated`);
            setTimeout(() => setNotification(''), 2000);
        } catch {
            // Error handled by store
        }
    };

    const getSeatColor = (seat) => {
        if (seat.status === 'available') {
            return seat.type === 'vip' ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-green-600 hover:bg-green-500';
        } else if (seat.status === 'occupied') {
            return 'bg-red-600 hover:bg-red-500';
        } else {
            return 'bg-orange-600 hover:bg-orange-500';
        }
    };

    const groupedSeats = seats.reduce((acc, seat) => {
        if (!acc[seat.row]) acc[seat.row] = [];
        acc[seat.row].push(seat);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Manage Seats</h1>

                {/* Notification */}
                {notification && (
                    <div className="mb-4 p-3 bg-green-600 text-white rounded">
                        {notification}
                    </div>
                )}

                <div className="mb-6">
                    <select
                        value={selectedStudio}
                        onChange={(e) => setSelectedStudio(parseInt(e.target.value))}
                        className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600"
                    >
                        <option value={1}>Studio 1</option>
                        <option value={2}>Studio 2</option>
                        <option value={3}>Studio 3</option>
                    </select>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-8">
                        <div className="text-gray-400">Loading seats...</div>
                    </div>
                )}

                {!loading && (
                    <div className="bg-gray-800 rounded-lg p-6">
                        {/* Screen */}
                        <div className="flex justify-center mb-8">
                            <div className="flex items-center gap-2 bg-gray-700 px-6 py-3 rounded">
                                <Monitor className="w-5 h-5" />
                                <span>SCREEN</span>
                            </div>
                        </div>

                        {/* Seat Layout */}
                        <div className="space-y-4">
                            {Object.entries(groupedSeats).map(([row, rowSeats]) => (
                                <div key={row} className="flex items-center gap-2">
                                    <div className="w-8 text-center font-bold">{row}</div>
                                    <div className="flex gap-1">
                                        {rowSeats.map(seat => (
                                            <button
                                                key={seat.id}
                                                onClick={() => toggleSeatStatus(seat)}
                                                className={`w-8 h-8 rounded text-xs font-semibold transition-colors ${getSeatColor(seat)}`}
                                                title={`${seat.id} - ${seat.status} (${seat.type})`}
                                            >
                                                {seat.number}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="mt-8 flex justify-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-600 rounded"></div>
                                <span className="text-sm">Available Regular</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-yellow-600 rounded"></div>
                                <span className="text-sm">Available VIP</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-600 rounded"></div>
                                <span className="text-sm">Occupied</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-orange-600 rounded"></div>
                                <span className="text-sm">Maintenance</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}