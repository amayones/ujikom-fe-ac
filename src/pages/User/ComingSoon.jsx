import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Calendar, Film } from "lucide-react";
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
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-rose-900 text-white">
            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(190,18,60,0.5),transparent_70%)]" />
                <div className="relative z-10 text-center py-20 px-6">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-rose-700/30 backdrop-blur-sm rounded-full border border-rose-600/50 mb-6">
                        <Clock className="text-rose-400" size={24} />
                        <span className="text-rose-300 font-semibold">COMING SOON</span>
                    </div>
                    <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-rose-400 to-rose-300 bg-clip-text text-transparent">
                        Upcoming Releases
                    </h1>
                    <p className="text-xl text-rose-200 max-w-2xl mx-auto">
                        Get ready for the most anticipated movies hitting theaters soon
                    </p>
                </div>
            </div>

            {/* Movies Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {films.map((film, index) => (
                        <div key={film.id} className="group relative bg-gray-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700 hover:border-rose-600 transition-all duration-500 transform hover:scale-105 shadow-lg">
                            <div className="flex flex-col md:flex-row">
                                {/* Movie Poster */}
                                <div className="relative md:w-48 h-64 md:h-auto overflow-hidden">
                                    {film.poster ? (
                                        <img 
                                            src={film.poster} 
                                            alt={film.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-rose-700 to-rose-600 flex items-center justify-center">
                                            <span className="text-6xl">🎞️</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                                    
                                    {/* Coming Soon Badge */}
                                    <div className="absolute top-4 left-4">
                                        <div className="px-3 py-1 bg-gradient-to-r from-rose-700 to-rose-600 text-white text-xs font-bold rounded-full animate-pulse">
                                            <Calendar className="w-3 h-3" />
                                            SOON
                                        </div>
                                    </div>
                                    
                                    {/* Index Badge */}
                                    <div className="absolute bottom-4 right-4">
                                        <div className="w-8 h-8 bg-rose-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {index + 1}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Movie Info */}
                                <div className="flex-1 p-6">
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors">
                                        {film.title}
                                    </h3>
                                    
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-gradient-to-r from-rose-400 to-rose-300 rounded-full" />
                                            <span className="text-gray-300">Genre: {film.genre}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                                            <span className="text-gray-300">Duration: {film.duration} min</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" />
                                            <span className="text-gray-300">
                                                Release: {new Date(film.release_date).toLocaleDateString('en-US', { 
                                                    day: 'numeric', 
                                                    month: 'long', 
                                                    year: 'numeric' 
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="px-3 py-1 bg-gradient-to-r from-rose-500/20 to-rose-400/20 text-rose-300 rounded-full text-sm font-medium border border-rose-400/30">
                                            🔥 Most Anticipated
                                        </span>
                                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-400/30">
                                            🎥 Trailer Available
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <Link
                                            to={`/movies/${film.id}`}
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-800 hover:to-rose-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-rose-500/25"
                                        >
                                            <Film className="w-4 h-4" />
                                            View Details
                                        </Link>
                                        <button
                                            disabled
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-800/50 text-gray-400 font-semibold rounded-xl cursor-not-allowed border border-gray-700"
                                        >
                                            <Clock className="w-4 h-4" />
                                            Not Available
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Empty State */}
                {films.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-rose-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-rose-300 mb-2">No Upcoming Movies</h3>
                        <p className="text-rose-400">Stay tuned for exciting new releases!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
