import React from 'react';

export default function OwnerLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
            {children}
        </div>
    );
}