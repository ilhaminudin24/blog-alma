import { notFound } from 'next/navigation';
import { PostHeader } from '@/components/blog/PostHeader';
import { PostContent } from '@/components/blog/PostContent';
import { PostEngagement } from '@/components/blog/PostEngagement';
import { PostComments } from '@/components/blog/PostComments';
import { RecentPosts } from '@/components/home/RecentPosts';
import { client } from '@/sanity/lib/client';
import { postPathsQuery, postQuery, postCommentsQuery } from '@/sanity/lib/queries';
import { PortableText } from '@portabletext/react';
import { PortableTextComponents } from '@/components/blog/PortableTextComponents';
import { getTranslations } from 'next-intl/server';

// Static generation for all posts
// Static generation for all posts
export async function generateStaticParams() {
    const posts = await client.fetch(postPathsQuery);
    const { routing } = await import('@/i18n/routing');

    return posts.flatMap((post: any) =>
        routing.locales.map((locale) => ({
            slug: post.slug,
            locale: locale
        }))
    );
}

export default async function BlogPost({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { slug, locale } = await params;
    const post: any = await client.fetch(postQuery, { slug, language: locale });
    const t = await getTranslations({ locale, namespace: 'blog' });

    if (!post) {
        notFound();
    }

    // Fetch comments AFTER confirming post exists to avoid undefined postId
    const comments = await client.fetch(postCommentsQuery, { postId: post._id });

    return (
        <>
            <div className="container mx-auto px-4 py-8 lg:py-12 max-w-5xl">
                <PostHeader post={post} />

                <div className="bg-white60 backdrop-blur-sm rounded-[3rem] p-6 md:p-12 shadow-sm border border-white/50 relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pastel-lilac/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-pastel-mint/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

                    {/* Post Content with Portable Text */}
                    <article className="prose prose-lg prose-slate max-w-none font-sans prose-headings:font-handwritten prose-headings:font-normal prose-headings:text-gray-800 prose-p:text-gray-600 prose-p:leading-relaxed prose-img:rounded-3xl prose-img:shadow-md">
                        {Array.isArray(post.content) ? (
                            <PortableText value={post.content} components={PortableTextComponents} />
                        ) : (
                            // Fallback for migrated HTML content if any remains as string (migration script strips it but just in case)
                            <div dangerouslySetInnerHTML={{ __html: post.content as any }} />
                        )}
                    </article>

                    <div className="my-12 flex justify-center">
                        <div className="w-16 h-1 bg-gray-100 rounded-full"></div>
                    </div>

                    <p className="font-sans text-gray-600 mb-12 leading-relaxed italic text-center text-sm">
                        {t('thanksMessage')} 💜
                    </p>

                    <PostEngagement initialLikes={post.likes} postId={post._id} />
                    <PostComments postId={post._id} initialComments={comments} />
                </div>
            </div>

            <div className="mt-20 container mx-auto px-4 max-w-6xl">
                <h2 className="text-3xl font-handwritten text-gray-800 mb-8 flex items-center gap-2">
                    {t('relatedPosts')} ✨
                </h2>
                <RecentPosts language={locale} />
            </div>
        </>
    );
}
