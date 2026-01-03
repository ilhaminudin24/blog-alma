/**
 * Migration script to create About page document in Sanity.
 * 
 * Run with: node scripts/migrate-about.mjs
 * 
 * IMPORTANT: You need to set SANITY_API_TOKEN environment variable:
 * $env:SANITY_API_TOKEN="your-token-here"; node scripts/migrate-about.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'hh368yw9',
    dataset: 'production',
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
})

// Current hardcoded data (with Indonesian translations added)
const aboutData = {
    name: "Alma",
    role: {
        id: "Pemimpi & Penulis Cerita",
        en: "Daydreamer & Storyteller"
    },
    greeting: {
        id: "Halo, Jiwa yang Cantik! ✨",
        en: "Hello, Beautiful Soul! ✨"
    },
    introduction: {
        id: "Aku Alma, hanya seorang gadis yang suka mengubah momen biasa menjadi kenangan ajaib. Selamat datang di sudut kecil internetku.",
        en: "I'm Alma, just a girl who loves turning ordinary moments into magical memories. Welcome to my little corner of the internet."
    },
    storyTitle: {
        id: "Ceritaku",
        en: "My Little Story"
    },
    story: [
        {
            id: "Sejak kecil, aku sudah tertarik dengan menulis buku harian. Ada sesuatu yang ajaib tentang membekukan momen dengan tinta dan kertas.",
            en: "Ever since I was little, I've had a fascination with keeping diaries. There's something magical about freezing a moment in time with just ink and paper."
        },
        {
            id: "Blog ini adalah perpanjangan dari kecintaan itu—taman digital tempat aku menanam pikiran, menyiraminya dengan kreativitas, dan melihatnya mekar.",
            en: "This blog is an extension of that love—a digital garden where I plant my thoughts, water them with creativity, and watch them bloom."
        },
        {
            id: "Ketika tidak menulis, kamu bisa menemukanku menjelajahi kafe-kafe nyaman, membaca novel fantasi, atau mencoba memanggang kue cokelat yang sempurna (penekanan pada 'mencoba'!).",
            en: "When I'm not writing, you can find me exploring cozy cafes, reading fantasy novels, or trying to bake the perfect batch of chocolate chip cookies (emphasis on 'trying'!)."
        }
    ],
    funFactsTitle: {
        id: "Fakta Menarik",
        en: "Fun Facts"
    },
    funFacts: [
        {
            icon: "☕",
            label: { id: "Pesanan Kopi", en: "Coffee Order" },
            value: { id: "Oat Milk Vanilla Latte", en: "Oat Milk Vanilla Latte" }
        },
        {
            icon: "🐾",
            label: { id: "Hewan Spiritual", en: "Spirit Animal" },
            value: { id: "Kucing yang mengantuk", en: "A sleepy cat" }
        },
        {
            icon: "🎨",
            label: { id: "Warna Favorit", en: "Favorite Color" },
            value: { id: "Lilac Pastel", en: "Pastel Lilac" }
        },
        {
            icon: "✈️",
            label: { id: "Destinasi Impian", en: "Dream Destination" },
            value: { id: "Kyoto, Jepang", en: "Kyoto, Japan" }
        },
    ],
    favoritesTitle: {
        id: "Hal-hal yang Aku Suka",
        en: "Things I Love"
    },
    favorites: [
        {
            category: { id: "Buku", en: "Books" },
            items: [
                { id: "The Little Prince", en: "The Little Prince" },
                { id: "Kafka on the Shore", en: "Kafka on the Shore" },
                { id: "Harry Potter", en: "Harry Potter" }
            ],
            color: "bg-pastel-blue"
        },
        {
            category: { id: "Musik", en: "Music" },
            items: [
                { id: "Lo-fi Beats", en: "Lo-fi Beats" },
                { id: "Indie Pop", en: "Indie Pop" },
                { id: "Piano Klasik", en: "Classical Piano" }
            ],
            color: "bg-pastel-pink"
        },
        {
            category: { id: "Hobi", en: "Hobbies" },
            items: [
                { id: "Menulis Jurnal", en: "Journaling" },
                { id: "Fotografi", en: "Photography" },
                { id: "Melihat Bintang", en: "Stargazing" }
            ],
            color: "bg-pastel-lilac"
        }
    ],
    gallery: [
        {
            src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2000&auto=format&fit=crop",
            alt: { id: "Sudut baca yang nyaman", en: "A cozy reading corner" },
            caption: { id: "Tempat bahagiaku 📚", en: "My happy place 📚" }
        },
        {
            src: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=2000&auto=format&fit=crop",
            alt: { id: "Menulis jurnal di kafe", en: "Journaling in a cafe" },
            caption: { id: "Merencanakan mimpi besar ✍️", en: "Planning big dreams ✍️" }
        },
        {
            src: "https://images.unsplash.com/photo-1490481638943-ddcdcf6287ef?q=80&w=2000&auto=format&fit=crop",
            alt: { id: "Bunga di bawah sinar matahari", en: "Flowers in sunlight" },
            caption: { id: "Kebahagiaan kecil 🌸", en: "Little joys 🌸" }
        }
    ]
}

async function uploadImage(url) {
    try {
        console.log(`  📷 Uploading image from: ${url.substring(0, 50)}...`)
        const response = await fetch(url)
        const buffer = await response.arrayBuffer()
        const imageAsset = await client.assets.upload('image', Buffer.from(buffer), {
            filename: url.split('/').pop().split('?')[0] + '.jpg',
        })
        return imageAsset._id
    } catch (error) {
        console.error(`  ❌ Failed to upload image:`, error.message)
        return null
    }
}

async function migrateAbout() {
    console.log('🚀 Starting About page migration...\n')

    // Check if About document already exists
    const existing = await client.fetch(`*[_type == "about"][0]`)
    if (existing) {
        console.log('⚠️  About document already exists. Skipping migration.')
        console.log('   To re-migrate, delete the existing document first.')
        return
    }

    // Upload gallery images
    console.log('📷 Uploading gallery images...')
    const galleryWithAssets = []
    for (const img of aboutData.gallery) {
        const assetId = await uploadImage(img.src)
        if (assetId) {
            galleryWithAssets.push({
                _type: 'image',
                _key: Math.random().toString(36).substring(7),
                asset: { _type: 'reference', _ref: assetId },
                alt: { _type: 'localizedString', ...img.alt },
                caption: { _type: 'localizedString', ...img.caption },
            })
        }
    }

    // Create About document
    console.log('\n📝 Creating About document...')
    const doc = {
        _type: 'about',
        name: aboutData.name,
        role: { _type: 'localizedString', ...aboutData.role },
        greeting: { _type: 'localizedString', ...aboutData.greeting },
        introduction: { _type: 'localizedText', ...aboutData.introduction },
        storyTitle: { _type: 'localizedString', ...aboutData.storyTitle },
        story: aboutData.story.map(s => ({
            _type: 'localizedText',
            _key: Math.random().toString(36).substring(7),
            ...s
        })),
        funFactsTitle: { _type: 'localizedString', ...aboutData.funFactsTitle },
        funFacts: aboutData.funFacts.map(f => ({
            _type: 'object',
            _key: Math.random().toString(36).substring(7),
            icon: f.icon,
            label: { _type: 'localizedString', ...f.label },
            value: { _type: 'localizedString', ...f.value },
        })),
        favoritesTitle: { _type: 'localizedString', ...aboutData.favoritesTitle },
        favorites: aboutData.favorites.map(f => ({
            _type: 'object',
            _key: Math.random().toString(36).substring(7),
            category: { _type: 'localizedString', ...f.category },
            items: f.items.map(i => ({
                _type: 'localizedString',
                _key: Math.random().toString(36).substring(7),
                ...i
            })),
            color: f.color,
        })),
        gallery: galleryWithAssets,
    }

    try {
        const result = await client.create(doc)
        console.log(`✅ Created About document (${result._id})`)
    } catch (error) {
        console.error('❌ Failed to create About document:', error.message)
    }

    console.log('\n✨ Migration complete!')
}

migrateAbout().catch(console.error)
