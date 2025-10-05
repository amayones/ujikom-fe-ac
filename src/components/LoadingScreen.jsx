import React from 'react';
import { Film } from 'lucide-react';

export default function LoadingScreen() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin mb-4">
                    <Film className="text-red-500 mx-auto" size={48} />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Absolute Cinema</h2>
                <p className="text-gray-400">Loading...</p>
            </div>
        </div>
    );
}