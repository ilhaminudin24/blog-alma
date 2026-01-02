
import { Sparkles, Heart } from 'lucide-react';

interface AboutHeroProps {
    greeting: string;
    role: string;
    intro: string;
}

export function AboutHero({ greeting, role, intro }: AboutHeroProps) {
    return (
        <section className="relative py-20 px-4 flex flex-col items-center text-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-pastel-yellow/40 rounded-full blur-2xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-pastel-blue/30 rounded-full blur-2xl -z-10 animate-pulse delay-700"></div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-pastel-lilac/50 shadow-sm animate-fade-in">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-gray-600 tracking-wide uppercase">{role}</span>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                </div>

                <h1 className="text-5xl md:text-7xl font-handwritten text-gray-800 leading-tight">
                    {greeting}
                </h1>

                <p className="text-lg md:text-xl text-gray-600 font-rounded leading-relaxed">
                    {intro}
                    <Heart className="inline-block w-5 h-5 ml-2 text-pastel-pink fill-pastel-pink animate-bounce" />
                </p>
            </div>
        </section>
    );
}
