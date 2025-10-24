import React from 'react';

const MovieSkeleton = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      {/* Poster Skeleton */}
      <div className="aspect-[2/3] bg-gray-200">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>

        {/* Details */}
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-16" />
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>

        {/* Buttons */}
        <div className="flex space-x-2 pt-2">
          <div className="flex-1 h-8 bg-gray-300 rounded-lg" />
          <div className="flex-1 h-8 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default MovieSkeleton;