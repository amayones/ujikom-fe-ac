import React from "react";

export default function Home() {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full h-[400px] sm:h-[500px] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('https://picsum.photos/1200/500?random=1')" }}>
                <div className="bg-black bg-opacity-60 w-full h-full flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-red-600">Absolute Cinema</h1>
                    <p className="text-gray-300 mb-6 text-sm sm:text-lg max-w-2xl">
                        Nikmati pengalaman menonton terbaik dengan film-film terbaru dan fasilitas modern.
                    </p>
                    <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold">
                        Book Now
                    </button>
                </div>
            </section>

            {/* Now Showing */}
            <section className="w-full py-12 px-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Now Showing</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            <div className="h-52 bg-gray-700 flex items-center justify-center">
                                <span className="text-gray-400">Poster {i}</span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">Judul Film {i}</h3>
                                <p className="text-sm text-gray-400">Genre | 120 min</p>
                                <button className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-1.5 rounded text-sm">
                                    Detail
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Coming Soon */}
            <section className="w-full py-12 px-6 bg-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-center">Coming Soon</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-700 rounded-lg shadow-md overflow-hidden">
                            <div className="h-44 bg-gray-600 flex items-center justify-center">
                                <span className="text-gray-400">Poster Coming {i}</span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">Film Akan Datang {i}</h3>
                                <p className="text-sm text-gray-400">Rilis: 20{i}/2025</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Promo / Event */}
            {/* <section className="w-full py-12 px-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Promo & Event</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-600 rounded-lg p-6 text-center shadow-md">
                        <h3 className="text-xl font-bold mb-2">Diskon 50% Hari Rabu</h3>
                        <p className="text-sm">Nikmati nonton hemat setiap hari Rabu dengan kartu member.</p>
                    </div>
                    <div className="bg-red-600 rounded-lg p-6 text-center shadow-md">
                        <h3 className="text-xl font-bold mb-2">Event Premiere</h3>
                        <p className="text-sm">Ikuti pemutaran perdana film terbaru bersama artis favoritmu.</p>
                    </div>
                </div>
            </section> */}
        </div>
    );
}
