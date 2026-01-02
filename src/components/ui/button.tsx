import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className, variant = 'primary', size = 'md', isLoading, children, ...props
}, ref) => {
    const variants = {
        primary: 'bg-pastel-lilac text-gray-800 hover:bg-pastel-lilac/80 hover:-translate-y-0.5 shadow-sm',
        secondary: 'bg-pastel-mint text-emerald-800 hover:bg-pastel-mint/80 hover:-translate-y-0.5 shadow-sm',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-600',
        outline: 'border-2 border-pastel-lilac text-gray-700 hover:bg-pastel-lilac/10',
    };
    const sizes = {
        sm: 'h-8 px-4 text-sm',
        md: 'h-10 px-6 text-base',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10 p-2 flex items-center justify-center',
    };

    return (
        <button
            ref={ref}
            className={cn(
                'relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none active:scale-95',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
});
Button.displayName = 'Button';
export { Button };
