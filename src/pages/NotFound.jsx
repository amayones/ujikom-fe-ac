import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="text-center px-4">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        Sorry, the page you are looking for could not be found or you don't have access to this page.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        to="/" 
                        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>
                    <button 
                        onClick={() => window.history.back()} 
                        className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}