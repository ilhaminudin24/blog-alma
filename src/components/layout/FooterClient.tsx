'use client';

import { Link } from '@/i18n/routing';
import { Sparkles, Heart, Coffee, Instagram, Twitter, Youtube, Facebook, Linkedin } from 'lucide-react';

// TikTok icon component (not in lucide-react)
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const platformIcons: Record<string, React.FC<{ size?: number }>> = {
    instagram: Instagram,
    twitter: Twitter,
    tiktok: TikTokIcon,
    youtube: Youtube,
    facebook: Facebook,
    linkedin: Linkedin,
};

interface QuickLink {
    label: string;
    href: string;
}

interface SocialLink {
    platform: string;
    url: string;
    bgColor: string;
}

interface FooterSettings {
    brandName: string;
    tagline: string;
    quickLinksTitle: string;
    quickLinks: QuickLink[];
    connectTitle: string;
    socialLinks: SocialLink[];
    dmText: string;
    copyrightPrefix: string;
    copyrightSuffix: string;
}

export function FooterClient({ settings }: { settings: FooterSettings }) {
    return (
        <footer className="bg-white border-t border-pastel-lilac/30 pt-16 pb-8 mt-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#9c27b0]/10 rounded-full flex items-center justify-center text-[#9c27b0]">
                                <Sparkles size={20} />
                            </div>
                            <h3 className="font-handwritten text-2xl text-gray-800">{settings.brandName}</h3>
                        </div>
                        <p className="text-gray-500 leading-relaxed text-sm max-w-xs">
                            {settings.tagline}
                        </p>
                    </div>

                    {/* Quick Links Column */}
                    <div className="md:pl-12">
                        <h3 className="font-handwritten text-2xl text-gray-800 mb-6">{settings.quickLinksTitle}</h3>
                        <ul className="space-y-3">
                            {settings.quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-500 hover:text-pastel-pink-border transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect Column */}
                    <div>
                        <h3 className="font-handwritten text-2xl text-gray-800 mb-6">{settings.connectTitle}</h3>
                        <div className="flex items-center gap-4 mb-4">
                            {settings.socialLinks.map((social, index) => {
                                const IconComponent = platformIcons[social.platform] || Instagram;
                                return (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                                        style={{ backgroundColor: social.bgColor }}
                                    >
                                        <IconComponent size={20} />
                                    </a>
                                );
                            })}
                        </div>
                        <p className="text-gray-400 text-sm">{settings.dmText}</p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} {settings.copyrightPrefix} <span className="text-pastel-pink inline-block animate-pulse">❤</span> {settings.copyrightSuffix}
                    </p>

                    <div className="flex items-center gap-3 opacity-80">
                        <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            <Coffee size={14} />
                        </span>
                        <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[#9c27b0]">
                            <Heart size={14} />
                        </span>
                        <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-orange-300">
                            <Sparkles size={14} />
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
