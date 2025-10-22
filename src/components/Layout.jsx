import React from 'react';
import useSidebarStore from '../store/sidebarStore';

export default function Layout({ children }) {
    const { collapsed } = useSidebarStore();
    
    return (
        <div className="flex min-h-screen bg-gray-900">
            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'}`}>
                <div className="p-4 md:p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}