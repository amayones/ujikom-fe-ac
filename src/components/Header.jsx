import React from 'react'

export default function Header() {
    return (
        <div>
            <header className="bg-black text-white p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="text-red-500 text-2xl mr-2">🎥</span>
                        <h1 className="text-2xl font-bold">Absolute Cinema</h1>
                    </div>
                    <nav className="space-x-6">
                        <a href="/" className="hover:text-red-500 transition-colors">Home</a>
                        <a href="/movies" className="hover:text-red-500 transition-colors">Movies</a>
                        <a href="/about" className="hover:text-red-500 transition-colors">About</a>
                    </nav>
                </div>
            </header>
        </div>
    )
}
