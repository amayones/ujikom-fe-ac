import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import useFilmStore from "../../store/filmStore";

export default function ComingSoon() {
    const { fetchComingSoonFilms, films, loading } = useFilmStore();

    useEffect(() => {
        fetchComingSoonFilms();
    }, [fetchComingSoonFilms]);

    if (loading) {
        return (
            <div className="bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            {/* Header */}
            <div className="flex items-center gap-3 p-5 border-b border-gray-700">
                <Clock className="text-red-500" size={22} />
                <h1 className="text-xl font-bold text-red-500">Coming Soon</h1>
            </div>

            {/* List */}
            <div className="p-5 space-y-6">
                {films.map((film) => (
                    <div key={film.id} className="flex items-center bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-700 hover:border-red-500 transition p-4">
                        <div className="w-24 h-32 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                            {film.poster ? (
                                <img src={film.poster} alt={film.title} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                                <span className="text-4xl">🎞️</span>
                            )}
                        </div>
                        <div className="flex-1 ml-4">
                            <h3 className="text-lg font-semibold">{film.title}</h3>
                            <p className="text-sm text-gray-400 mb-1">Genre: {film.genre}</p>
                            <p className="text-sm text-gray-400 mb-1">Durasi: {film.duration} min</p>
                            <p className="text-sm text-gray-400 mb-2">Rilis: {new Date(film.release_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

                            <div className="flex items-center space-x-2 text-sm mb-3">
                                <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded">🔥 Hype</span>
                                <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded">Trailer</span>
                            </div>

                            <div className="flex space-x-3">
                                <Link
                                    to={`/movies/${film.id}`}
                                    className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition"
                                >
                                    Detail
                                </Link>
                                <button
                                    disabled
                                    className="px-4 py-2 bg-gray-600 text-white text-sm rounded-lg cursor-not-allowed"
                                >
                                    Belum Tersedia
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
