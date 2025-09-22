import React from "react";
import { Link } from "react-router-dom";
import { Ticket } from "lucide-react";

const films = [
    { id: 1, title: "Film Now Playing 1", genre: "Action, Drama", duration: "120 menit", rating: 4.2 },
    { id: 2, title: "Film Now Playing 2", genre: "Comedy, Romance", duration: "110 menit", rating: 4.0 },
    { id: 3, title: "Film Now Playing 3", genre: "Horror, Thriller", duration: "100 menit", rating: 3.8 },
];

export default function NowPlaying() {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            {/* Header */}
            <div className="flex items-center gap-3 p-5 border-b border-gray-700">
                <Ticket className="text-red-500" size={22} />
                <h1 className="text-xl font-bold text-red-500">Now Playing</h1>
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
                            <p className="text-sm text-gray-400 mb-2">Durasi: {film.duration}</p>

                            <div className="flex items-center space-x-1 text-yellow-400 text-sm mb-3">
                                {"⭐".repeat(Math.floor(film.rating))} ({film.rating})
                            </div>

                            <div className="flex space-x-3">
                                <Link
                                    to={`/movies/${film.id}`}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                                >
                                    Detail
                                </Link>
                                <Link
                                    to={`/tickets/order/${film.id}`}
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
