
import { aboutData } from '@/data/about';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutContent } from '@/components/about/AboutContent';
import { AboutFavorites } from '@/components/about/AboutFavorites';
import { AboutGallery } from '@/components/about/AboutGallery';

export const metadata = {
    title: 'About Me | My Little Diary',
    description: 'Get to know Alma and her little world.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/20 to-white">
            {/* Background decorations matching the theme */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

            <main className="pt-24 pb-24">
                <AboutHero
                    greeting={aboutData.greeting}
                    role={aboutData.role}
                    intro={aboutData.introduction}
                />

                <AboutContent
                    story={aboutData.story}
                    funFacts={aboutData.funFacts}
                />

                <AboutFavorites favorites={aboutData.favorites} />

                <AboutGallery images={aboutData.gallery} />
            </main>
        </div>
    );
}
