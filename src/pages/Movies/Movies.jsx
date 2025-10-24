import React, { useState, useEffect } from 'react';
import { Film, Sparkles } from 'lucide-react';
import useFilmStore from '../../store/filmStore';
import MovieCard from '../../components/ui/MovieCard';
import MovieSkeleton from '../../components/ui/MovieSkeleton';

const Movies = () => {
  const [filter, setFilter] = useState('now_playing');
  const { movies, loading, getMovies } = useFilmStore();

  useEffect(() => {
    getMovies(filter);
  }, [filter, getMovies]);

  const filterOptions = [
    { 
      value: 'now_playing', 
      label: 'Now Playing', 
      icon: Film,
      description: 'Currently in theaters'
    },
    { 
      value: 'coming_soon', 
      label: 'Coming Soon', 
      icon: Sparkles,
      description: 'Upcoming releases'
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Film className="text-orange-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Now Playing</h1>
          </div>
          
          <div className="flex space-x-2">
            {filterOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === option.value
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <MovieSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {movies.length === 0 ? (
              <div className="text-center py-12">
                <Film className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No movies found</h3>
                <p className="text-gray-600">
                  {filter === 'now_playing' 
                    ? 'No movies are currently playing.' 
                    : 'No upcoming movies at the moment.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Movies;