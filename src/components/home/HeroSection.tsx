import { BookOpen, Coffee, Palette, Sparkles, Brain, MessageCircleQuestion, Heart, Star, Music, Camera, Sun } from 'lucide-react';
import { Sticker } from '../ui/Sticker';
import { Link } from '@/i18n/routing';
import { client } from '@/sanity/lib/client';
import { categoriesQuery } from '@/sanity/lib/queries';

// Map icon string to Lucide icon component
const iconMap: Record<string, React.ReactNode> = {
    'book-open': <BookOpen className="w-8 h-8" />,
    'coffee': <Coffee className="w-8 h-8" />,
    'sparkles': <Sparkles className="w-8 h-8" />,
    'palette': <Palette className="w-8 h-8" />,
    'brain': <Brain className="w-8 h-8" />,
    'message-circle-question': <MessageCircleQuestion className="w-8 h-8" />,
    'heart': <Heart className="w-8 h-8" />,
    'star': <Star className="w-8 h-8" />,
    'music': <Music className="w-8 h-8" />,
    'camera': <Camera className="w-8 h-8" />,
    'sun': <Sun className="w-8 h-8" />,
};

// Map color string to Tailwind classes
const colorMap: Record<string, { border: string; bg: string; hover: string; text: string }> = {
    'yellow': {
        border: 'border-pastel-yellow-border',
        bg: 'bg-white',
        hover: 'hover:bg-pastel-yellow',
        text: 'text-yellow-600',
    },
    'pink': {
        border: 'border-pastel-pink-border',
        bg: 'bg-white',
        hover: 'hover:bg-pastel-pink',
        text: 'text-pink-500',
    },
    'purple': {
        border: 'border-pastel-lilac-border',
        bg: 'bg-white',
        hover: 'hover:bg-pastel-lilac',
        text: 'text-purple-500',
    },
    'blue': {
        border: 'border-pastel-blue-border',
        bg: 'bg-white',
        hover: 'hover:bg-pastel-blue',
        text: 'text-blue-400',
    },
    'green': {
        border: 'border-pastel-mint-border',
        bg: 'bg-white',
        hover: 'hover:bg-pastel-mint',
        text: 'text-green-500',
    },
    'indigo': {
        border: 'border-blue-200',
        bg: 'bg-white',
        hover: 'hover:bg-blue-100',
        text: 'text-indigo-500',
    },
    'orange': {
        border: 'border-orange-200',
        bg: 'bg-white',
        hover: 'hover:bg-orange-100',
        text: 'text-orange-500',
    },
    'red': {
        border: 'border-red-200',
        bg: 'bg-white',
        hover: 'hover:bg-red-100',
        text: 'text-red-500',
    },
};

interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    order: number;
    isSpecial: boolean;
    specialHref?: string;
}

export async function HeroSection({ language = 'id' }: { language?: string }) {
    const categories: Category[] = await client.fetch(categoriesQuery, { language });

    return (
        <section id="categories" className="py-8">
            <div className="container mx-auto px-4 max-w-xl">
                {/* Single-column stacked category menu */}
                <div className="flex flex-col gap-4">
                    {categories.map((cat, index) => {
                        const colorClasses = colorMap[cat.color] || colorMap['purple'];
                        const icon = iconMap[cat.icon] || <Sparkles className="w-8 h-8" />;
                        const href = cat.isSpecial && cat.specialHref ? cat.specialHref : `/category/${cat.slug}`;

                        return (
                            <Link
                                key={cat._id}
                                href={href}
                                className="group block"
                            >
                                <Sticker
                                    rotation={0}
                                    className={`w-full flex flex-col items-center justify-center gap-3 py-6 ${colorClasses.border} ${colorClasses.bg} ${colorClasses.hover} rounded-[2rem] shadow-none hover:shadow-sticker transition-all duration-300`}
                                    borderColor="border-transparent"
                                    borderWidth="border-[3px]"
                                >
                                    <div className={`${colorClasses.text} group-hover:scale-110 transition-transform duration-300`}>
                                        {icon}
                                    </div>
                                    <span className="font-bold text-gray-700 tracking-tight">{cat.name}</span>
                                </Sticker>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
