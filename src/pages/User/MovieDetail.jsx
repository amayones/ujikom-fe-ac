import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Star } from 'lucide-react';
import useFilmStore from '../../store/filmStore';

export default function MovieDetail() {
    const { id } = useParams();
    const { fetchFilmById, currentFilm: movie, loading } = useFilmStore();

    useEffect(() => {
        fetchFilmById(id);
    }, [id, fetchFilmById]);

    if (loading) {
        return (
            <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">Movie not found</p>
                    <Link to="/now-playing" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                        Back to Movies
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-rose-900 text-white">
            {/* Hero Section with Backdrop */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src={movie.poster} 
                        alt={movie.title} 
                        className="w-full h-full object-cover opacity-20 blur-sm scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>
                
                <div className="relative z-10 container mx-auto px-6 py-20">
                    <div className="grid lg:grid-cols-5 gap-12 items-start">
                        {/* Movie Poster */}
                        <div className="lg:col-span-2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-4 border border-slate-700">
                                    <img 
                                        src={movie.poster} 
                                        alt={movie.title} 
                                        className="w-full h-[600px] object-cover rounded-2xl shadow-2xl" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Movie Details */}
                        <div className="lg:col-span-3 space-y-8">
                            {/* Title & Status */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                                        movie.status === 'now_playing' 
                                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-black'
                                            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-black'
                                    }`}>
                                        {movie.status === 'now_playing' ? '🎬 NOW PLAYING' : '🕰️ COMING SOON'}
                                    </div>
                                </div>
                                <h1 className="text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                                    {movie.title}
                                </h1>
                            </div>
                            
                            {/* Movie Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Star className="text-yellow-400 w-6 h-6" />
                                        <span className="text-rose-300 font-semibold">Rating</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white">{movie.rating || '8.5'}/10</p>
                                </div>
                                
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Clock className="text-purple-400 w-6 h-6" />
                                        <span className="text-pink-300 font-semibold">Duration</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white">{movie.duration} min</p>
                                </div>
                                
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 col-span-2 md:col-span-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full" />
                                        <span className="text-rose-300 font-semibold">Genre</span>
                                    </div>
                                    <p className="text-lg font-bold text-white">{movie.genre}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <h3 className="text-2xl font-bold mb-4 text-rose-300">📜 Synopsis</h3>
                                <p className="text-slate-300 leading-relaxed text-lg">
                                    {movie.description || 'An incredible cinematic experience awaits you. This movie promises to deliver outstanding entertainment with exceptional storytelling, brilliant performances, and stunning visuals that will keep you on the edge of your seat.'}
                                </p>
                            </div>

                            {/* Additional Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-rose-400/30">
                                    <h4 className="text-xl font-bold mb-3 text-rose-300">🎭 Director</h4>
                                    <p className="text-white font-semibold">{movie.director || 'Acclaimed Director'}</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-sm rounded-2xl p-6 border border-pink-400/30">
                                    <h4 className="text-xl font-bold mb-3 text-pink-300">🎆 Experience</h4>
                                    <p className="text-white font-semibold">Premium Cinema Quality</p>
                                </div>
                            </div>

                            {/* Action Button */}
                            {movie.status === 'now_playing' ? (
                                <Link
                                    to={`/booking/${movie.id}`}
                                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-rose-500/25"
                                >
                                    <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                    🎫 Book Tickets Now
                                </Link>
                            ) : (
                                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 px-10 py-5 rounded-2xl font-bold text-xl cursor-not-allowed opacity-60">
                                    <Clock className="w-6 h-6" />
                                    🔒 Coming Soon
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}