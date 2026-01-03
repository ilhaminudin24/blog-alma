import { client } from '@/sanity/lib/client'
import { Link } from '@/i18n/routing'
import { ArrowRight, MessageCircleQuestion } from 'lucide-react'
import QnACard from '@/components/qna/QnACard'
import { getTranslations } from 'next-intl/server'

export async function HomeQnA() {
    const t = await getTranslations('qna')
    const qnas = await client.fetch(`
    *[_type == "qna" && defined(answer)] | order(publishedAt desc) [0...2] {
      _id,
      question,
      answer,
      askerName,
      publishedAt
    }
  `)

    if (qnas.length === 0) return null

    return (
        <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-pastel-lilac/10 to-transparent">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-pastel-lilac font-bold tracking-wider text-sm uppercase mb-2 block">{t('sectionLabel')}</span>
                        <h2 className="text-4xl font-bold font-handwritten text-gray-800 flex items-center gap-3">
                            {t('title')} <MessageCircleQuestion className="text-pastel-lilac w-8 h-8" />
                        </h2>
                    </div>
                    <Link href="/qna" className="hidden md:flex items-center gap-2 text-gray-600 hover:text-pastel-lilac transition-colors font-medium">
                        {t('viewAll')} <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {qnas.map((qna: any) => (
                        <QnACard key={qna._id} item={qna} />
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/qna" className="inline-flex items-center gap-2 text-pastel-lilac hover:text-pastel-lilac/80 font-bold">
                        {t('viewAll')} <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

