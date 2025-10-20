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
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Poster */}
                    <div className="md:col-span-1">
                        <div className="bg-gray-700 rounded-lg h-96 flex items-center justify-center">
                            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover rounded-lg" />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2">
                        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                        
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                                <Star className="text-yellow-400 w-5 h-5" />
                                <span>{movie.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="text-gray-400 w-5 h-5" />
                                <span>{movie.duration}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Genre</h3>
                            <p className="text-gray-300">{movie.genre}</p>
                        </div>



                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-gray-300 leading-relaxed">{movie.description}</p>
                        </div>



                        <Link
                            to={`/booking/${movie.id}`}
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