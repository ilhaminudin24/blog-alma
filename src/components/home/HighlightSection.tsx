import { Card } from '../ui/card';
import { Link } from '@/i18n/routing';
import { Heart, MessageCircle } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { featuredPostsQuery } from '@/sanity/lib/queries';
import { getTranslations } from 'next-intl/server';

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
                    {featuredPosts.map((post: any) => (
                        <Link href={`/blog/${post.slug}`} key={post._id} className="group h-full">
                            <Card className="h-full flex flex-col border-[3px] border-pastel-lilac-border bg-white rounded-[2rem] p-0 overflow-hidden hover:shadow-sticker transition-all duration-300 hover:-translate-y-1">
                                {/* Image Area */}
                                <div className="bg-gradient-to-br from-pastel-lilac to-white p-6 relative h-48 flex items-center justify-center">
                                    <div className="flex justify-between items-center absolute top-4 left-4 right-4">
                                        <span className="text-xs font-bold text-purple-900">{post.category?.name}</span>
                                        {post.music && (
                                            <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-purple-800 flex items-center gap-1 shadow-sm border border-white">
                                                <span>🎵</span> {post.music.title}
                                            </div>
                                        )}
                                    </div>

                                    {/* Illustration Placeholder - Replacing real image for the 'clean' look */}
                                    <div className="text-6xl drop-shadow-md filter transition-transform group-hover:scale-110 duration-300">
                                        {post.category?.name?.includes('Makeup') ? '💄' : post.category?.name?.includes('Daily') ? '☕' : '🌸'}
                                    </div>
                                </div>

                                <div className="p-6 pt-4 flex flex-col flex-1">
                                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                                        <span>📅 {new Date(post.date).toLocaleDateString()}</span>

                                    </div>

                                    <h3 className="font-bold text-lg text-gray-800 mb-2 leading-tight group-hover:text-purple-600 transition-colors">{post.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed">{post.excerpt}</p>

                                    <div className="flex items-center gap-4 text-xs font-bold text-pink-500 mt-auto pt-4 border-t border-gray-100">
                                        <span className="flex items-center gap-1"><Heart size={16} className="fill-pink-500" /> {post.likes}</span>
                                        <span className="flex items-center gap-1 text-blue-500"><MessageCircle size={16} /> {t('comment')}</span>
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
