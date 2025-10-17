import React from "react";
import { Film, Calendar, ArrowRight, Zap, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
    const movies = [
        { id: 1, title: "Spider-Man: No Way Home", genre: "Action, Adventure", duration: "148 min", poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Spider-Man", status: "now_playing" },
        { id: 2, title: "The Batman", genre: "Action, Crime", duration: "176 min", poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Batman", status: "now_playing" },
        { id: 3, title: "Doctor Strange 2", genre: "Action, Fantasy", duration: "126 min", poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Dr+Strange", status: "coming_soon" }
    ];
    const nowPlayingFilms = movies.filter(movie => movie.status === 'now_playing');
    const comingSoonFilms = movies.filter(movie => movie.status === 'coming_soon');

    return (
        <div className="relative bg-gray-900 text-white min-h-screen overflow-hidden">
            {/* Hero Section */}
            <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-black to-gray-900">
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

            {/* Enhanced Features Section */}
            <section className="relative w-full py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 animate-slide-up">
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                            Mengapa Memilih Absolute Cinema?
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Pengalaman menonton yang tak terlupakan dengan teknologi terdepan
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Film className="w-12 h-12 text-red-500" />, title: "4K Dolby Vision", desc: "Kualitas visual terbaik dengan teknologi HDR terdepan", color: "red" },
                            { icon: <Zap className="w-12 h-12 text-yellow-400" />, title: "Dolby Atmos", desc: "Sistem audio surround 360° yang memukau", color: "yellow" },
                            { icon: <Shield className="w-12 h-12 text-green-500" />, title: "Booking Aman", desc: "Sistem pembayaran terpercaya dan mudah", color: "green" },
                            { icon: <Heart className="w-12 h-12 text-pink-500" />, title: "Kursi Premium", desc: "Kenyamanan maksimal dengan kursi recliner", color: "pink" },
                        ].map((feature, i) => (
                            <div 
                                key={i} 
                                className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-center hover:scale-105 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 animate-fade-scale"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className={`inline-flex p-4 rounded-2xl bg-${feature.color}-500/10 mb-6 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Now Showing - Enhanced */}
            <section className="relative w-full py-20 px-6 bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 animate-slide-up">
                        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                            <Film className="w-10 h-10 text-red-500" /> 
                            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                                Sedang Tayang
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg">Film-film terbaru yang wajib kamu tonton</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {nowPlayingFilms.map((movie, index) => (
                            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
                                <img 
                                    src={movie.poster} 
                                    alt={movie.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-white mb-2">{movie.title}</h3>
                                    <p className="text-gray-400 mb-2">{movie.genre}</p>
                                    <p className="text-gray-400 mb-4">{movie.duration}</p>
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
            <section className="relative w-full py-20 px-6 bg-gradient-to-b from-gray-800 to-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 animate-slide-up">
                        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                            <Calendar className="w-10 h-10 text-yellow-400" /> 
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                Segera Tayang
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg">Siap-siap untuk petualangan sinema yang mendebarkan</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {comingSoonFilms.map((movie, index) => (
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
            <section className="relative w-full py-24 px-6 bg-gradient-to-br from-red-900 via-red-700 to-red-500 text-center overflow-hidden">
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
