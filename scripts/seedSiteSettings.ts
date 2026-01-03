import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hh368yw9',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const siteSettings = {
    _type: 'siteSettings',
    _id: 'siteSettings', // Singleton ID

    // Hero Section
    heroTitle: {
        _type: 'localizedString',
        id: 'Selamat Datang di\nRuang Cerita Alma',
        en: 'Welcome to\nAlma\'s Story Space'
    },
    heroSubtitle: {
        _type: 'localizedString',
        id: 'Tempat berbagi cerita, bertumbuh bersama, dan menemukan teman curhat ✨',
        en: 'Where stories grow, hearts connect, and we learn together ✨'
    },
    heroChips: [
        {
            _key: 'chip1',
            emoji: '📝',
            text: { _type: 'localizedString', id: 'Cerita Pribadi', en: 'Personal Stories' }
        },
        {
            _key: 'chip2',
            emoji: '💭',
            text: { _type: 'localizedString', id: 'Tanya Jawab', en: 'Q&A Sessions' }
        },
        {
            _key: 'chip3',
            emoji: '💜',
            text: { _type: 'localizedString', id: 'Connect', en: 'Connect' }
        }
    ],
    heroPrimaryButton: {
        text: { _type: 'localizedString', id: 'Mulai Baca', en: 'Start Reading' },
        scrollTarget: 'featured-posts'
    },
    heroSecondaryButton: {
        text: { _type: 'localizedString', id: 'Jelajahi Kategori', en: 'Explore Categories' },
        scrollTarget: 'categories'
    },

    // Footer Section
    footerBrandName: {
        _type: 'localizedString',
        id: 'my diary',
        en: 'my diary'
    },
    footerTagline: {
        _type: 'localizedString',
        id: 'Ruang pribadiku untuk berbagi cerita, pengalaman, dan hal-hal random yang ada di kepala. Welcome to my little corner of the internet! 💜',
        en: 'My personal space to share stories, experiences, and random thoughts. Welcome to my little corner of the internet! 💜'
    },
    footerQuickLinksTitle: {
        _type: 'localizedString',
        id: 'Tautan Cepat',
        en: 'Quick Links'
    },
    footerQuickLinks: [
        {
            _key: 'link1',
            label: { _type: 'localizedString', id: 'Beranda', en: 'Home' },
            href: '/'
        },
        {
            _key: 'link2',
            label: { _type: 'localizedString', id: 'Kategori', en: 'Categories' },
            href: '/categories'
        },
        {
            _key: 'link3',
            label: { _type: 'localizedString', id: 'Tentang Aku', en: 'About Me' },
            href: '/about'
        }
    ],
    footerConnectTitle: {
        _type: 'localizedString',
        id: 'Yuk Temenan!',
        en: 'Let\'s Connect!'
    },
    footerSocialLinks: [
        {
            _key: 'social1',
            platform: 'instagram',
            url: 'https://instagram.com',
            bgColor: '#f8bbd0'
        },
        {
            _key: 'social2',
            platform: 'twitter',
            url: 'https://twitter.com',
            bgColor: '#b2dfdb'
        }
    ],
    footerDmText: {
        _type: 'localizedString',
        id: 'DM selalu terbuka untuk ngobrol! ✨',
        en: 'DM always open for a chat! ✨'
    },
    footerCopyrightPrefix: {
        _type: 'localizedString',
        id: 'My Diary. Dibuat dengan',
        en: 'My Diary. Made with'
    },
    footerCopyrightSuffix: {
        _type: 'localizedString',
        id: 'dan banyak kopi.',
        en: 'and lots of coffee.'
    }
}

async function seedSiteSettings() {
    console.log('🌱 Seeding Site Settings...')

    try {
        // Check if document already exists
        const existing = await client.fetch(`*[_type == "siteSettings"][0]`)

        if (existing) {
            console.log('⚠️  Site Settings already exists. Updating...')
            await client.createOrReplace(siteSettings)
            console.log('✅ Site Settings updated!')
        } else {
            await client.create(siteSettings)
            console.log('✅ Site Settings created!')
        }

        console.log('\n📝 Site Settings seeded successfully!')
        console.log('You can now edit the content in Sanity Studio.')
    } catch (error) {
        console.error('❌ Error seeding site settings:', error)
        process.exit(1)
    }
}

seedSiteSettings()
