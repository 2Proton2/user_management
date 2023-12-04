// ErrorPage.js
import React from 'react';

export const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-4">
        <h2 className="text-4xl font-bold text-red-500 mb-4">Error 404</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
