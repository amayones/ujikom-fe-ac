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
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-rose-900 text-white">
            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(244,114,182,0.3),transparent_70%)]" />
                <div className="relative z-10 text-center py-16 px-6">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-rose-700/30 backdrop-blur-sm rounded-full border border-rose-600/50 mb-6">
                        <Ticket className="text-rose-400" size={24} />
                        <span className="text-rose-300 font-semibold">BOOKING HISTORY</span>
                    </div>
                    <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                        Your Cinema Journey
                    </h1>
                    <p className="text-xl text-rose-300 max-w-2xl mx-auto">
                        Track all your movie experiences and ticket history
                    </p>
                </div>
            </div>

            {/* History List */}
            <div className="max-w-6xl mx-auto px-6 pb-20">
                {orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map((item, index) => (
                            <div
                                key={item.id}
                                className="group bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 hover:border-rose-600 transition-all duration-500 transform hover:scale-105 shadow-lg"
                            >
                                <div className="flex flex-col lg:flex-row gap-6 items-start">
                                    {/* Ticket Icon & Number */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                                <Ticket size={28} className="text-white" />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                {index + 1}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Movie Info */}
                                    <div className="flex-1 space-y-4">
                                        <h2 className="text-2xl font-bold text-white group-hover:text-rose-400 transition-colors">
                                            {item.movie_title}
                                        </h2>
                                        
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <div className="w-3 h-3 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full" />
                                                    <Calendar size={16} />
                                                    <span>{item.schedule_date} at {item.schedule_time}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full" />
                                                    <MapPin size={16} />
                                                    <span>Absolute Cinema</span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
                                                    <span>Seats: {Array.isArray(item.seats) ? item.seats.join(', ') : item.seats}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" />
                                                    <span className="font-semibold">Total: Rp {item.total_amount?.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status & Actions */}
                                    <div className="flex flex-col items-center lg:items-end gap-4">
                                        <div className={`px-4 py-2 rounded-full text-sm font-bold border ${
                                            item.status === "Used"
                                                ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-400/30"
                                                : item.status === "Confirmed"
                                                ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-400/30"
                                                : "bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border-gray-400/30"
                                        }`}>
                                            {item.status === "Used" ? (
                                                <><Ticket className="w-3 h-3" /> Used</>
                                            ) : item.status === "Confirmed" ? (
                                                <><Calendar className="w-3 h-3" /> Confirmed</>
                                            ) : (
                                                <><Clock className="w-3 h-3" /> Pending</>
                                            )}
                                        </div>

                                        <button className="group/btn flex items-center gap-2 bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-800 hover:to-rose-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105">
                                            <Eye size={16} className="group-hover/btn:rotate-12 transition-transform" />
                                            <Ticket className="w-4 h-4" />
                                            View Ticket
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="relative inline-block mb-8">
                            <div className="w-32 h-32 bg-gradient-to-r from-rose-700/30 to-pink-700/30 rounded-full flex items-center justify-center border border-rose-600/50">
                                <Clock size={48} className="text-rose-400" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center">
                                <Clock className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-rose-400 mb-4">No History Yet</h3>
                        <p className="text-gray-300 text-lg mb-2">Your cinema journey starts here!</p>
                        <p className="text-gray-400">
                            Book your first movie ticket to see your history
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
