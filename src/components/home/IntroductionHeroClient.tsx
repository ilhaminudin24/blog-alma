"use client";

import { Book, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroChip {
    emoji: string;
    text: string;
}

interface HeroButton {
    text: string;
    scrollTarget: string;
}

interface IntroductionHeroProps {
    title: string;
    subtitle: string;
    chips: HeroChip[];
    primaryButton: HeroButton;
    secondaryButton: HeroButton;
}

export function IntroductionHeroClient({
    title,
    subtitle,
}: IntroductionHeroProps) {
    return (
        <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

            {/* Glowing Effects */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-pastel-lilac/30 rounded-full blur-3xl -z-10"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pastel-pink/20 rounded-full blur-3xl -z-10"
            />

            {/* Floating Icons */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex gap-8 mb-8"
            >
                <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 rotate-[-6deg]"
                >
                    <Book className="w-8 h-8 text-slate-700" />
                </motion.div>

                <motion.div
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 -translate-y-4"
                >
                    <Sparkles className="w-8 h-8 text-orange-300" />
                </motion.div>

                <motion.div
                    whileHover={{ rotate: -10, scale: 1.1 }}
                    className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 rotate-[6deg]"
                >
                    <Heart className="w-8 h-8 text-[#ff85a2] fill-[#ff85a2]" />
                </motion.div>
            </motion.div>

            {/* Title & Subtitle */}
            <div className="text-center max-w-4xl mx-auto space-y-4 relative z-10">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-handwritten text-gray-800 tracking-wide whitespace-pre-line"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-500 font-rounded leading-relaxed mx-auto max-w-2xl"
                >
                    {subtitle}
                </motion.p>
            </div>
        </section>
    );
}
