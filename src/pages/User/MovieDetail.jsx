import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { filmService } from '../../services';
import { Calendar, Clock, Star } from 'lucide-react';

export default function MovieDetail() {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFilmDetail = async () => {
            try {
                const data = await filmService.getFilmDetail(id);
                setFilm(data);
            } catch (err) {
                setError('Failed to load film details');
            } finally {
                setLoading(false);
            }
        };

        fetchFilmDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
        );
    }

    if (error || !film) {
        return (
            <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error || 'Film not found'}</p>
                    <Link to="/play-now" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                        Back to Films
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Poster */}
                    <div className="md:col-span-1">
                        <div className="bg-gray-700 rounded-lg h-96 flex items-center justify-center">
                            {film.poster ? (
                                <img src={film.poster} alt={film.title || film.judul} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                                <span className="text-6xl">🎬</span>
                            )}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2">
                        <h1 className="text-3xl font-bold mb-4">{film.title || film.judul}</h1>
                        
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                                <Star className="text-yellow-400 w-5 h-5" />
                                <span>{film.rating || 4.0}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="text-gray-400 w-5 h-5" />
                                <span>{film.duration || film.durasi} menit</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Genre</h3>
                            <p className="text-gray-300">{film.genre}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Sinopsis</h3>
                            <p className="text-gray-300 leading-relaxed">{film.description || film.sinopsis || 'No synopsis available'}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Sutradara</h3>
                            <p className="text-gray-300">{film.director || film.sutradara || 'Unknown'}</p>
                        </div>

                        <Link
                            to={`/booking/${film.id}`}
                            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                        >
                            <Calendar className="w-5 h-5" />
                            Book Tickets
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}