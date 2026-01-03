"use client";

import { useState, useEffect } from 'react';
import { Heart, Share2, Sparkles, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function PostEngagement({ initialLikes = 0, postId }: { initialLikes?: number; postId: string }) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations('engagement');

    useEffect(() => {
        // Check local storage on mount to see if this post is already liked
        const likedState = localStorage.getItem(`liked_${postId}`);
        if (likedState === 'true') {
            setIsLiked(true);
        }
    }, [postId]);

    const handleLike = async () => {
        if (isLoading) return;

        // Optimistic update
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        setLikes(prev => newIsLiked ? prev + 1 : prev - 1);

        // Update local storage
        if (newIsLiked) {
            localStorage.setItem(`liked_${postId}`, 'true');
        } else {
            localStorage.removeItem(`liked_${postId}`);
        }

        try {
            setIsLoading(true);
            const response = await fetch('/api/like', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId,
                    increment: newIsLiked // true = +1, false = -1
                }),
            });

            if (!response.ok) {
                // Revert state if error
                setIsLiked(!newIsLiked);
                setLikes(prev => !newIsLiked ? prev + 1 : prev - 1);
                // Revert local storage
                if (!newIsLiked) localStorage.setItem(`liked_${postId}`, 'true');
                else localStorage.removeItem(`liked_${postId}`);
                console.error('Failed to update likes');
            } else {
                // Update with server source of truth to be safe
                const data = await response.json();
                if (data.likes !== undefined) {
                    setLikes(data.likes);
                }
            }
        } catch (error) {
            console.error('Error liking post:', error);
            // Revert state if error
            setIsLiked(!newIsLiked);
            setLikes(prev => !newIsLiked ? prev + 1 : prev - 1);
            if (!newIsLiked) localStorage.setItem(`liked_${postId}`, 'true');
            else localStorage.removeItem(`liked_${postId}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: document.title,
            text: 'Check out this post on Ruang Cerita Alma!',
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback for browsers that don't support navigator.share
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard! ✨');
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 p-8 bg-pastel-yellow/30 rounded-[3rem] border border-pastel-yellow shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pastel-lilac via-pastel-pink to-pastel-yellow opacity-50"></div>

            <div className="text-center space-y-2">
                <h3 className="font-rounded text-2xl text-gray-700 font-bold flex items-center gap-2 justify-center">
                    {t('question')} <Sparkles size={20} className="text-yellow-400" />
                </h3>
                <p className="font-sans text-gray-500 text-sm">
                    {t('likePrompt')}
                </p>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={handleLike}
                    disabled={isLoading}
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

                <button
                    onClick={handleShare}
                    className="flex items-center gap-3 px-8 py-3 rounded-full font-bold bg-white text-gray-600 hover:bg-pastel-blue/10 hover:text-pastel-blue-border transition-all duration-300 transform hover:scale-105 shadow-sm"
                >
                    <Share2 size={20} />
                    <span>{t('share')}</span>
                </button>
            </div>
        </div>
    );
}
