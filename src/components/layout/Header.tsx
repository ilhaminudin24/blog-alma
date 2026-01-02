import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Button } from '../ui/button';

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b border-pastel-lilac/30">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-pastel-pink p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                        <Heart className="w-5 h-5 text-white fill-white" />
                    </div>
                    <span className="font-rounded font-bold text-xl text-gray-800 tracking-tight">
                        My Little Diary <span className="text-xs text-gray-400 font-normal ml-1 hidden sm:inline-block">Sharing my little moments with you ✨</span>
                    </span>
                </Link>

                <nav className="flex items-center gap-4">
                    {/* Placeholder for future links */}
                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex rounded-full">
                        <Link href="/about">About Me 💖</Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
}
