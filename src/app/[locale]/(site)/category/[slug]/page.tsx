import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Coffee, Sparkles, Palette, Brain, ArrowLeft, Heart, Star, Music, Camera, MessageCircleQuestion } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { categoryQuery, categoryPathsQuery, postsByCategoryQuery } from '@/sanity/lib/queries';

// Map icon string to Lucide icon component (larger size for header)
const iconMap: Record<string, React.ReactNode> = {
    'book-open': <BookOpen className="w-12 h-12" />,
    'coffee': <Coffee className="w-12 h-12" />,
    'sparkles': <Sparkles className="w-12 h-12" />,
    'palette': <Palette className="w-12 h-12" />,
    'brain': <Brain className="w-12 h-12" />,
    'message-circle-question': <MessageCircleQuestion className="w-12 h-12" />,
    'heart': <Heart className="w-12 h-12" />,
    'star': <Star className="w-12 h-12" />,
    'music': <Music className="w-12 h-12" />,
    'camera': <Camera className="w-12 h-12" />,
};

// Map color string to Tailwind classes
const colorMap: Record<string, { text: string; bg: string; iconText: string }> = {
    'yellow': { text: 'text-yellow-600', bg: 'bg-pastel-yellow/30', iconText: 'text-yellow-600' },
    'pink': { text: 'text-pink-500', bg: 'bg-pastel-pink/30', iconText: 'text-pink-500' },
    'purple': { text: 'text-purple-500', bg: 'bg-pastel-lilac/30', iconText: 'text-purple-500' },
    'blue': { text: 'text-blue-400', bg: 'bg-pastel-blue/30', iconText: 'text-blue-400' },
    'green': { text: 'text-green-500', bg: 'bg-pastel-mint/30', iconText: 'text-green-500' },
    'indigo': { text: 'text-indigo-500', bg: 'bg-indigo-100/30', iconText: 'text-indigo-500' },
    'orange': { text: 'text-orange-500', bg: 'bg-orange-100/30', iconText: 'text-orange-500' },
    'red': { text: 'text-red-500', bg: 'bg-red-100/30', iconText: 'text-red-500' },
};

interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
}

interface Post {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: {
        url: string;
        alt: string;
    };
    date: string;
    category: {
        name: string;
        slug: string;
    };
    music?: {
        title: string;
        artist: string;
    };
    likes: number;
}

export async function generateStaticParams() {
    const categories = await client.fetch(categoryPathsQuery);
    const { routing } = await import('@/i18n/routing');

    return categories.flatMap((cat: { slug: string }) =>
        routing.locales.map((locale) => ({
            slug: cat.slug,
            locale: locale
        }))
    );
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { slug, locale } = await params;

    // Fetch category details
    const category: Category | null = await client.fetch(categoryQuery, { slug, language: locale });
    const t = await getTranslations('category');

    if (!category) {
        notFound();
    }

    // Fetch posts in this category
    const posts: Post[] = await client.fetch(postsByCategoryQuery, { categorySlug: slug, language: locale });

    const colorClasses = colorMap[category.color] || colorMap['purple'];
    const icon = iconMap[category.icon];

    return (
        <div className="min-h-screen bg-[#fdfcf8]">
            {/* Header Section */}
            <section className={`relative py-20 overflow-hidden`}>
                <div className={`absolute inset-0 ${colorClasses.bg} opacity-50 -z-10`}></div>
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

                <div className="container mx-auto px-4 text-center z-10 relative">
                    <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-8 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" /> {t('backToHome')}
                    </Link>

                    <div className="flex justify-center mb-6 animate-bounce-slow">
                        <div className={`p-6 bg-white rounded-[2rem] shadow-sm border border-white/50 ${colorClasses.iconText}`}>
                            {icon}
                        </div>
                    </div>

                    <h1 className={`text-4xl md:text-6xl font-rounded font-bold mb-4 ${colorClasses.text}`}>
                        {category.name}
                    </h1>

                    <p className="text-xl text-gray-600 font-handwritten max-w-2xl mx-auto">
                        {category.description}
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="py-12 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post._id} className="group block h-full">
                                <Card hoverEffect className="h-full flex flex-col overflow-hidden border-none shadow-sm hover:shadow-md bg-white transition-all duration-300">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={post.coverImage?.url}
                                            alt={post.coverImage?.alt || post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm border-none">
                                                {post.category?.name}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                            <span>📅 {new Date(post.date).toLocaleDateString()}</span>

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
                            <p className="text-gray-400 font-handwritten text-xl">{t('noPostsFound')}</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
