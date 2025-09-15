import React from 'react'

export default function Header() {
    return (
        <header className="bg-white shadow p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Absolute Cinema</h1>
                <nav className="space-x-4">
                    <a href="/" className="text-blue-600 hover:underline">Home</a>
                </nav>
            </div>
        </header>
    )
}
