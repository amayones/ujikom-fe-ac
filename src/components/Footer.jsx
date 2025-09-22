import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-gray-300">
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
                        <li><a href="/jadwal" className="hover:text-red-500">Jadwal</a></li>
                        <li><a href="/harga" className="hover:text-red-500">Harga Tiket</a></li>
                        <li><a href="/promo" className="hover:text-red-500">Promo</a></li>
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
                        Jl. Cinema Raya No. 21, Jakarta<br />
                        Email: support@absolutecinema.com<br />
                        Telp: (021) 123-4567
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-red-500 transition-colors duration-200">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="hover:text-red-500 transition-colors duration-200">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="hover:text-red-500 transition-colors duration-200">
                            <Twitter size={18} />
                        </a>
                        <a href="#" className="hover:text-red-500 transition-colors duration-200">
                            <Youtube size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-700 text-center py-4 text-xs md:text-sm">
                © 2025 Absolute Cinema. All rights reserved.
            </div>
        </footer>
    );
}
