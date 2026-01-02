import { ArrowDown, Book, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export function IntroductionHero() {
    return (
        <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
            {/* Background Decorations - Subtle Dots Pattern */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

            {/* Glowing Effects */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pastel-lilac/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pastel-pink/20 rounded-full blur-3xl -z-10 delay-1000 animate-pulse"></div>

            {/* Floating Icons Container */}
            <div className="flex gap-8 mb-8 relative">
                {/* Book Icon */}
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 rotate-[-6deg] hover:rotate-0 transition-transform duration-300">
                    <Book className="w-8 h-8 text-slate-700" />
                </div>

                {/* Sparkles Icon */}
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 -translate-y-4 hover:-translate-y-2 transition-transform duration-300">
                    <Sparkles className="w-8 h-8 text-orange-300" />
                </div>

                {/* Heart Icon */}
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 rotate-[6deg] hover:rotate-0 transition-transform duration-300">
                    <Heart className="w-8 h-8 text-purple-600 fill-purple-600" />
                </div>
            </div>

            {/* Main Content */}
            <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
                <h1 className="text-6xl md:text-8xl font-handwritten text-gray-800 tracking-wide">
                    Welcome to My Diary
                </h1>

                <p className="text-lg md:text-xl text-gray-500 font-rounded leading-relaxed max-w-2xl mx-auto">
                    Hai! Ini adalah ruang kecilku untuk berbagi cerita, pikiran random, dan hal-hal yang
                    bikin aku happy. Anggap aja lagi ngobrol sama temen ya!
                    <MessageCircle className="inline-block w-5 h-5 ml-2 text-pastel-lilac fill-pastel-lilac/50" />
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <Button variant="primary" size="lg" className="rounded-2xl px-8 shadow-md hover:shadow-lg bg-[#b486d3] text-white hover:bg-[#a375c2] border-none group">
                        <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
                        Mulai Baca
                    </Button>

                    <Button variant="outline" size="lg" className="rounded-2xl px-8 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300">
                        Explore Categories
                    </Button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-gray-400">
                <ArrowDown className="w-6 h-6" />
            </div>
        </section>
    );
}
