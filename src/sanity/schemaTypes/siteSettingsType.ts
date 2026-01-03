import { defineType, defineField } from 'sanity'

export const siteSettingsType = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero Section' },
        { name: 'footer', title: 'Footer Section' },
        { name: 'qna', title: 'Q&A Widget' },
    ],
    fields: [
        // ==================== Q&A WIDGET ====================
        defineField({
            name: 'showAskWidget',
            title: 'Show "Ask Me Anything" Widget',
            description: 'Toggle to show or hide the floating Q&A widget on the website',
            type: 'boolean',
            initialValue: true,
            group: 'qna',
        }),

        // ==================== HERO SECTION ====================
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            description: 'Main title displayed on the hero section. Use \\n for line breaks.',
            type: 'localizedString',
            group: 'hero',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            description: 'Subtitle/description below the main title',
            type: 'localizedString',
            group: 'hero',
        }),
        defineField({
            name: 'heroChips',
            title: 'Hero Highlight Chips',
            description: 'Small highlight chips displayed below the subtitle',
            type: 'array',
            group: 'hero',
            of: [{
                type: 'object',
                fields: [
                    { name: 'emoji', title: 'Emoji', type: 'string' },
                    { name: 'text', title: 'Text', type: 'localizedString' },
                ],
                preview: {
                    select: { emoji: 'emoji', text: 'text.id' },
                    prepare: ({ emoji, text }) => ({
                        title: `${emoji} ${text}`,
                    }),
                },
            }],
        }),
        defineField({
            name: 'heroPrimaryButton',
            title: 'Primary Button (CTA)',
            type: 'object',
            group: 'hero',
            fields: [
                { name: 'text', title: 'Button Text', type: 'localizedString' },
                {
                    name: 'scrollTarget',
                    title: 'Scroll Target ID',
                    description: 'HTML element ID to scroll to (e.g., featured-posts)',
                    type: 'string',
                },
            ],
        }),
        defineField({
            name: 'heroSecondaryButton',
            title: 'Secondary Button',
            type: 'object',
            group: 'hero',
            fields: [
                { name: 'text', title: 'Button Text', type: 'localizedString' },
                {
                    name: 'scrollTarget',
                    title: 'Scroll Target ID',
                    description: 'HTML element ID to scroll to (e.g., categories)',
                    type: 'string',
                },
            ],
        }),

        // ==================== FOOTER SECTION ====================
        defineField({
            name: 'footerBrandName',
            title: 'Brand Name',
            description: 'Brand name displayed in footer',
            type: 'localizedString',
            group: 'footer',
        }),
        defineField({
            name: 'footerTagline',
            title: 'Footer Tagline',
            description: 'Description/tagline text below the brand',
            type: 'localizedString',
            group: 'footer',
        }),
        defineField({
            name: 'footerQuickLinksTitle',
            title: 'Quick Links Section Title',
            type: 'localizedString',
            group: 'footer',
        }),
        defineField({
            name: 'footerQuickLinks',
            title: 'Quick Links',
            type: 'array',
            group: 'footer',
            of: [{
                type: 'object',
                fields: [
                    { name: 'label', title: 'Link Label', type: 'localizedString' },
                    { name: 'href', title: 'Link URL', type: 'string' },
                ],
                preview: {
                    select: { title: 'label.id', href: 'href' },
                    prepare: ({ title, href }) => ({
                        title: title,
                        subtitle: href,
                    }),
                },
            }],
        }),
        defineField({
            name: 'footerConnectTitle',
            title: 'Connect Section Title',
            type: 'localizedString',
            group: 'footer',
        }),
        defineField({
            name: 'footerSocialLinks',
            title: 'Social Media Links',
            type: 'array',
            group: 'footer',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'platform',
                        title: 'Platform',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'Instagram', value: 'instagram' },
                                { title: 'Twitter/X', value: 'twitter' },
                                { title: 'TikTok', value: 'tiktok' },
                                { title: 'YouTube', value: 'youtube' },
                                { title: 'Facebook', value: 'facebook' },
                                { title: 'LinkedIn', value: 'linkedin' },
                            ],
                        },
                    },
                    { name: 'url', title: 'Profile URL', type: 'url' },
                    {
                        name: 'bgColor',
                        title: 'Background Color',
                        description: 'Hex color for the icon background (e.g., #f8bbd0)',
                        type: 'string',
                    },
                ],
                preview: {
                    select: { platform: 'platform', url: 'url' },
                    prepare: ({ platform, url }) => ({
                        title: platform?.charAt(0).toUpperCase() + platform?.slice(1),
                        subtitle: url,
                    }),
                },
            }],
        }),
        defineField({
            name: 'footerDmText',
            title: 'DM Open Text',
            description: 'Text below social links (e.g., "DM always open...")',
            type: 'localizedString',
            group: 'footer',
        }),
        defineField({
            name: 'footerCopyrightPrefix',
            title: 'Copyright Prefix',
            description: 'Text before the year and heart (e.g., "My Diary. Made with")',
            type: 'localizedString',
            group: 'footer',
        }),
        defineField({
            name: 'footerCopyrightSuffix',
            title: 'Copyright Suffix',
            description: 'Text after the heart (e.g., "and lots of coffee.")',
            type: 'localizedString',
            group: 'footer',
        }),
    ],
    preview: {
        prepare: () => ({
            title: 'Site Settings',
            subtitle: 'Hero & Footer Configuration',
        }),
    },
})
