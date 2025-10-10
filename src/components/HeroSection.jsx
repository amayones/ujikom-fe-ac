import React from 'react';
import { Play, Ticket } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ef4444" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <div className="animate-slide-up">
                    <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl">
                        ABSOLUTE
                    </h1>
                    <h2 className="text-4xl sm:text-6xl font-bold mb-8 text-white tracking-wider">
                        CINEMA
                    </h2>
                </div>
                
                <div className="animate-fade-scale" style={{ animationDelay: '0.3s' }}>
                    <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                        Rasakan pengalaman menonton yang tak terlupakan dengan teknologi terdepan dan kenyamanan premium
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-scale" style={{ animationDelay: '0.6s' }}>
                    <button className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3">
                        <Ticket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        Pesan Tiket Sekarang
                    </button>
                    <button className="group border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
                        <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        Tonton Trailer
                    </button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
                </div>
            </div>
        </section>
    );
}