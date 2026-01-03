import { client } from '@/sanity/lib/client'
import QnACard from '@/components/qna/QnACard'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Q&A | Ask Me Anything',
    description: 'Answering your curious questions about anything.',
}

export const revalidate = 60 // Revalidate every minute

export default async function QnAPage() {
    const qnas = await client.fetch(`
    *[_type == "qna" && defined(answer)] | order(publishedAt desc) {
      _id,
      question,
      answer,
      askerName,
      publishedAt
    }
  `)

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-handwritten mb-4 text-gray-800">
                        Ask Me Anything
                    </h1>
                    <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                        A safe space for your curiosity. Ask me about coding, life, design, or whatever pops into your mind.
                    </p>
                </header>

                {qnas.length > 0 ? (
                    <div className="space-y-8">
                        {qnas.map((qna: any) => (
                            <QnACard key={qna._id} item={qna} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/40 rounded-3xl border border-white/50 backdrop-blur-sm">
                        <p className="text-xl font-handwritten text-gray-400 mb-2">It's a bit quiet here...</p>
                        <p className="text-gray-500">Be the first to ask a question!</p>
                    </div>
                )}
            </div>
        </main>
    )
}
