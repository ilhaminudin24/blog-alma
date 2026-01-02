import { HeroSection } from '@/components/home/HeroSection';
import { IntroductionHero } from '@/components/home/IntroductionHero';
import { HighlightSection } from '@/components/home/HighlightSection';
import { RecentPosts } from '@/components/home/RecentPosts';

export default function Home() {
  return (
    <div className="min-h-screen">
      <IntroductionHero />
      <HeroSection />
      <HighlightSection />
      <RecentPosts />
    </div>
  );
}
