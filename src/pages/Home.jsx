import React from 'react'

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-black to-red-900 py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">Welcome to Absolute Cinema</h1>
                    <p className="text-xl mb-8">Experience the magic of movies like never before</p>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        Explore Movies
                    </button>
                </div>
            </section>

            {/* Featured Movies Section */}
            <section className="py-16">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Movies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Movie Card 1 */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                            <div className="h-64 bg-gray-700 flex items-center justify-center">
                                <span className="text-6xl">🎬</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">Movie Title 1</h3>
                                <p className="text-gray-400 mb-4">A thrilling adventure awaits...</p>
                                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
                                    Watch Now
                                </button>
                            </div>
                        </div>

                        {/* Movie Card 2 */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                            <div className="h-64 bg-gray-700 flex items-center justify-center">
                                <span className="text-6xl">🎭</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">Movie Title 2</h3>
                                <p className="text-gray-400 mb-4">An epic tale of love and drama...</p>
                                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
                                    Watch Now
                                </button>
                            </div>
                        </div>

                        {/* Movie Card 3 */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                            <div className="h-64 bg-gray-700 flex items-center justify-center">
                                <span className="text-6xl">🎪</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">Movie Title 3</h3>
                                <p className="text-gray-400 mb-4">Comedy and fun for the whole family...</p>
                                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
                                    Watch Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
