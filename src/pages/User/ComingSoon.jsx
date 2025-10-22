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
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-rose-900 to-red-800 text-white">
            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(220,38,127,0.4),transparent_70%)]" />
                <div className="relative z-10 text-center py-20 px-6">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-400/30 mb-6">
                        <Clock className="text-red-400" size={24} />
                        <span className="text-red-300 font-semibold">COMING SOON</span>
                    </div>
                    <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                        Upcoming Releases
                    </h1>
                    <p className="text-xl text-red-200 max-w-2xl mx-auto">
                        Get ready for the most anticipated movies hitting theaters soon
                    </p>
                </div>
            </div>

            {/* Movies Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {films.map((film, index) => (
                        <div key={film.id} className="group relative bg-red-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-red-700/50 hover:border-red-500 transition-all duration-500 transform hover:scale-105 shadow-lg">
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
                                        <div className="w-full h-full bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center">
                                            <span className="text-6xl">🎞️</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                                    
                                    {/* Coming Soon Badge */}
                                    <div className="absolute top-4 left-4">
                                        <div className="px-3 py-1 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold rounded-full animate-pulse">
                                            <Calendar className="w-3 h-3" />
                                            SOON
                                        </div>
                                    </div>
                                    
                                    {/* Index Badge */}
                                    <div className="absolute bottom-4 right-4">
                                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
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
                                            <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-rose-400 rounded-full" />
                                            <span className="text-red-200">Genre: {film.genre}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                                            <span className="text-red-200">Duration: {film.duration} min</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" />
                                            <span className="text-red-200">
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
                                        <span className="px-3 py-1 bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-300 rounded-full text-sm font-medium border border-red-400/30">
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
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                                        >
                                            <Film className="w-4 h-4" />
                                            View Details
                                        </Link>
                                        <button
                                            disabled
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-900/50 text-red-400 font-semibold rounded-xl cursor-not-allowed border border-red-800"
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
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-red-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-red-300 mb-2">No Upcoming Movies</h3>
                        <p className="text-red-400">Stay tuned for exciting new releases!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
