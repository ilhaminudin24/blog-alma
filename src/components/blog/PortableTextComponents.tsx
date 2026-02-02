import type { PortableTextComponents as PortableTextComponentsType } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'

// Helper untuk extract YouTube/Vimeo ID
const getVideoId = (url: string) => {
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/)
    if (ytMatch) return { type: 'youtube', id: ytMatch[1] }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch) return { type: 'vimeo', id: vimeoMatch[1] }

    return null
}

export const PortableTextComponents: PortableTextComponentsType = {
    types: {
        // Existing image handler (kept for backward compatibility)
        image: ({ value }: any) => {
            if (!value?.asset?._ref) return null
            return (
                <div className="my-8 -mx-6 md:-mx-12">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Post Image'}
                        width={1200}
                        height={800}
                        className="w-full h-auto !rounded-none"
                        style={{ borderRadius: 0, boxShadow: 'none' }}
                    />
                </div>
            )
        },

        // NEW: Flexible Image with positioning
        flexibleImage: ({ value }: any) => {
            if (!value?.image?.asset?._ref) return null

            const positionClasses: Record<string, string> = {
                left: 'float-left mr-6 mb-4 clear-left',
                right: 'float-right ml-6 mb-4 clear-right',
                center: 'mx-auto clear-both',
                full: 'w-full clear-both',
            }

            const sizeClasses: Record<string, string> = {
                small: 'w-1/4',
                medium: 'w-1/2',
                large: 'w-3/4',
            }

            const position = value.position || 'center'
            const size = value.size || 'medium'
            const isFullWidth = position === 'full'

            return (
                <figure className={`my-8 ${positionClasses[position]} ${!isFullWidth ? sizeClasses[size] : ''}`}>
                    <div className="relative aspect-auto">
                        <Image
                            src={urlFor(value.image).url()}
                            alt={value.alt || 'Image'}
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            )
        },

        // NEW: Gallery
        gallery: ({ value }: any) => {
            if (!value?.images?.length) return null

            const layoutClasses: Record<string, string> = {
                'grid-2': 'grid grid-cols-2 gap-4',
                'grid-3': 'grid grid-cols-2 md:grid-cols-3 gap-4',
                'masonry': 'columns-2 md:columns-3 gap-4 space-y-4',
                'carousel': 'flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4',
            }

            const layout = value.layout || 'grid-2'

            return (
                <div className={`my-8 clear-both ${layoutClasses[layout]}`}>
                    {value.images.map((img: any, index: number) => (
                        <figure
                            key={img._key || index}
                            className={layout === 'carousel' ? 'flex-shrink-0 w-80 snap-center' : layout === 'masonry' ? 'break-inside-avoid mb-4' : ''}
                        >
                            <div className="relative">
                                <Image
                                    src={urlFor(img).url()}
                                    alt={img.alt || `Gallery image ${index + 1}`}
                                    width={400}
                                    height={300}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            {img.caption && (
                                <figcaption className="text-xs text-gray-500 mt-1 text-center">
                                    {img.caption}
                                </figcaption>
                            )}
                        </figure>
                    ))}
                </div>
            )
        },

        // NEW: Callout
        callout: ({ value }: any) => {
            const styles: Record<string, { bg: string; border: string; icon: string }> = {
                tip: { bg: 'bg-emerald-50', border: 'border-emerald-400', icon: '💡' },
                info: { bg: 'bg-blue-50', border: 'border-blue-400', icon: 'ℹ️' },
                warning: { bg: 'bg-amber-50', border: 'border-amber-400', icon: '⚠️' },
                caution: { bg: 'bg-red-50', border: 'border-red-400', icon: '❌' },
                success: { bg: 'bg-green-50', border: 'border-green-400', icon: '✅' },
            }

            const style = styles[value.type] || styles.info

            return (
                <div className={`my-8 p-6 rounded-2xl border-l-4 clear-both ${style.bg} ${style.border}`}>
                    <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">{style.icon}</span>
                        <div className="flex-1">
                            {value.title && (
                                <h4 className="font-bold text-gray-800 mb-2">{value.title}</h4>
                            )}
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{value.content}</p>
                        </div>
                    </div>
                </div>
            )
        },

        // NEW: Video Embed
        videoEmbed: ({ value }: any) => {
            const video = getVideoId(value.url)
            if (!video) return null

            const embedUrl = video.type === 'youtube'
                ? `https://www.youtube.com/embed/${video.id}`
                : `https://player.vimeo.com/video/${video.id}`

            return (
                <figure className="my-8 clear-both">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                        <iframe
                            src={embedUrl}
                            title={value.caption || 'Video'}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            )
        },

        // NEW: Code Block (from @sanity/code-input)
        code: ({ value }: any) => {
            return (
                <div className="my-8 rounded-2xl overflow-hidden shadow-md clear-both">
                    {value.filename && (
                        <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono">
                            {value.filename}
                        </div>
                    )}
                    <pre className="bg-gray-900 text-gray-100 p-6 overflow-x-auto">
                        <code className={`language-${value.language || 'text'} text-sm`}>
                            {value.code}
                        </code>
                    </pre>
                </div>
            )
        },

        // NEW: Divider
        divider: ({ value }: any) => {
            const dividers: Record<string, React.ReactNode> = {
                line: <hr className="border-t-2 border-gray-200" />,
                dots: <div className="text-center text-gray-400 tracking-[1em]">•••</div>,
                stars: <div className="text-center text-pastel-lilac tracking-[0.5em]">✦ ✦ ✦</div>,
                wave: <div className="text-center text-gray-300 text-2xl">〰️〰️〰️</div>,
                space: <div className="h-8" />,
            }

            return (
                <div className="my-12 clear-both">
                    {dividers[value.style] || dividers.line}
                </div>
            )
        },

        // Existing: Quote
        quote: ({ value }: any) => (
            <blockquote className="border-l-4 border-pastel-lilac pl-6 italic text-gray-500 font-handwritten text-xl my-8 clear-both">
                &ldquo;{value.text}&rdquo;
                {value.author && (
                    <footer className="text-sm font-sans mt-2 not-italic text-gray-400">
                        — {value.author}
                    </footer>
                )}
            </blockquote>
        ),

        // Existing: MoodBoard
        moodBoard: ({ value }: any) => {
            const getColorClasses = (color: string) => {
                const map: Record<string, string> = {
                    blue: 'bg-pastel-blue/20',
                    pink: 'bg-pastel-pink/20',
                    yellow: 'bg-pastel-yellow/20',
                    green: 'bg-pastel-mint/20',
                    purple: 'bg-pastel-lilac/20',
                }
                return map[color] || 'bg-gray-100'
            }

            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 my-8 clear-both">
                    {value.items?.map((item: any, index: number) => (
                        <div key={index} className={`${getColorClasses(item.color)} p-4 rounded-2xl`}>
                            <span className="block text-xs text-gray-500 font-bold uppercase mb-1">
                                {item.heading}
                            </span>
                            <span className="font-handwritten text-lg text-gray-700">{item.text}</span>
                        </div>
                    ))}
                </div>
            )
        },
    },

    block: {
        h1: ({ children }) => <h1 className="text-3xl font-bold font-handwritten mb-4 mt-8 clear-both">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold font-handwritten mb-3 mt-6 clear-both">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold font-handwritten mb-2 mt-4 clear-both">{children}</h3>,
        h4: ({ children }) => <h4 className="text-lg font-semibold mb-2 mt-4 clear-both">{children}</h4>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-pastel-lilac pl-4 italic text-gray-600 my-4 clear-both">
                {children}
            </blockquote>
        ),
        normal: ({ children }) => (
            <p className="mb-4 leading-relaxed font-sans text-gray-600">{children}</p>
        ),
    },

    marks: {
        // Links
        link: ({ children, value }) => (
            <a
                href={value.href}
                target={value.openInNewTab ? '_blank' : '_self'}
                rel={value.openInNewTab ? 'noopener noreferrer' : undefined}
                className="text-pastel-lilac-darker underline hover:text-pastel-lilac transition-colors"
            >
                {children}
            </a>
        ),
        internalLink: ({ children, value }) => (
            <Link
                href={`/blog/${value?.reference?.slug?.current || ''}`}
                className="text-pastel-lilac-darker underline hover:text-pastel-lilac transition-colors"
            >
                {children}
            </Link>
        ),
        // Decorators
        underline: ({ children }) => <span className="underline">{children}</span>,
        'strike-through': ({ children }) => <span className="line-through">{children}</span>,
        highlight: ({ children }) => (
            <mark className="bg-pastel-yellow/50 px-1 rounded">{children}</mark>
        ),
        code: ({ children }) => (
            <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono text-sm">
                {children}
            </code>
        ),
    },

    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
    },

    listItem: {
        bullet: ({ children }) => <li className="text-gray-600">{children}</li>,
        number: ({ children }) => <li className="text-gray-600">{children}</li>,
    },
}
