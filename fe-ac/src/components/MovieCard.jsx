import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Play } from 'lucide-react';

export default function MovieCard({ film, isComingSoon = false }) {
    return (
        <div className="group relative bg-gray-800 rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transition-all duration-300 transform hover:shadow-red-500/20">
            {/* Poster */}
            <div className="relative h-80 overflow-hidden">
                <img 
                    src={film.poster} 
                    alt={film.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                        <Play className="w-16 h-16 text-white mb-4 mx-auto animate-pulse" />
                        <p className="text-white font-semibold">Lihat Trailer</p>
                    </div>
                </div>

                {/* Rating badge */}
                {!isComingSoon && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded-full flex items-center gap-1 text-sm font-bold">
                        <Star className="w-4 h-4 fill-current" />
                        8.5
                    </div>
                )}

                {/* Coming Soon badge */}
                {isComingSoon && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        COMING SOON
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors">
                    {film.title}
                </h3>
                
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                    <span className="bg-gray-700 px-2 py-1 rounded">{film.genre}</span>
                    {film.duration && (
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {film.duration} min
                        </div>
                    )}
                </div>

                {!isComingSoon ? (
                    <Link
                        to={`/movies/${film.id}`}
                        className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Pesan Tiket
                    </Link>
                ) : (
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 py-3 rounded-xl font-semibold transition-all duration-300">
                        Segera Hadir
                    </button>
                )}
            </div>
        </div>
    );
}