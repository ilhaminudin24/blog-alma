import type { PortableTextComponents as PortableTextComponentsType } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

export const PortableTextComponents: PortableTextComponentsType = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <div className="relative w-full h-96 my-8 rounded-3xl overflow-hidden shadow-md">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Post Image'}
                        fill
                        className="object-cover"
                    />
                </div>
            )
        },
        quote: ({ value }: any) => {
            return (
                <blockquote className="border-l-4 border-pastel-lilac pl-6 italic text-gray-500 font-handwritten text-xl my-8">
                    "{value.text}"
                    {value.author && <footer className="text-sm font-sans mt-2 not-italic text-gray-400">- {value.author}</footer>}
                </blockquote>
            )
        },
        moodBoard: ({ value }: any) => {
            const getColorClasses = (color: string) => {
                const map: any = {
                    blue: 'bg-pastel-blue/20',
                    pink: 'bg-pastel-pink/20',
                    yellow: 'bg-pastel-yellow/20',
                    green: 'bg-pastel-mint/20',
                    purple: 'bg-pastel-lilac/20',
                }
                return map[color] || 'bg-gray-100'
            }

            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 my-8">
                    {value.items?.map((item: any, index: number) => (
                        <div key={index} className={`${getColorClasses(item.color)} p-4 rounded-2xl`}>
                            <span className="block text-xs text-gray-500 font-bold uppercase mb-1">{item.heading}</span>
                            <span className="font-handwritten text-lg text-gray-700">{item.text}</span>
                        </div>
                    ))}
                </div>
            )
        },
    },
    block: {
        h1: ({ children }) => <h1 className="text-3xl font-bold font-handwritten mb-4 mt-8">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold font-handwritten mb-3 mt-6">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold font-handwritten mb-2 mt-4">{children}</h3>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-pastel-lilac pl-4 italic text-gray-600 my-4">{children}</blockquote>,
        normal: ({ children }) => <p className="mb-4 leading-relaxed font-sans text-gray-600">{children}</p>,
    },
}
