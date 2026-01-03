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
                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                    <div className="flex items-center gap-2 font-handwritten text-lg text-gray-600">
                        <span>{t('mood')}</span>
                        <span className="bg-yellow-50 px-2 py-0.5 transform -rotate-1 shadow-sm border border-yellow-100 rounded-sm">{post.mood}</span>
                    </div>
                </div>
            </div>

            <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-lg relative bg-gray-50 border-4 border-white ring-1 ring-gray-100 group">
                <img src={post.coverImage?.url} alt={post.coverImage?.alt || post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
        </header>
    )
}
