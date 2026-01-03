"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StickerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    rotation?: number; // Optional initial rotation
    borderWidth?: string;
    borderColor?: string;
    shadow?: string;
    hoverEffect?: boolean;
}

export function Sticker({
    children,
    className,
    rotation,
    borderWidth = "border-[3px]",
    borderColor = "border-white",
    shadow = "shadow-lg",
    hoverEffect = true,
    ...props
}: StickerProps) {
    // Generate a random rotation if not provided, but we need to be careful with hydration.
    // Ideally, rotation should be deterministic or passed from parent.
    // For now, we'll default to 0 if not passed, or use a pseudo-random based on child content string length if possible?
    // Simpler: Just accept rotation prop. If 0/undefined, defaults to standard.
    // Or we use a tiny random range in a useEffect to avoid mismatch, but that causes layout shift.
    // Let's rely on passed rotation or a default slight tilt.

    const randomRotation = rotation !== undefined ? rotation : (Math.random() * 4 - 2); // Random between -2 and 2

    // We actually need to avoid hydration mismatch.
    // Let's just use 0 initial and animate to random on mount if we really want, or just accept props.
    // Better approach for strict hydration: Use a consistent prop or specific index-based rotation.
    // For this implementation, I will skip internal random logic to ensure SSR safety.

    return (
        <motion.div
            className={cn(
                "relative bg-white box-border",
                borderWidth,
                borderColor,
                shadow,
                "rounded-[2rem]", // Default rounded
                className
            )}
            initial={rotation ? { rotate: rotation } : undefined}
            whileHover={hoverEffect ? {
                scale: 1.02,
                rotate: 0,
                transition: { type: "spring", stiffness: 400, damping: 10 }
            } : undefined}
            {...props as any} // Cast to any to satisfy motion props compatibility if strict types issue
        >
            {children}
        </motion.div>
    );
}
