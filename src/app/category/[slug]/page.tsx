import { posts } from '@/data/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge, BadgeVariant } from '@/components/ui/badge';
import { Coffee, Heart, Palette, Sparkles, Smile, LayoutGrid, ArrowLeft } from 'lucide-react';
import { Post } from '@/data/types';

// Duplicate config for styling - in a real app this should be shared
const categoriesConfig: Record<string, { name: string; icon: React.ReactNode; color: string; bg: string; description: string }> = {
    'daily-life': {
        name: 'Daily Life',
        icon: <Coffee className="w-12 h-12 text-yellow-600" />,
        color: 'text-yellow-600',
        bg: 'bg-pastel-yellow/30',
        description: 'Little moments, big memories. A peek into my everyday life. ☕'
    },
    'lifestyle': {
        name: 'Lifestyle',
        icon: <Heart className="w-12 h-12 text-pink-500" />,
        color: 'text-pink-500',
        bg: 'bg-pastel-pink/30',
        description: 'Creating a life I love, one day at a time. ✨'
    },
    'makeup-skincare': {
        name: 'Makeup & Skincare',
        icon: <Palette className="w-12 h-12 text-purple-500" />,
        color: 'text-purple-500',
        bg: 'bg-pastel-lilac/30',
        description: 'Glow up with my favorite products and routines. 💄'
    },
    'hobbies': {
        name: 'Hobbies',
        icon: <Sparkles className="w-12 h-12 text-blue-400" />,
        color: 'text-blue-400',
        bg: 'bg-pastel-blue/30',
        description: 'Things that spark joy and creativity. 🎨'
    },
    'mood': {
        name: 'Mood',
        icon: <Smile className="w-12 h-12 text-green-500" />,
        color: 'text-green-500',
        bg: 'bg-pastel-mint/30',
        description: 'Vibes, music, and feelings. roughly sorted by mood. 🎧'
    },
    'favorites': {
        name: 'Favorites',
        icon: <LayoutGrid className="w-12 h-12 text-orange-400" />,
        color: 'text-orange-400',
        bg: 'bg-pastel-red/30',
        description: 'My absolute favorite posts and top picks! ⭐'
    },
};

export function generateStaticParams() {
    return Object.keys(categoriesConfig).map((slug) => ({
        slug,
    }));
}

function getBadgeVariant(category: string): BadgeVariant {
    if (category.includes('Makeup')) return 'makeup';
    if (category.includes('Hobbies')) return 'hobbies';
    if (category.includes('Lifestyle')) return 'lifestyle';
    if (category.includes('Daily')) return 'daily';
    return 'default';
}

function filterPosts(slug: string): Post[] {
    if (slug === 'favorites') {
        return posts.filter(p => p.featured || p.likes > 40);
    }
    if (slug === 'mood') {
        // For mood, show all for now, maybe sorted by mood?
        // Or specific mood categories? Let's just return all but maybe randomize?
        // Let's return all for now.
        return [...posts].sort((a, b) => a.mood.localeCompare(b.mood));
    }

    // Exact match for category name in config?
    // The slug is 'daily-life', category in Post is 'Daily Life'
    // We can use the config name to match.
    const config = categoriesConfig[slug];
    if (!config) return [];

    return posts.filter(p => p.category === config.name);
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const config = categoriesConfig[slug];

    if (!config) {
        notFound();
    }

    const filteredPosts = filterPosts(slug);

    return (
        <div className="min-h-screen bg-[#fdfcf8]">
            {/* Header Section */}
            <section className={`relative py-20 overflow-hidden`}>
                <div className={`absolute inset-0 ${config.bg} opacity-50 -z-10`}></div>
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

                <div className="container mx-auto px-4 text-center z-10 relative">
                    <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-8 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
                    </Link>

                    <div className="flex justify-center mb-6 animate-bounce-slow">
                        <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-white/50">
                            {config.icon}
                        </div>
                    </div>

                    <h1 className={`text-4xl md:text-6xl font-rounded font-bold mb-4 ${config.color}`}>
                        {config.name}
                    </h1>

                    <p className="text-xl text-gray-600 font-handwritten max-w-2xl mx-auto">
                        {config.description}
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="py-12 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post.id} className="group block h-full">
                                <Card hoverEffect className="h-full flex flex-col overflow-hidden border-none shadow-sm hover:shadow-md bg-white transition-all duration-300">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="absolute top-4 left-4">
                                            <Badge variant={getBadgeVariant(post.category)} className="bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm border-none">
                                                {post.category}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                            <span>📅 {post.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span>{post.mood}</span>
                                        </div>

                                        <h3 className="text-xl font-bold font-rounded text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                                            {post.excerpt}
                                        </p>

                                        {post.music && (
                                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center gap-2 text-xs text-purple-500 font-bold">
                                                <span>🎵</span> {post.music.title}
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <p className="text-gray-400 font-handwritten text-xl">No posts found in this category yet! 🍂</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
