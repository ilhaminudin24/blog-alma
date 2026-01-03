"use client";

import { ArrowDown, Book, Heart, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
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
    chips,
    primaryButton,
    secondaryButton
}: IntroductionHeroProps) {
    const handleScroll = (targetId: string) => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
            {/* Background Decorations - Subtle Dots Pattern */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

            {/* Glowing Effects */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-pastel-lilac/30 rounded-full blur-3xl -z-10"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pastel-pink/20 rounded-full blur-3xl -z-10"
            ></motion.div>

            {/* Floating Icons Container */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex gap-8 mb-8 relative"
            >
                {/* Book Icon */}
                <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 rotate-[-6deg]"
                >
                    <Book className="w-8 h-8 text-slate-700" />
                </motion.div>

                {/* Sparkles Icon */}
                <motion.div
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 -translate-y-4"
                >
                    <Sparkles className="w-8 h-8 text-orange-300" />
                </motion.div>

                {/* Heart Icon */}
                <motion.div
                    whileHover={{ rotate: -10, scale: 1.1 }}
                    className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 rotate-[6deg]"
                >
                    <Heart className="w-8 h-8 text-[#ff85a2] fill-[#ff85a2]" />
                </motion.div>
            </motion.div>

            {/* Main Content */}
            <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
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

                {/* Highlight Chips */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-3 pt-2"
                >
                    {chips.map((chip, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <span className="text-gray-300">•</span>}
                            <motion.span
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-600 shadow-sm border border-gray-100 cursor-default"
                            >
                                {chip.emoji} {chip.text}
                            </motion.span>
                        </React.Fragment>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
                >
                    <Button
                        onClick={() => handleScroll(primaryButton.scrollTarget)}
                        variant="primary"
                        size="lg"
                        className="rounded-2xl px-8 shadow-md hover:shadow-lg bg-[#ff85a2] text-white hover:bg-[#f76d8e] border-none group"
                    >
                        <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
                        {primaryButton.text}
                    </Button>

                    <Button
                        onClick={() => handleScroll(secondaryButton.scrollTarget)}
                        variant="outline"
                        size="lg"
                        className="rounded-2xl px-8 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300"
                    >
                        {secondaryButton.text}
                    </Button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400"
            >
                <ArrowDown className="w-6 h-6" />
            </motion.div>
        </section>
    );
}

// Import React for Fragment
import React from 'react';
