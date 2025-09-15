import React from 'react';

export default function Home() {
    return (
        <div className="bg-gray-900 text-white min-h-screen p-5">
            {/* Hero Section */}
            <section className="text-center py-20 px-4">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-red-600">Absolute Cinema</h1>
                <p className="text-gray-300 mb-8 text-sm sm:text-base">Your ultimate movie experience. Watch, explore, and enjoy!</p>

            </section>

            {/* Placeholder Movies */}
            <section className="w-full py-12 px-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Now Showing</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800 h-48 rounded-md"></div>
                    <div className="bg-gray-800 h-48 rounded-md"></div>
                    <div className="bg-gray-800 h-48 rounded-md"></div>
                </div>
            </section>
        </div>
    );
}
