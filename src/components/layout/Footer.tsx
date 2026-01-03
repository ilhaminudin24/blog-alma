import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';
import { FooterClient } from './FooterClient';
import { getTranslations, getLocale } from 'next-intl/server';

interface SiteSettings {
    footerBrandName: string;
    footerTagline: string;
    footerQuickLinksTitle: string;
    footerQuickLinks: Array<{ label: string; href: string }>;
    footerConnectTitle: string;
    footerSocialLinks: Array<{ platform: string; url: string; bgColor: string }>;
    footerDmText: string;
    footerCopyrightPrefix: string;
    footerCopyrightSuffix: string;
}

// Default fallback values using translations
async function getDefaultFooterData(t: Awaited<ReturnType<typeof getTranslations<'footer'>>>) {
    return {
        brandName: 'my diary',
        tagline: t('tagline'),
        quickLinksTitle: t('quickLinks'),
        quickLinks: [
            { label: t('linkHome'), href: '/' },
            { label: t('linkCategories'), href: '/categories' },
            { label: t('linkAbout'), href: '/about' }
        ],
        connectTitle: t('connect'),
        socialLinks: [
            { platform: 'instagram', url: 'https://instagram.com', bgColor: '#f8bbd0' },
            { platform: 'twitter', url: 'https://twitter.com', bgColor: '#b2dfdb' }
        ],
        dmText: t('dmOpen'),
        copyrightPrefix: t('copyright'),
        copyrightSuffix: t('copyrightEnd')
    };
}

export async function Footer() {
    const locale = await getLocale();
    const t = await getTranslations('footer');

    // Fetch settings from Sanity
    let settings: SiteSettings | null = null;
    try {
        settings = await client.fetch(siteSettingsQuery, { language: locale });
    } catch (error) {
        console.error('Error fetching site settings for footer:', error);
    }

    // Use Sanity data or fallback to translations
    const footerData = settings?.footerBrandName
        ? {
            brandName: settings.footerBrandName,
            tagline: settings.footerTagline || t('tagline'),
            quickLinksTitle: settings.footerQuickLinksTitle || t('quickLinks'),
            quickLinks: settings.footerQuickLinks || [],
            connectTitle: settings.footerConnectTitle || t('connect'),
            socialLinks: settings.footerSocialLinks || [],
            dmText: settings.footerDmText || t('dmOpen'),
            copyrightPrefix: settings.footerCopyrightPrefix || t('copyright'),
            copyrightSuffix: settings.footerCopyrightSuffix || t('copyrightEnd')
        }
        : await getDefaultFooterData(t);

    return <FooterClient settings={footerData} />;
}
