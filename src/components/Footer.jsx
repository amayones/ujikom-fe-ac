import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-gray-300 p-5">
            <div className="w-full px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Copyright */}
                <p className="text-xs sm:text-sm md:text-base text-center md:text-left">
                    © 2025 Absolute Cinema. All rights reserved.
                </p>

                {/* Social Media Icons */}
                <div className="flex items-center justify-center gap-4">
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
        </footer>
    );
}
