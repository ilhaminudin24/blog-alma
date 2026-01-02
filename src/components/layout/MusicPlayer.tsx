'use client';

import { useEffect, useRef } from 'react';
import { useMusicStore } from '@/lib/store';
import { Play, Pause, X, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function MusicPlayer() {
    const { currentTrack, isPlaying, togglePlay, stop } = useMusicStore();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log('Autoplay prevented', e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    // Ensure volume updates
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
        }
    }, []);


    if (!currentTrack) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <div className="bg-white/90 backdrop-blur-md p-3 pl-4 pr-5 rounded-full border border-pink-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-4">

                    {/* Rotating disk animation - Smoother linear transition */}
                    <div className="relative">
                        <motion.div
                            animate={{ rotate: isPlaying ? 360 : 0 }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            style={{ originX: 0.5, originY: 0.5 }}
                            className="w-10 h-10 rounded-full bg-gradient-to-tr from-pastel-lilac to-pastel-pink flex items-center justify-center shadow-inner"
                        >
                            <Music size={16} className="text-white" />
                        </motion.div>
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                            <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-white"></div>
                        </div>
                    </div>

                    <div className="flex flex-col mr-2">
                        <span className="text-xs font-bold text-gray-800 max-w-[120px] truncate">{currentTrack.title}</span>
                        <span className="text-[10px] text-gray-500 max-w-[120px] truncate">{currentTrack.artist}</span>
                    </div>

                    <div className="flex items-center gap-2 border-l border-gray-100 pl-3">
                        <button
                            onClick={togglePlay}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-pastel-lilac hover:text-white transition-colors"
                        >
                            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                        </button>
                        <button
                            onClick={stop}
                            className="text-gray-400 hover:text-red-400 transition-colors p-1"
                        >
                            <X size={14} />
                        </button>
                    </div>
                    <audio
                        ref={audioRef}
                        src={currentTrack.src}
                        loop
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
