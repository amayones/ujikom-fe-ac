import React, { useState, useEffect } from "react";
import { Film, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await api.get('/films');
            setMovies(response.data.data || []);
        } catch (error) {
            console.error('Failed to fetch movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const nowPlayingFilms = movies.filter(movie => movie.status === 'Now Showing');
    const comingSoonFilms = movies.filter(movie => movie.status === 'Coming Soon');

    if (loading) {
        return (
            <div className="bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="relative bg-gray-900 text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-gray-900"></div>
            
            {/* Hero Section */}
            <section className="relative w-full h-screen flex items-center justify-center z-10">
                <div className="text-center z-10 px-6">
                    <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                        Absolute Cinema
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Rasakan pengalaman menonton yang tak terlupakan dengan teknologi terdepan dan kenyamanan maksimal
                    </p>
                    <Link
                        to="/now-playing"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Jelajahi Film <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>



            {/* Now Showing - Enhanced */}
            <section className="relative w-full py-20 px-6 bg-gray-900 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                            <Film className="w-10 h-10 text-red-500" /> 
                            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                                Sedang Tayang
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg">Film-film terbaru yang wajib kamu tonton</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {nowPlayingFilms.map((movie) => (
                            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
                                <img 
                                    src={movie.poster} 
                                    alt={movie.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-white mb-2">{movie.title}</h3>
                                    <p className="text-gray-400 mb-2">{movie.genre}</p>
                                    <p className="text-gray-400 mb-4">{movie.duration} min</p>
                                    <Link 
                                        to={`/movies/${movie.id}`}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center">
                        <Link
                            to="/now-playing"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Lihat Semua Film <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Coming Soon - Enhanced */}
            <section className="relative w-full py-20 px-6 bg-gradient-to-b from-gray-800 to-gray-900 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                            <Calendar className="w-10 h-10 text-yellow-400" /> 
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                Segera Tayang
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg">Siap-siap untuk petualangan sinema yang mendebarkan</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {comingSoonFilms.map((movie) => (
                            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
                                <img 
                                    src={movie.poster} 
                                    alt={movie.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-white mb-2">{movie.title}</h3>
                                    <p className="text-gray-400 mb-2">{movie.genre}</p>
                                    <p className="text-gray-400">{movie.duration}</p>
                                    <span className="inline-block mt-2 px-3 py-1 bg-yellow-600 text-white text-sm rounded">
                                        Coming Soon
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center">
                        <Link
                            to="/coming-soon"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                            Lihat Semua <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Enhanced Call To Action */}
            <section className="relative w-full py-24 px-6 bg-gradient-to-br from-red-900 via-red-700 to-red-500 text-center overflow-hidden z-10">
                <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full bg-repeat" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
                    }} />
                </div>
                
                <div className="relative z-10 max-w-4xl mx-auto animate-slide-up">
                    <h2 className="text-5xl font-bold mb-6 text-white">
                        Siap untuk Pengalaman 
                        <span className="block text-yellow-300">Sinema Terbaik?</span>
                    </h2>
                    <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Bergabunglah dengan jutaan penonton yang telah merasakan keajaiban Absolute Cinema. 
                        Pesan tiketmu sekarang dan rasakan perbedaannya!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button className="bg-white text-red-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                            Mulai Booking Sekarang
                        </button>
                        <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-700 transition-all duration-300 transform hover:scale-105">
                            Pelajari Lebih Lanjut
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
