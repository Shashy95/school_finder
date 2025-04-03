import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Hero Section */}
      <div className="bg-gray-300 h-40 md:h-52 rounded-xl"></div>
      
      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
        {/* Title */}
        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
        
        {/* Input Fields */}
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
          <div className="h-12 bg-gray-300 rounded w-full"></div>
          <div className="h-12 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
