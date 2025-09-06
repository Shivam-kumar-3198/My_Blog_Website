import React from "react";
import "./SnakeLoader.css"; // We'll move the custom animations here

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white text-gray-700">
      <p className="mb-6 text-xl font-semibold text-violet-800 animate-pulse">
        Loading content...
      </p>

      <div className="relative w-28 h-28 mb-8">
        {/* Snake-style ring */}
        <div className="absolute w-full h-full rounded-full border-8 border-t-violet-700 border-r-violet-500 border-l-violet-600 border-b-transparent animate-spin"></div>

        {/* Snake Head */}
        <div className="absolute inset-0 flex items-center justify-center snake-head">
          <div className="relative">
            {/* Head base */}
            <div className="h-10 w-14 rounded-full bg-gradient-to-r from-violet-700 to-violet-600 shadow-lg"></div>

            {/* Eyes */}
            <div className="absolute -top-2 left-2 snake-eye">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-1 w-1 rounded-full bg-black absolute top-0.5 left-0.5"></div>
            </div>
            <div className="absolute -top-2 right-2 snake-eye">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-1 w-1 rounded-full bg-black absolute top-0.5 left-0.5"></div>
            </div>

            {/* Tongue */}
            <div className="tongue absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-red-500 w-2 rounded-b-full origin-bottom"></div>

            {/* Nostrils / Details */}
            <div className="absolute bottom-2 left-3 h-1 w-1 rounded-full bg-violet-400"></div>
            <div className="absolute bottom-2 right-3 h-1 w-1 rounded-full bg-violet-400"></div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-4">Content is loading...</p>
    </div>
  );
};

export default Loader;
