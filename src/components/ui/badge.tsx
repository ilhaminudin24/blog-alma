import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'daily' | 'lifestyle' | 'hobbies' | 'makeup' | 'mood';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
    icon?: React.ReactNode;
}

const variants: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-800',
    daily: 'bg-pastel-yellow text-amber-900',
    lifestyle: 'bg-pastel-mint text-emerald-900',
    hobbies: 'bg-pastel-blue text-blue-900',
    makeup: 'bg-pastel-pink text-rose-900',
    mood: 'bg-pastel-lilac text-purple-900',
};

export function Badge({ children, variant = 'default', className, icon }: BadgeProps) {
    return (
        <span className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase',
            variants[variant],
            className
        )}>
            {icon && <span className="w-3 h-3 flex items-center justify-center">{icon}</span>}
            {children}
        </span>
    );
}
