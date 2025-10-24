import React from 'react';
import { Play, Star, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = ({ featuredMovie }) => {
  if (!featuredMovie) return null;

  const {
    id,
    title,
    description,
    poster,
    genre,
    duration,
    rating = 8.5,
    release_date
  } = featuredMovie;

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="relative h-[70vh] overflow-hidden rounded-2xl mb-12">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={poster || '/api/placeholder/1920/1080'}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-sm font-semibold">FEATURED MOVIE</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              {title}
            </h1>

            {/* Movie Info */}
            <div className="flex items-center space-x-6 text-gray-300">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(duration)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(release_date).getFullYear()}</span>
              </div>
              <div className="px-3 py-1 bg-gray-800/50 rounded-full text-sm">
                {genre}
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-200 leading-relaxed max-w-xl line-clamp-3">
              {description || 'Experience the ultimate cinematic adventure with stunning visuals and captivating storytelling that will keep you on the edge of your seat.'}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-4">
              <Link
                to={`/movies/${id}`}
                className="group flex items-center space-x-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-red-500/25"
              >
                <Play className="h-5 w-5 fill-current" />
                <span>Watch Trailer</span>
              </Link>
              
              <Link
                to={`/movies/${id}/booking`}
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <span>Book Tickets</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-8 right-8 space-y-4">
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{rating}</div>
            <div className="text-xs text-gray-400">IMDb Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;