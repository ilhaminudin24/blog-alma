"use client";

import { useState, useEffect, useTransition } from 'react';
import { Eye } from 'lucide-react';

interface ViewsTrackerProps {
    initialViews?: number;
    postId: string;
    showLabel?: boolean;
    className?: string;
}

export function ViewsTracker({
    initialViews = 0,
    postId,
    showLabel = false,
    className = ''
}: ViewsTrackerProps) {
    const [views, setViews] = useState(initialViews);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        // Track view on every page load (Total Views mode)
        startTransition(async () => {
            try {
                const response = await fetch('/api/views', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ postId }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.views !== undefined) {
                        setViews(data.views);
                    }
                }
            } catch (error) {
                console.error('Error tracking view:', error);
            }
        });
    }, [postId]);

    return (
        <span className={`flex items-center gap-1.5 ${className}`}>
            <Eye size={16} className={isPending ? 'animate-pulse opacity-50' : ''} />
            <span>{views}</span>
            {showLabel && <span className="hidden sm:inline text-xs">views</span>}
        </span>
    );
}

// Simple display component for cards (no tracking, just display)
export function ViewsDisplay({
    views = 0,
    className = ''
}: {
    views?: number;
    className?: string;
}) {
    return (
        <span className={`flex items-center gap-1 ${className}`}>
            <Eye size={16} />
            <span>{views || 0}</span>
        </span>
    );
}
