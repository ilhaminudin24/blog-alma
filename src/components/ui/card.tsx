import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, hoverEffect = false, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'bg-white rounded-[2rem] border border-pastel-lilac/20 p-6 shadow-sm',
                hoverEffect && 'transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-pastel-lilac/50 cursor-pointer',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});
Card.displayName = 'Card';
export { Card };
