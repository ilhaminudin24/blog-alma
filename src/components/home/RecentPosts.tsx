import { posts } from '@/data/posts';
import { Card } from '../ui/card';
import { Badge, BadgeVariant } from '../ui/badge';
import Link from 'next/link';

function getBadgeVariant(category: string): BadgeVariant {
    if (category.includes('Makeup')) return 'makeup';
    if (category.includes('Hobbies')) return 'hobbies';
    if (category.includes('Lifestyle')) return 'lifestyle';
    if (category.includes('Daily')) return 'daily';
    return 'default';
}

function getGridSpan(layout: string | undefined) {
    switch (layout) {
        case 'wide': return 'md:col-span-2';
        case 'tall': return 'md:row-span-2';
        default: return 'md:col-span-1';
    }
}

export function RecentPosts() {
    return (
        <section className="py-12 bg-white/50 border-t border-pastel-lilac/10">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mb-8">
                    <span className="text-2xl">✨</span>
                    <h2 className="text-2xl font-rounded font-bold text-gray-800">Latest Stories</h2>
                    <span className="text-2xl">📝</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-6">
                    {posts.map((post) => (
                        <Link
                            href={`/blog/${post.slug}`}
                            key={post.id}
                            className={`group ${getGridSpan(post.layout)}`}
                        >
                            <Card hoverEffect className="h-full relative overflow-hidden p-0 border-none bg-gray-50">
                                {/* Background Image with Overlay */}
                                <div className="absolute inset-0">
                                    <img src={post.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-90" />
                                </div>

                                <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                                    <div className="flex justify-between items-start">
                                        <Badge variant={getBadgeVariant(post.category)} className="bg-white/90 text-gray-800 border-none shadow-sm">{post.category}</Badge>
                                        {post.music && (
                                            <div className="text-[10px] bg-black/40 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 border border-white/10">
                                                <span>🎵</span> {post.music.mood} Shake
                                            </div>
                                        )}
                                    </div>

                                    <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center gap-2 text-xs text-gray-300 mb-2 opacity-80">
                                            <span>📅 {post.date}</span>
                                            <span>•</span>
                                            <span>{post.mood}</span>
                                        </div>
                                        <h3 className="text-xl font-bold font-rounded mb-2 leading-tight group-hover:text-pastel-lilac transition-colors drop-shadow-sm">{post.title}</h3>
                                        <p className="text-sm text-gray-200 line-clamp-2 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-75">{post.excerpt}</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
