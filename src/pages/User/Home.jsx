import React, { useEffect, useState } from "react";
import { Film, Calendar, ArrowRight, Play, Pause, Volume2, VolumeX, Star, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import useFilmStore from "../../store/filmStore";
import useBookingStore from "../../store/bookingStore";

export default function Home() {
    const { fetchFilms, films, loading } = useFilmStore();
    const { isPlaying, isMuted, setIsPlaying, setIsMuted } = useBookingStore();
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        fetchFilms();
    }, [fetchFilms]);

    const nowPlayingFilms = films.filter(movie => movie.status === 'now_playing');
    const comingSoonFilms = films.filter(movie => movie.status === 'coming_soon');
    const trendingFilms = films.slice(0, 6);

    // Auto slide trailer every 5 seconds
    useEffect(() => {
        if (nowPlayingFilms.length > 0 && isAutoPlaying) {
            const interval = setInterval(() => {
                setCurrentMovieIndex((prev) => (prev + 1) % nowPlayingFilms.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [nowPlayingFilms.length, isAutoPlaying]);

    const currentMovie = nowPlayingFilms[currentMovieIndex] || nowPlayingFilms[0];

    if (loading) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="relative bg-gradient-to-br from-black via-gray-900 to-rose-900 text-white overflow-hidden">
            {/* Featured Movie Trailer Section */}
            {currentMovie && (
                <section className="relative w-full h-screen overflow-hidden">
                    {/* Background Video/Image */}
                    <div className="absolute inset-0">
                        <img 
                            src={currentMovie.poster} 
                            alt={currentMovie.title}
                            className="w-full h-full object-cover scale-110 blur-sm transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-rose-900/50" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center">
                        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                            {/* Movie Info */}
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-700/30 backdrop-blur-sm rounded-full border border-rose-600/50">
                                    <Film className="w-4 h-4 text-rose-400" />
                                    <span className="text-sm text-rose-300 font-medium">Featured Movie</span>
                                </div>
                                
                                <h1 className="text-6xl lg:text-7xl font-black leading-tight text-white transition-all duration-500">
                                    {currentMovie.title}
                                </h1>
                                
                                <div className="flex items-center gap-6 text-white/80">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-yellow-400" />
                                        <span>8.5</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        <span>{currentMovie.duration} min</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        <span>{currentMovie.genre}</span>
                                    </div>
                                </div>
                                
                                <p className="text-lg text-white/80 leading-relaxed max-w-xl transition-all duration-500">
                                    {currentMovie.description || "Experience the ultimate cinematic adventure with stunning visuals, compelling storytelling, and unforgettable performances that will keep you on the edge of your seat."}
                                </p>
                                
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => {
                                            setIsPlaying(!isPlaying);
                                            setIsAutoPlaying(!isPlaying);
                                        }}
                                        className="flex items-center justify-center gap-3 bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-800 hover:to-rose-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-rose-500/25"
                                    >
                                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                                        {isPlaying ? 'Pause Trailer' : 'Watch Trailer'}
                                    </button>
                                    
                                    <Link
                                        to={`/booking/${currentMovie.id}`}
                                        className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 border border-white/30 shadow-lg"
                                    >
                                        <Calendar className="w-6 h-6" />
                                        Book Tickets
                                    </Link>
                                </div>
                            </div>
                            
                            {/* Trailer Player with Movie Indicators */}
                            <div className="relative">
                                <div className="aspect-video bg-black rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                                    {isPlaying ? (
                                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                            <div className="text-center">
                                                <Play className="w-16 h-16 text-white mb-4 mx-auto animate-pulse" />
                                                <p className="text-white text-xl font-semibold">{currentMovie.title}</p>
                                                <p className="text-gray-400 text-sm mt-2">Trailer Playing...</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative w-full h-full">
                                            <img 
                                                src={currentMovie.poster} 
                                                alt={currentMovie.title}
                                                className="w-full h-full object-cover transition-all duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <button 
                                                    onClick={() => {
                                                        setIsPlaying(true);
                                                        setIsAutoPlaying(false);
                                                    }}
                                                    className="w-20 h-20 bg-rose-600 hover:bg-rose-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
                                                >
                                                    <Play className="w-8 h-8 text-white ml-1" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Movie Indicators */}
                                <div className="flex justify-center gap-2 mt-4">
                                    {nowPlayingFilms.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setCurrentMovieIndex(index);
                                                setIsAutoPlaying(false);
                                            }}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                index === currentMovieIndex 
                                                    ? 'bg-rose-500 scale-125' 
                                                    : 'bg-white/30 hover:bg-white/50'
                                            }`}
                                        />
                                    ))}
                                </div>
                                
                                {/* Audio Control */}
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <button 
                                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            isAutoPlaying ? 'bg-rose-600 hover:bg-rose-700' : 'bg-black/50 hover:bg-black/70'
                                        }`}
                                    >
                                        <span className="text-white text-xs font-bold">{isAutoPlaying ? '⏸' : '▶'}</span>
                                    </button>
                                    <button 
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300"
                                    >
                                        {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Trending Movies Carousel */}
            <section className="relative w-full py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-4xl font-black text-white mb-2">Trending This Week</h2>
                            <p className="text-gray-300 text-lg">Most popular movies in theaters</p>
                        </div>
                        <Link
                            to="/now-playing"
                            className="group flex items-center gap-2 text-rose-400 hover:text-rose-300 font-semibold transition-colors"
                        >
                            View All
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {trendingFilms.map((movie, index) => (
                            <Link 
                                key={movie.id}
                                to={`/movies/${movie.id}`}
                                className="group relative block"
                            >
                                <div className="relative overflow-hidden rounded-2xl bg-gray-800/80 backdrop-blur-sm shadow-lg border border-gray-700">
                                    <img 
                                        src={movie.poster} 
                                        alt={movie.title}
                                        className="w-full aspect-[3/4] object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    {/* Rank Badge */}
                                    <div className="absolute top-3 left-3 w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">{index + 1}</span>
                                    </div>
                                    
                                    {/* Play Button */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center">
                                            <Play className="w-6 h-6 text-white ml-0.5" />
                                        </div>
                                    </div>
                                    
                                    {/* Movie Info */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">{movie.title}</h3>
                                        <div className="flex items-center gap-2 text-xs text-white/80">
                                            <Clock className="w-3 h-3" />
                                            <span>{movie.duration}m</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Movie Categories */}
            <section className="relative w-full py-20 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* In Theaters */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-rose-700 rounded-2xl flex items-center justify-center">
                                    <Film className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">In Theaters</h3>
                                    <p className="text-gray-300">Available for booking now</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                {nowPlayingFilms.slice(0, 4).map((movie) => (
                                    <Link 
                                        key={movie.id}
                                        to={`/movies/${movie.id}`}
                                        className="group flex items-center gap-4 p-4 bg-gray-800/80 hover:bg-gray-700/80 rounded-2xl transition-colors backdrop-blur-sm shadow-lg border border-gray-700"
                                    >
                                        <img 
                                            src={movie.poster} 
                                            alt={movie.title}
                                            className="w-16 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-white font-semibold group-hover:text-rose-400 transition-colors">{movie.title}</h4>
                                            <div className="flex items-center gap-4 text-sm text-gray-300 mt-1">
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    {movie.genre}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {movie.duration}m
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-rose-400 transition-colors" />
                                    </Link>
                                ))}
                            </div>
                            
                            <Link
                                to="/now-playing"
                                className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-semibold transition-colors"
                            >
                                View All Movies
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        
                        {/* Coming Soon */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Coming Soon</h3>
                                    <p className="text-gray-300">Get ready for these releases</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                {comingSoonFilms.slice(0, 4).map((movie) => (
                                    <Link 
                                        key={movie.id}
                                        to={`/movies/${movie.id}`}
                                        className="group flex items-center gap-4 p-4 bg-gray-800/80 hover:bg-gray-700/80 rounded-2xl transition-colors backdrop-blur-sm shadow-lg border border-gray-700"
                                    >
                                        <img 
                                            src={movie.poster} 
                                            alt={movie.title}
                                            className="w-16 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-white font-semibold group-hover:text-rose-400 transition-colors">{movie.title}</h4>
                                            <div className="flex items-center gap-4 text-sm text-gray-300 mt-1">
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    {movie.genre}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {movie.duration}m
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-rose-400 transition-colors" />
                                    </Link>
                                ))}
                            </div>
                            
                            <Link
                                to="/coming-soon"
                                className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-semibold transition-colors"
                            >
                                View All Upcoming
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}