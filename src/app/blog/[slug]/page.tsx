import { notFound } from 'next/navigation';
import { posts } from '@/data/posts';
import { PostHeader } from '@/components/blog/PostHeader';
import { PostContent } from '@/components/blog/PostContent';
import { PostEngagement } from '@/components/blog/PostEngagement';
import { PostComments } from '@/components/blog/PostComments';
import { RecentPosts } from '@/components/home/RecentPosts';

// Static generation for all posts
export async function generateStaticParams() {
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8 lg:py-12 max-w-5xl">
                <PostHeader post={post} />

                <div className="bg-white60 backdrop-blur-sm rounded-[3rem] p-6 md:p-12 shadow-sm border border-white/50 relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pastel-lilac/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-pastel-mint/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

                    <PostContent content={post.content} />

                    <div className="my-12 flex justify-center">
                        <div className="w-16 h-1 bg-gray-100 rounded-full"></div>
                    </div>

                    <blockquote className="border-l-4 border-pastel-lilac pl-6 italic text-gray-500 font-handwritten text-xl my-8">
                        "Small days are just normal occurrences, good coffee, and pages in GT with zero thoughts."
                    </blockquote>

                    {/* Additional Rambling Section (Static for now to match mockup style) */}
                    <p className="font-sans text-gray-600 mb-8 leading-relaxed">
                        Kalau kamu juga lagi nyari tempat healing, I really recommend finding your own little spot. Nggak harus fancy atau mahal - yang penting vibes-nya bikin kamu nyaman untuk jadi diri sendiri.
                    </p>

                    {/* Mood Board Mini Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                        <div className="bg-pastel-blue/20 p-4 rounded-2xl">
                            <span className="block text-xs text-gray-500 font-bold uppercase mb-1">Coffee Consumed</span>
                            <span className="font-handwritten text-lg text-gray-700">Taking breaks is valid too, it's necessary. ☕</span>
                        </div>
                        <div className="bg-pastel-pink/20 p-4 rounded-2xl">
                            <span className="block text-xs text-gray-500 font-bold uppercase mb-1">Grateful For</span>
                            <span className="font-handwritten text-lg text-gray-700">Good Wi-Fi & cozy corners ✨</span>
                        </div>
                        <div className="bg-pastel-yellow/20 p-4 rounded-2xl">
                            <span className="block text-xs text-gray-500 font-bold uppercase mb-1">Current Mood</span>
                            <span className="font-handwritten text-lg text-gray-700">Peaceful & content 💛</span>
                        </div>
                    </div>

                    <p className="font-sans text-gray-600 mb-12 leading-relaxed">
                        Anyway, that's all for today's rambling. Terima kasih udah mampir dan baca sampai sini! See you in the next post! 💜
                    </p>

                    <PostEngagement initialLikes={post.likes} />
                    <PostComments />
                </div>
            </div>

            <div className="mt-20 container mx-auto px-4 max-w-6xl">
                <h2 className="text-3xl font-handwritten text-gray-800 mb-8 flex items-center gap-2">
                    Baca juga ✨
                </h2>
                <RecentPosts />
            </div>
        </>
    );
}
