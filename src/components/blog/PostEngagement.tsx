"use client";

import { useState } from 'react';
import { Heart, Share2, Sparkles } from 'lucide-react';

export function PostEngagement({ initialLikes = 0 }: { initialLikes?: number }) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        if (isLiked) {
            setLikes(prev => prev - 1);
            setIsLiked(false);
        } else {
            setLikes(prev => prev + 1);
            setIsLiked(true);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 p-8 bg-pastel-yellow/30 rounded-[3rem] border border-pastel-yellow shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pastel-lilac via-pastel-pink to-pastel-yellow opacity-50"></div>

            <div className="text-center space-y-2">
                <h3 className="font-rounded text-2xl text-gray-700 font-bold flex items-center gap-2 justify-center">
                    Gimana pendapat kamu? <Sparkles size={20} className="text-yellow-400" />
                </h3>
                <p className="font-sans text-gray-500 text-sm">
                    Kasih love kalau kamu suka tulisan ini ya!
                </p>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={handleLike}
                    className={`
                        flex items-center gap-3 px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm
                        ${isLiked
                            ? 'bg-pastel-pink text-white shadow-pastel-pink/50'
                            : 'bg-white text-gray-600 hover:bg-pastel-pink/10 hover:text-pastel-pink-border'}
                    `}
                >
                    <Heart size={20} className={isLiked ? "fill-current" : ""} />
                    <span>{likes}</span>
                </button>

                <button className="flex items-center gap-3 px-8 py-3 rounded-full font-bold bg-white text-gray-600 hover:bg-pastel-blue/10 hover:text-pastel-blue-border transition-all duration-300 transform hover:scale-105 shadow-sm">
                    <Share2 size={20} />
                    <span>Share</span>
                </button>
            </div>
        </div>
    );
}
