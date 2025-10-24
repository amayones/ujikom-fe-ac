import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Calendar, Play } from 'lucide-react';

const MovieCard = ({ movie, className = '' }) => {
  const {
    id,
    title,
    genre,
    duration,
    poster,
    rating = 8.5,
    release_date,
    status
  } = movie;

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={poster || '/api/placeholder/300/450'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-orange-600 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
            <Play className="h-6 w-6 text-white fill-current" />
          </div>
        </div>

        {status === 'now_playing' && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            NOW PLAYING
          </div>
        )}
        
        {status === 'coming_soon' && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            COMING SOON
          </div>
        )}

        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-white text-xs font-medium">{rating}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-gray-900 font-bold text-lg leading-tight group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{genre}</p>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{formatDuration(duration)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(release_date)}</span>
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Link
            to={`/movies/${id}`}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300 text-center"
          >
            View Details
          </Link>
          {status === 'now_playing' && (
            <Link
              to={`/movies/${id}/booking`}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300 text-center"
            >
              Book Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;