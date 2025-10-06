import React, { useState, useEffect } from "react";
import { Film, Ticket, Popcorn, Star, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { filmService } from '../../services';

export default function Home() {
    const [nowPlayingFilms, setNowPlayingFilms] = useState([]);
    const [comingSoonFilms, setComingSoonFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const [nowPlaying, comingSoon] = await Promise.all([
                    filmService.getFilms('play_now'),
                    filmService.getFilms('coming_soon')
                ]);
                setNowPlayingFilms(nowPlaying.slice(0, 3));
                setComingSoonFilms(comingSoon.slice(0, 3));
            } catch (error) {
                console.error('Failed to fetch films:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilms();
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Hero Section */}
            <section
                className="relative w-full h-[400px] sm:h-[500px] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('https://picsum.photos/1200/500?random=1')" }}
            >
                <div className="bg-black bg-opacity-70 w-full h-full flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-red-600 tracking-wide drop-shadow-lg">
                        Absolute Cinema
                    </h1>
                    <p className="text-gray-300 mb-6 text-base sm:text-lg max-w-2xl leading-relaxed">
                        Nikmati pengalaman menonton terbaik dengan film-film terbaru, kualitas layar modern, dan suasana tak terlupakan.
                    </p>
                    <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold transition-all shadow-lg">
                        Book Now
                    </button>
                </div>
            </section>

            {/* Highlight Features */}
            <section className="w-full py-16 px-6 bg-gray-800">
                <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
                    <Star className="text-yellow-400 w-7 h-7" /> Mengapa Memilih Kami?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: <Film className="w-10 h-10 text-red-500" />, title: "Layar Lebar 4K", desc: "Nikmati kualitas visual terbaik dengan layar beresolusi tinggi." },
                        { icon: <Popcorn className="w-10 h-10 text-yellow-400" />, title: "Snack Premium", desc: "Popcorn gurih dan minuman segar untuk menemani menonton." },
                        { icon: <Ticket className="w-10 h-10 text-green-500" />, title: "Pesan Mudah", desc: "Booking tiket cepat dan mudah hanya dengan satu klik." },
                        { icon: <Star className="w-10 h-10 text-blue-500" />, title: "Pengalaman Premium", desc: "Kenyamanan kursi dan suasana bioskop terbaik." },
                    ].map((f, i) => (
                        <div key={i} className="bg-gray-900 rounded-xl shadow-md p-6 text-center hover:scale-105 transition-transform">
                            <div className="flex justify-center mb-4">{f.icon}</div>
                            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                            <p className="text-sm text-gray-400">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Now Showing */}
            <section className="w-full py-16 px-6">
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-2">
                    <Film className="w-7 h-7 text-red-500" /> Now Showing
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {loading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
                                <div className="h-56 bg-gray-700"></div>
                                <div className="p-5">
                                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-700 rounded mb-3"></div>
                                    <div className="h-8 bg-gray-700 rounded"></div>
                                </div>
                            </div>
                        ))
                    ) : nowPlayingFilms.length > 0 ? (
                        nowPlayingFilms.map((film) => (
                            <div key={film.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
                                <div className="h-56 bg-gray-700 flex items-center justify-center">
                                    {film.poster ? (
                                        <img src={film.poster} alt={film.title || film.judul} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-gray-400">🎬</span>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold mb-1">{film.title || film.judul}</h3>
                                    <p className="text-sm text-gray-400 mb-3">{film.genre} | {film.duration || film.durasi} min</p>
                                    <Link 
                                        to={`/movies/${film.id}`}
                                        className="block w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium text-sm text-center transition"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-12">
                            <p className="text-gray-400">No films available</p>
                        </div>
                    )}
                </div>
                {/* Tombol Lihat Semua */}
                <div className="mt-10 text-center">
                    <Link
                        to="/play-now"
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium shadow-md transition-all"
                    >
                        Lihat Semua <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* Coming Soon */}
            <section className="w-full py-16 px-6 bg-gray-800">
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-2">
                    <Calendar className="w-7 h-7 text-yellow-400" /> Coming Soon
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {loading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-900 rounded-xl shadow-md overflow-hidden animate-pulse">
                                <div className="h-48 bg-gray-600"></div>
                                <div className="p-5">
                                    <div className="h-4 bg-gray-600 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-600 rounded"></div>
                                </div>
                            </div>
                        ))
                    ) : comingSoonFilms.length > 0 ? (
                        comingSoonFilms.map((film) => (
                            <div key={film.id} className="bg-gray-900 rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform">
                                <div className="h-48 bg-gray-600 flex items-center justify-center">
                                    {film.poster ? (
                                        <img src={film.poster} alt={film.title || film.judul} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-gray-400">🎬</span>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold mb-1">{film.title || film.judul}</h3>
                                    <p className="text-sm text-gray-400">Rilis: {film.release_date || film.tanggal_rilis || 'TBA'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-12">
                            <p className="text-gray-400">No upcoming films</p>
                        </div>
                    )}
                </div>
                {/* Tombol Lihat Semua */}
                <div className="mt-10 text-center">
                    <Link
                        to="/coming-soon"
                        className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full font-medium shadow-md transition-all"
                    >
                        Lihat Semua <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* Call To Action */}
            <section className="w-full py-16 px-6 bg-gradient-to-r from-red-700 to-red-500 text-center">
                <h2 className="text-3xl font-bold mb-4">Siap Menonton di Absolute Cinema?</h2>
                <p className="text-gray-200 mb-6 max-w-xl mx-auto">
                    Jangan lewatkan film-film terbaru dengan pengalaman menonton terbaik. Pesan tiketmu sekarang dan nikmati hiburan tanpa batas.
                </p>
            </section>
        </div>
    );
}
