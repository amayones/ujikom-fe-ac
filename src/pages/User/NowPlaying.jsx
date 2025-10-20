import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Ticket } from "lucide-react";
import api from "../../api";

export default function NowPlaying() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFilms();
    }, []);

    const fetchFilms = async () => {
        try {
            const response = await api.get('/films');
            const allFilms = response.data.data || [];
            setFilms(allFilms.filter(f => f.status === 'Now Showing'));
        } catch (error) {
            console.error('Failed to fetch films:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="flex items-center gap-3 p-5 border-b border-gray-700">
                <Ticket className="text-red-500" size={22} />
                <h1 className="text-xl font-bold text-red-500">Now Playing</h1>
            </div>

            <div className="p-5 space-y-6">
                {films.map((movie) => (
                    <div key={movie.id} className="flex items-center bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-700 hover:border-red-500 transition p-4">
                        <div className="w-24 h-32 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="flex-1 ml-4">
                            <h3 className="text-lg font-semibold">{movie.title}</h3>
                            <p className="text-sm text-gray-400 mb-1">Genre: {movie.genre}</p>
                            <p className="text-sm text-gray-400 mb-2">Durasi: {movie.duration} min</p>

                            <div className="flex space-x-3">
                                <Link
                                    to={`/movies/${movie.id}`}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                                >
                                    Detail
                                </Link>
                                <Link
                                    to={`/booking/${movie.id}`}
                                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                                >
                                    Pesan Tiket
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}