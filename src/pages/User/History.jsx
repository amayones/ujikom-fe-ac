import React, { useEffect } from "react";
import { Ticket, Calendar, MapPin, Eye, Clock } from "lucide-react";
import useOrderStore from "../../store/orderStore";

export default function History() {
    const { fetchOrders, orders, loading } = useOrderStore();

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    if (loading) {
        return (
            <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            {/* Header */}
            <div className="flex items-center gap-3 p-5 border-b border-gray-700">
                <Ticket className="text-red-500" size={22} />
                <h1 className="text-xl font-bold text-red-500">History</h1>
            </div>

            {/* History List */}
            <div className="p-5 space-y-6">
                {orders.length > 0 ? (
                    orders.map((item) => (
                        <div
                            key={item.id}
                            className="bg-gray-800 rounded-xl p-5 shadow-md border border-gray-700 hover:border-red-500 transition-all flex flex-col md:flex-row justify-between items-start gap-4"
                        >
                            {/* Icon */}
                            <div className="flex items-center justify-center w-14 h-14 bg-red-600/20 rounded-full flex-shrink-0">
                                <Ticket size={22} className="text-red-500" />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-white">{item.movie_title}</h2>
                                <div className="text-sm text-gray-300 mt-1 space-y-1">
                                    <p className="flex items-center gap-2">
                                        <Calendar size={14} /> {item.schedule_date} at {item.schedule_time}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <MapPin size={14} /> Absolute Cinema
                                    </p>
                                    <p>Seats: {Array.isArray(item.seats) ? item.seats.join(', ') : item.seats}</p>
                                    <p>Total: Rp {item.total_amount?.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Status + Action */}
                            <div className="flex flex-col md:items-end gap-3 mt-4 md:mt-0">
                                <span
                                    className={`px-3 py-1 text-xs font-medium rounded-md ${item.status === "Used"
                                            ? "bg-green-600/20 text-green-400"
                                            : "bg-gray-600/30 text-gray-400"
                                        }`}
                                >
                                    {item.status}
                                </span>

                                <button className="flex items-center gap-2 text-sm bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded transition">
                                    <Eye size={14} /> View Ticket
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center mt-20 text-center">
                        <Clock size={64} className="text-gray-600 mb-4" />
                        <p className="text-gray-400 text-lg">No history found.</p>
                        <p className="text-gray-500 text-sm mt-1">
                            Your ticket history will appear here once you book.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
