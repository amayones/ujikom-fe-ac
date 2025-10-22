import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Ticket, Film, Star, Clock, Users } from "lucide-react";
import useFilmStore from "../../store/filmStore";

export default function NowPlaying() {
    const { fetchNowPlayingFilms, films, loading } = useFilmStore();

    useEffect(() => {
        fetchNowPlayingFilms();
    }, [fetchNowPlayingFilms]);

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
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(220,38,127,0.4),transparent_70%)]" />
                <div className="relative z-10 text-center py-20 px-6">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-400/30 mb-6">
                        <Ticket className="text-red-400" size={24} />
                        <span className="text-red-300 font-semibold">NOW PLAYING</span>
                    </div>
                    <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                        Movies in Theaters
                    </h1>
                    <p className="text-xl text-red-200 max-w-2xl mx-auto">
                        Discover the hottest movies currently showing in our premium theaters
                    </p>
                </div>
            </div>

            {/* Movies Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {films.map((movie, index) => (
                        <div key={movie.id} className="group relative bg-red-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-red-700/50 hover:border-red-500 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-lg">
                            {/* Movie Poster */}
                            <div className="relative overflow-hidden">
                                <img 
                                    src={movie.poster} 
                                    alt={movie.title} 
                                    className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                
                                {/* Movie Number Badge */}
                                <div className="absolute top-4 left-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {index + 1}
                                    </div>
                                </div>
                                
                                {/* Status Badge */}
                                <div className="absolute top-4 right-4">
                                    <div className="px-3 py-1 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-red-400/50">
                                        <Star className="w-3 h-3" />
                                        HOT
                                    </div>
                                </div>
                            </div>
                            
                            {/* Movie Info */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors">
                                    {movie.title}
                                </h3>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-rose-400 rounded-full" />
                                        <span className="text-red-200">Genre: {movie.genre}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                                        <span className="text-red-200">Duration: {movie.duration} min</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <Link
                                        to={`/movies/${movie.id}`}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                                    >
                                        <Film className="w-4 h-4" />
                                        Details
                                    </Link>
                                    <Link
                                        to={`/booking/${movie.id}`}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                                    >
                                        <Ticket className="w-4 h-4" />
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Empty State */}
                {films.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Film className="w-8 h-8 text-red-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-red-300 mb-2">No Movies Available</h3>
                        <p className="text-red-400">Check back later for new releases!</p>
                    </div>
                )}
            </div>
        </div>
    );
}