import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@/components/blog/PortableTextComponents'
import { User, MessageCircleQuestion } from 'lucide-react'

interface QnAItem {
    _id: string
    question: string
    answer: any
    askerName?: string
    publishedAt: string
}

export default function QnACard({ item }: { item: QnAItem }) {
    const date = new Date(item.publishedAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    return (
        <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
            {/* Question Section */}
            <div className="flex gap-4 items-start mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pastel-lilac/30 flex items-center justify-center text-purple-600">
                    <User size={20} />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-semibold text-gray-800 text-lg leading-snug">
                            {item.question}
                        </h3>
                    </div>
                    <div className="text-xs text-gray-400 font-medium">
                        Asked by {item.askerName || 'Guest'} • {date}
                    </div>
                </div>
            </div>

            {/* Answer Section */}
            {item.answer && (
                <div className="relative pl-14">
                    {/* Connector Line */}
                    <div className="absolute left-[19px] top-[-24px] bottom-0 w-[2px] bg-gradient-to-b from-pastel-lilac/30 to-transparent rounded-full" />

                    <div className="bg-white/50 rounded-2xl p-5 border border-white/60 relative">
                        <div className="absolute -left-3 top-4 w-3 h-3 bg-white border border-gray-100 rotate-45 transform" />
                        <div className="prose prose-sm prose-p:text-gray-600 max-w-none">
                            <PortableText value={item.answer} components={PortableTextComponents} />
                        </div>
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100/50">
                            <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                                <span className="text-[10px]">🦄</span>
                            </div>
                            <span className="text-xs font-handwritten text-gray-500">Answered by Alma</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
