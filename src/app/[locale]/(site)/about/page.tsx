import { client } from '@/sanity/lib/client';
import { aboutQuery } from '@/sanity/lib/queries';

import { AboutContent } from '@/components/about/AboutContent';
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata() {
    const t = await getTranslations('about');
    return {
        title: t('title') + ' | Ruang Cerita Alma',
        description: t('description'),
    };
}

interface StoryItem {
    text: string;
}

interface FunFact {
    icon: string;
    label: string;
    value: string;
}



interface AboutData {
    name: string;

    storyTitle: string;
    story: StoryItem[];
    funFactsTitle: string;
    funFacts: FunFact[];
}

export default async function AboutPage() {
    const locale = await getLocale();
    const about: AboutData | null = await client.fetch(aboutQuery, { language: locale });

    if (!about) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/20 to-white flex items-center justify-center">
                <p className="text-gray-500">About page not configured yet.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/20 to-white">
            {/* Background decorations matching the theme */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

            <main className="pt-24 pb-8">
                <AboutContent
                    storyTitle={about.storyTitle}
                    story={about.story.map((s) => s.text)}
                    funFactsTitle={about.funFactsTitle}
                    funFacts={about.funFacts}
                />

            </main>
        </div>
    );
}
