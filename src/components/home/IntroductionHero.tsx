import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';
import { IntroductionHeroClient } from './IntroductionHeroClient';
import { getTranslations, getLocale } from 'next-intl/server';

interface SiteSettings {
    heroTitle: string;
    heroSubtitle: string;
    heroChips: Array<{ emoji: string; text: string }>;
    heroPrimaryButton: { text: string; scrollTarget: string };
    heroSecondaryButton: { text: string; scrollTarget: string };
}

// Default fallback values using translations
async function getDefaultHeroData(t: Awaited<ReturnType<typeof getTranslations<'hero'>>>) {
    return {
        heroTitle: t('title'),
        heroSubtitle: t('subtitle'),
        heroChips: [
            { emoji: '📝', text: t('chip1').replace('📝 ', '') },
            { emoji: '💭', text: t('chip2').replace('💭 ', '') },
            { emoji: '💜', text: t('chip3').replace('💜 ', '') }
        ],
        heroPrimaryButton: { text: t('readMore'), scrollTarget: 'featured-posts' },
        heroSecondaryButton: { text: t('explore'), scrollTarget: 'categories' }
    };
}

export async function IntroductionHero() {
    const locale = await getLocale();
    const t = await getTranslations('hero');

    // Fetch settings from Sanity
    let settings: SiteSettings | null = null;
    try {
        settings = await client.fetch(siteSettingsQuery, { language: locale });
    } catch (error) {
        console.error('Error fetching site settings:', error);
    }

    // Use Sanity data or fallback to translations
    const heroData = settings?.heroTitle
        ? {
            title: settings.heroTitle,
            subtitle: settings.heroSubtitle || t('subtitle'),
            chips: settings.heroChips || [],
            primaryButton: settings.heroPrimaryButton || { text: t('readMore'), scrollTarget: 'featured-posts' },
            secondaryButton: settings.heroSecondaryButton || { text: t('explore'), scrollTarget: 'categories' }
        }
        : await getDefaultHeroData(t);

    return (
        <IntroductionHeroClient
            title={heroData.title}
            subtitle={heroData.subtitle}
            chips={heroData.chips}
            primaryButton={heroData.primaryButton}
            secondaryButton={heroData.secondaryButton}
        />
    );
}
