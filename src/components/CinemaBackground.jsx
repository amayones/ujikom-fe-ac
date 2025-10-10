import React from 'react';

export default function CinemaBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Floating film strips */}
            <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute opacity-10 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 2}s`,
                            animationDuration: `${8 + Math.random() * 4}s`
                        }}
                    >
                        <div className="w-16 h-24 bg-gradient-to-b from-red-500 to-red-700 rounded-lg opacity-30 transform rotate-12">
                            <div className="flex flex-col h-full justify-between p-1">
                                {[...Array(8)].map((_, j) => (
                                    <div key={j} className="w-2 h-2 bg-black rounded-full mx-auto opacity-50" />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Spotlight effects */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full opacity-5 animate-pulse" />
                <div className="absolute top-20 right-20 w-24 h-24 bg-yellow-400 rounded-full opacity-5 animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-blue-500 rounded-full opacity-5 animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Particle effects */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-twinkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>
        </div>
    );
}