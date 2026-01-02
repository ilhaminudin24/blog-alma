import { Coffee, Heart, Palette, Sparkles, Smile, LayoutGrid } from 'lucide-react';
import { Card } from '../ui/card';
import Link from 'next/link';

const categories = [
    { name: 'Daily Life', slug: 'daily-life', icon: <Coffee className="w-8 h-8 text-yellow-600" />, color: 'border-pastel-yellow-border bg-white', hover: 'hover:bg-pastel-yellow' },
    { name: 'Lifestyle', slug: 'lifestyle', icon: <Heart className="w-8 h-8 text-pink-500" />, color: 'border-pastel-pink-border bg-white', hover: 'hover:bg-pastel-pink' },
    { name: 'Makeup & Skincare', slug: 'makeup-skincare', icon: <Palette className="w-8 h-8 text-purple-500" />, color: 'border-pastel-lilac-border bg-white', hover: 'hover:bg-pastel-lilac' },
    { name: 'Hobbies', slug: 'hobbies', icon: <Sparkles className="w-8 h-8 text-blue-400" />, color: 'border-pastel-blue-border bg-white', hover: 'hover:bg-pastel-blue' },
    { name: 'Mood', slug: 'mood', icon: <Smile className="w-8 h-8 text-green-500" />, color: 'border-pastel-mint-border bg-white', hover: 'hover:bg-pastel-mint' },
    { name: 'Favorites', slug: 'favorites', icon: <LayoutGrid className="w-8 h-8 text-orange-400" />, color: 'border-pastel-red-border bg-white', hover: 'hover:bg-pastel-red' },
];

export function HeroSection() {
    return (
        <section className="py-8">
            <div className="container mx-auto px-4">
                {/* Header Text */}
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-2xl text-orange-300">✨</span>
                    <h2 className="text-2xl font-bold font-rounded text-purple-900">Explore My World</h2>
                </div>

                {/* Grid Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            href={`/category/${cat.slug}`}
                            className="group block h-40"
                        >
                            <Card className={`h-full flex flex-col items-center justify-center gap-4 border-[3px] ${cat.color} ${cat.hover} transition-all duration-300 hover:-translate-y-1 rounded-[2rem] shadow-none hover:shadow-sticker`}>
                                <div className="text-gray-700 group-hover:scale-110 transition-transform duration-300">
                                    {cat.icon}
                                </div>
                                <span className="font-bold text-gray-700 tracking-tight">{cat.name}</span>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
