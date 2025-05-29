import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full text-center p-6">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">Page Not Found</h2>
        </div>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <div className="space-y-4">
          <Link 
            to="/" 
            className="block w-full sm:w-auto sm:inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Homepage
          </Link>
          <Link
            to="/calendar"
            className="block w-full sm:w-auto sm:inline-block px-6 py-3 ml-0 sm:ml-4 mt-4 sm:mt-0 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            View Race Calendar
          </Link>
        </div>
        <div className="mt-12">
          <p className="text-gray-500">
            Looking for races? Check out these categories:
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            <Link to="/marathons" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
              Marathons
            </Link>
            <Link to="/ultramarathons" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
              Ultramarathons
            </Link>
            <Link to="/staged-ultramarathons" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
              Staged Ultras
            </Link>
            <Link to="/triathlons" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
              Triathlons
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;