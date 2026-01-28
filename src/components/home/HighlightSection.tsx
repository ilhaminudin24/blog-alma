import { Sticker } from '../ui/Sticker';
import { Badge, BadgeVariant } from '../ui/badge';
import { Link } from '@/i18n/routing';
import { Heart, MessageCircle } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { featuredPostsQuery } from '@/sanity/lib/queries';
import { getTranslations } from 'next-intl/server';

function getBadgeVariant(category: { name?: string | null; slug?: string | null } | null | undefined): BadgeVariant {
    if (!category?.name) return 'default';
    if (category.name.includes('Makeup')) return 'makeup';
    if (category.name.includes('Hobbies')) return 'hobbies';
    if (category.name.includes('Lifestyle')) return 'lifestyle';
    if (category.name.includes('Daily')) return 'daily';
    return 'default';
}

export async function HighlightSection({ language = 'id' }: { language?: string }) {
    const featuredPosts = await client.fetch(featuredPostsQuery, { language });
    const t = await getTranslations({ locale: language, namespace: 'highlight' });

    return (
        <section id="featured-posts" className="py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-2xl text-pink-500">📈</span>
                    <h2 className="text-2xl font-bold font-rounded text-purple-900">{t('title')}</h2>
                    <Heart className="text-pink-500 fill-pink-500 w-5 h-5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredPosts.map((post: any, index: number) => (
                        <Link href={`/blog/${post.slug}`} key={post._id} className="group h-full block">
                            <Sticker
                                rotation={index % 2 === 0 ? -1 : 1}
                                className="h-full relative overflow-hidden p-0 bg-gray-50 h-[300px]"
                                borderWidth="border-[3px]"
                                borderColor="border-white"
                                shadow="shadow-md hover:shadow-sticker"
                            >
                                {/* Background Image with Overlay */}
                                <div className="absolute inset-0">
                                    <img src={post.coverImage?.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.coverImage?.alt || post.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-90" />
                                </div>

                                <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                                    <div className="flex justify-between items-start">
                                        <Badge variant={getBadgeVariant(post.category)} className="bg-white/90 text-gray-800 border-none shadow-sm">{post.category?.name}</Badge>
                                        {post.music && (
                                            <div className="text-[10px] bg-black/40 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 border border-white/10">
                                                <span>🎵</span> {post.music.title}
                                            </div>
                                        )}
                                    </div>

                                    <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center gap-2 text-xs text-gray-300 mb-2 opacity-80">
                                            <span>📅 {new Date(post.date).toLocaleDateString()}</span>
                                        </div>

                                        <h3 className="text-xl font-bold font-rounded mb-2 leading-tight group-hover:text-pastel-lilac transition-colors drop-shadow-sm">{post.title}</h3>
                                        <p className="text-sm text-gray-200 line-clamp-2 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-75">{post.excerpt}</p>

                                        <div className="flex items-center gap-4 text-xs font-bold text-pink-300 mt-4 pt-2 border-t border-white/10">
                                            <span className="flex items-center gap-1"><Heart size={16} className="fill-pink-500 text-pink-500" /> {post.likes}</span>
                                            <span className="flex items-center gap-1 text-blue-300"><MessageCircle size={16} /> {t('comment')}</span>
                                        </div>
                                    </div>
                                </div>
                            </Sticker>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
