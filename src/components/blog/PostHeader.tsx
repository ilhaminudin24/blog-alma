import { Post } from '@/data/types';
import { Badge, BadgeVariant } from '../ui/badge';
import { ArrowLeft, Clock, Calendar, Disc } from 'lucide-react';
import Link from 'next/link';

function getBadgeVariant(category: string): BadgeVariant {
    if (category.includes('Makeup')) return 'makeup';
    if (category.includes('Hobbies')) return 'hobbies';
    if (category.includes('Lifestyle')) return 'lifestyle';
    if (category.includes('Daily')) return 'daily';
    return 'default';
}

export function PostHeader({ post }: { post: Post }) {
    return (
        <header className="mb-12 font-rounded text-center relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-pastel-lilac-darker mb-8 transition-colors font-sans text-sm font-medium group absolute left-0 top-0">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowLeft size={16} />
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">Home</span>
            </Link>

            <div className="pt-12">
                <div className="inline-block mb-4 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <Badge variant={getBadgeVariant(post.category)} className="text-sm px-4 py-1.5 shadow-sm border border-white/50">{post.category}</Badge>
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
                        <span>5 min read</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                    <div className="flex items-center gap-2 font-handwritten text-lg text-gray-600">
                        <span>Mood:</span>
                        <span className="bg-yellow-50 px-2 py-0.5 transform -rotate-1 shadow-sm border border-yellow-100 rounded-sm">{post.mood}</span>
                    </div>
                </div>
            </div>

            <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-lg relative bg-gray-50 border-4 border-white ring-1 ring-gray-100 group">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                {post.music && (
                    <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
                        <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-gray-700 shadow-lg border border-white/50 flex items-center gap-3 hover:scale-105 transition-transform cursor-default">
                            <div className="relative">
                                <Disc size={20} className="animate-spin-slow text-pastel-lilac-darker" />
                                <div className="absolute inset-0 bg-pastel-lilac rounded-full blur-sm opacity-50"></div>
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-sans">Now Playing</span>
                                <span className="font-rounded leading-none">{post.music.title}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
