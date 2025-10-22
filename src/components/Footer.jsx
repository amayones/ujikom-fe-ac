import React from 'react';
import { useLocation } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import useSidebarStore from '../store/sidebarStore';

export default function Footer() {
    const location = useLocation();
    const currentPath = location.pathname;
    const { collapsed } = useSidebarStore();
    
    const getCurrentRole = () => {
        if (currentPath.startsWith('/admin')) return 'admin';
        if (currentPath.startsWith('/owner')) return 'owner';
        if (currentPath.startsWith('/cashier')) return 'cashier';
        return 'customer';
    };
    
    const currentRole = getCurrentRole();
    const isRoleBasedPage = currentRole !== 'customer';
    
    return (
        <footer className={`bg-black text-gray-300 transition-all duration-300 ${isRoleBasedPage ? (collapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64') : ''}`}>
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand & About */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Absolute Cinema</h2>
                    <p className="text-sm leading-relaxed">
                        Nikmati pengalaman menonton film terbaik dengan fasilitas modern
                        dan kenyamanan maksimal di Absolute Cinema.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Menu</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-red-500">Now Showing</a></li>
                        <li><a href="/coming-soon" className="hover:text-red-500">Coming Soon</a></li>
                        <li><a href="/history" className="hover:text-red-500">History</a></li>
                    </ul>
                </div>

                {/* Info */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Informasi</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/tentang" className="hover:text-red-500">Tentang Kami</a></li>
                        <li><a href="/syarat" className="hover:text-red-500">Syarat & Ketentuan</a></li>
                        <li><a href="/privasi" className="hover:text-red-500">Kebijakan Privasi</a></li>
                        <li><a href="/kontak" className="hover:text-red-500">Hubungi Kami</a></li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Kontak</h3>
                    <p className="text-sm mb-3">
                        Jl. Absolute Cinema No. 69<br />
                        Email: may@absolutecinema.com<br />
                        Telp: (000) 000-0000
                    </p>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-700 text-center py-4 text-xs md:text-sm">
                © 2025 Absolute Cinema. All rights reserved.
            </div>
        </footer>
    );
}
