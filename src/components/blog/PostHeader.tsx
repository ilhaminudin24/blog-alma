import { Post } from '@/data/types';
import { Badge, BadgeVariant } from '../ui/badge';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

function getBadgeVariant(category: { name?: string | null; slug?: string | null } | null | undefined): BadgeVariant {
    if (!category?.name) return 'default';
    if (category.name.includes('Makeup')) return 'makeup';
    if (category.name.includes('Hobbies')) return 'hobbies';
    if (category.name.includes('Lifestyle')) return 'lifestyle';
    if (category.name.includes('Daily')) return 'daily';
    return 'default';
}

export async function PostHeader({ post }: { post: Post }) {
    const t = await getTranslations('postHeader');



    // Construct the image URL based on watermark preference
    const imageUrl = post.coverImage?.showWatermark
        ? `/api/watermark?url=${encodeURIComponent(post.coverImage?.url)}`
        : post.coverImage?.url;

    return (
        <header className="mb-12 font-rounded text-center relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-pastel-lilac-darker mb-8 transition-colors font-sans text-sm font-medium group absolute left-0 top-0">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowLeft size={16} />
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">{t('home')}</span>
            </Link>

            <div className="pt-12">
                <div className="inline-block mb-4 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <Badge variant={getBadgeVariant(post.category)} className="text-sm px-4 py-1.5 shadow-sm border border-white/50">{post.category?.name}</Badge>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-[1.2] mb-6 tracking-tight font-rounded">
                    {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex items-center justify-center gap-4 md:gap-8 text-gray-500 mb-8 font-sans text-sm md:text-base flex-wrap">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-pastel-lilac-border" />
                        <span>{post.date}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-pastel-mint-border" />
                        <span>5 {t('minRead')}</span>
                    </div>

                </div>
            </div>

            {post.coverImage?.size === 'fullscreen' ? (
                <div className="w-full h-screen absolute top-0 left-0 -z-10 bg-gray-900/20">
                    <img src={imageUrl} alt={post.coverImage?.alt || post.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-white/90"></div>
                </div>
            ) : post.coverImage?.size === 'original' ? (
                <div
                    className="w-full rounded-[2.5rem] overflow-hidden shadow-lg relative bg-gray-50 border-4 border-white ring-1 ring-gray-100 group mx-auto"
                    style={{ aspectRatio: post.coverImage.aspectRatio }}
                >
                    <img src={imageUrl} alt={post.coverImage?.alt || post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
            ) : (
                <div className={`w-full rounded-[2.5rem] overflow-hidden shadow-lg relative bg-gray-50 border-4 border-white ring-1 ring-gray-100 group ${post.coverImage?.size === 'wide' ? 'aspect-[21/9]' : post.coverImage?.size === 'tall' ? 'aspect-[3/4] max-w-lg mx-auto' : 'aspect-video'
                    }`}>
                    <img src={imageUrl} alt={post.coverImage?.alt || post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
            )}
        </header>
    )
}
