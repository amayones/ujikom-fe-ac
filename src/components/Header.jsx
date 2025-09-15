import React from 'react'

export default function Header() {
    return (
        <div>
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-xl font-bold">MyApp</h1>
                <nav className="mt-2">
                    <a href="/" className="mr-4 hover:underline">Home</a>
                    <a href="/about" className="hover:underline">About</a>
                </nav>
            </header>
        </div>
    )
}
