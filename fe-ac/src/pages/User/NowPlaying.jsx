import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Ticket } from "lucide-react";
import { filmService } from '../../services';

export default function NowPlaying() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const data = await filmService.getFilms('play_now');
                setFilms(data);
            } catch (err) {
                setError('Failed to load films');
            } finally {
                setLoading(false);
            }
        };

        fetchFilms();
    }, []);

    if (loading) {
        return (
            <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                    <p>Loading films...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button 
                        onClick={useCallback(() => window.location.reload(), [])}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            {/* Header */}
            <div className="flex items-center gap-3 p-5 border-b border-gray-700">
                <Ticket className="text-red-500" size={22} />
                <h1 className="text-xl font-bold text-red-500">Now Playing</h1>
            </div>

            {/* List */}
            <div className="p-5 space-y-6">
                {films.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400">No films currently playing</p>
                    </div>
                ) : (
                    films.map((film) => (
                        <div key={film.id} className="flex items-center bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-700 hover:border-red-500 transition p-4">
                            <div className="w-24 h-32 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                                {film.poster ? (
                                    <img src={film.poster} alt={film.title || film.judul} className="w-full h-full object-cover rounded-lg" />
                                ) : (
                                    '🎞️'
                                )}
                            </div>
                            <div className="flex-1 ml-4">
                                <h3 className="text-lg font-semibold">{film.title || film.judul}</h3>
                                <p className="text-sm text-gray-400 mb-1">Genre: {film.genre}</p>
                                <p className="text-sm text-gray-400 mb-2">Durasi: {film.duration || film.durasi} menit</p>

                                <div className="flex items-center space-x-1 text-yellow-400 text-sm mb-3">
                                    {"⭐".repeat(Math.floor(film.rating || 4))} ({film.rating || 4.0})
                                </div>

                                <div className="flex space-x-3">
                                    <Link
                                        to={`/movies/${film.id}`}
                                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Detail
                                    </Link>
                                    <Link
                                        to={`/booking/${film.id}`}
                                        className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                                    >
                                        Pesan Tiket
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
