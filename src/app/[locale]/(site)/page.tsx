import { HeroSection } from '@/components/home/HeroSection';
import { IntroductionHero } from '@/components/home/IntroductionHero';
import { HighlightSection } from '@/components/home/HighlightSection';
import { RecentPosts } from '@/components/home/RecentPosts';


export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="min-h-screen">
      <IntroductionHero />
      <HeroSection language={locale} />
      <HighlightSection language={locale} />
      <RecentPosts language={locale} />
    </div>
  );
}
