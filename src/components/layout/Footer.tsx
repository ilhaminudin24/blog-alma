import Link from 'next/link';
import { Sparkles, Heart, Coffee, Instagram, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white border-t border-pastel-lilac/30 pt-16 pb-8 mt-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#9c27b0]/10 rounded-full flex items-center justify-center text-[#9c27b0]">
                                <Sparkles size={20} />
                            </div>
                            <h3 className="font-handwritten text-2xl text-gray-800">my diary</h3>
                        </div>
                        <p className="text-gray-500 leading-relaxed text-sm max-w-xs">
                            Ruang pribadiku untuk berbagi cerita, pengalaman, dan hal-hal random yang ada di kepala. Welcome to my little corner of the internet! 💜
                        </p>
                    </div>

                    {/* Quick Links Column */}
                    <div className="md:pl-12">
                        <h3 className="font-handwritten text-2xl text-gray-800 mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {['Home', 'Categories', 'About Me'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-500 hover:text-pastel-pink-border transition-colors text-sm"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect Column */}
                    <div>
                        <h3 className="font-handwritten text-2xl text-gray-800 mb-6">Let's Connect!</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <a href="#" className="w-10 h-10 bg-[#f8bbd0] rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-[#b2dfdb] rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform">
                                <Twitter size={20} />
                            </a>
                        </div>
                        <p className="text-gray-400 text-sm">DM always open untuk ngobrol! ✨</p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} My Diary. Made with <span className="text-pastel-pink inline-block animate-pulse">❤</span> and lots of coffee.
                    </p>

                    <div className="flex items-center gap-3 opacity-80">
                        <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            <Coffee size={14} />
                        </span>
                        <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[#9c27b0]">
                            <Heart size={14} />
                        </span>
                        <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-orange-300">
                            <Sparkles size={14} />
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
