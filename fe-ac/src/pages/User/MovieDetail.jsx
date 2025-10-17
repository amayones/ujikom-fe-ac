import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Star } from 'lucide-react';

export default function MovieDetail() {
    const { id } = useParams();
    const movies = [
        { id: 1, title: "Spider-Man: No Way Home", genre: "Action, Adventure", duration: "148 min", rating: "PG-13", poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Spider-Man", description: "Peter Parker's secret identity is revealed to the entire world.", price: 50000 },
        { id: 2, title: "The Batman", genre: "Action, Crime", duration: "176 min", rating: "PG-13", poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Batman", description: "Batman ventures into Gotham City's underworld.", price: 55000 }
    ];
    const schedules = [
        { id: 1, movieId: 1, time: "10:00", studio: "Studio 1", availableSeats: 45 },
        { id: 2, movieId: 1, time: "13:00", studio: "Studio 2", availableSeats: 32 },
        { id: 3, movieId: 2, time: "16:00", studio: "Studio 1", availableSeats: 28 }
    ];
    const movie = movies.find(m => m.id === parseInt(id));
    const movieSchedules = schedules.filter(s => s.movieId === parseInt(id));

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
                            <h3 className="text-lg font-semibold mb-2">Price</h3>
                            <p className="text-red-500 text-xl font-bold">Rp {movie.price.toLocaleString()}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-gray-300 leading-relaxed">{movie.description}</p>
                        </div>

                        {/* Schedules */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">Showtimes</h3>
                            {movieSchedules.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {movieSchedules.map(schedule => (
                                        <div key={schedule.id} className="bg-gray-800 p-4 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-white font-semibold">{schedule.time}</p>
                                                    <p className="text-gray-400">{schedule.studio}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-green-500">{schedule.availableSeats} seats</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400">No showtimes available</p>
                            )}
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