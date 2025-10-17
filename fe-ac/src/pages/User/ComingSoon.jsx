import React from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

const films = [
    { id: 1, title: "Film Coming Soon 1", genre: "Fantasy, Adventure", release: "15 Oktober 2025" },
    { id: 2, title: "Film Coming Soon 2", genre: "Sci-Fi, Action", release: "20 November 2025" },
    { id: 3, title: "Film Coming Soon 3", genre: "Drama, Biography", release: "5 Desember 2025" },
];

export default function ComingSoon() {
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
                            🎞️
                        </div>
                        <div className="flex-1 ml-4">
                            <h3 className="text-lg font-semibold">{film.title}</h3>
                            <p className="text-sm text-gray-400 mb-1">Genre: {film.genre}</p>
                            <p className="text-sm text-gray-400 mb-2">Rilis: {film.release}</p>

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
