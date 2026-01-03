/**
 * Migration script to create category documents and update posts to reference them.
 * 
 * Run with: node scripts/migrate-categories.mjs
 * 
 * IMPORTANT: You need to set SANITY_API_TOKEN environment variable:
 * $env:SANITY_API_TOKEN="your-token-here"; node scripts/migrate-categories.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'hh368yw9',
    dataset: 'production',
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
})

// Category data to migrate
const categories = [
    {
        nameId: 'Cerita Pribadi',
        nameEn: 'Personal Story',
        descriptionId: 'Cerita dan pengalaman hidupku. 📖',
        descriptionEn: 'My personal stories and life experiences. 📖',
        slug: 'personal-story',
        icon: 'book-open',
        color: 'yellow',
        order: 1,
        isSpecial: false,
        oldValue: 'Personal Story', // Used to match existing posts
    },
    {
        nameId: 'Gaya Hidup',
        nameEn: 'Lifestyle',
        descriptionId: 'Menciptakan hidup yang aku cintai, satu hari pada satu waktu. ✨',
        descriptionEn: 'Creating a life I love, one day at a time. ✨',
        slug: 'lifestyle',
        icon: 'coffee',
        color: 'pink',
        order: 2,
        isSpecial: false,
        oldValue: 'Lifestyle',
    },
    {
        nameId: 'Kecantikan & Perawatan',
        nameEn: 'Beauty & Care',
        descriptionId: 'Glowing dengan produk dan rutinitas favoritku. 💄',
        descriptionEn: 'Glow up with my favorite products and routines. 💄',
        slug: 'beauty-care',
        icon: 'sparkles',
        color: 'purple',
        order: 3,
        isSpecial: false,
        oldValue: 'Beauty & Care',
    },
    {
        nameId: 'Kreatif',
        nameEn: 'Creative',
        descriptionId: 'Hal-hal yang membuatku bahagia dan kreatif. 🎨',
        descriptionEn: 'Things that spark joy and creativity. 🎨',
        slug: 'creative',
        icon: 'palette',
        color: 'blue',
        order: 4,
        isSpecial: false,
        oldValue: 'Creative',
    },
    {
        nameId: 'Psikologi',
        nameEn: 'Psychology',
        descriptionId: 'Pemikiran tentang pikiran, emosi, dan perilaku manusia. 🧠',
        descriptionEn: 'Thoughts about the mind, emotions, and human behavior. 🧠',
        slug: 'psychology',
        icon: 'brain',
        color: 'green',
        order: 5,
        isSpecial: false,
        oldValue: 'Psychology',
    },
    {
        nameId: 'Tanya Jawab',
        nameEn: 'Q&A',
        descriptionId: 'Tanyakan apa saja! Aku siap menjawab. 💬',
        descriptionEn: 'Ask me anything! I\'m ready to answer. 💬',
        slug: 'qna',
        icon: 'message-circle-question',
        color: 'indigo',
        order: 6,
        isSpecial: true,
        specialHref: '/qna',
        oldValue: null, // No posts with this category
    },
]

async function migrateCategories() {
    console.log('🚀 Starting category migration...\n')

    const categoryIdMap = new Map() // Map old category value to new category _id

    // Step 1: Create category documents
    console.log('📁 Creating category documents...')
    for (const cat of categories) {
        try {
            // Check if category already exists
            const existing = await client.fetch(
                `*[_type == "category" && slug.current == $slug][0]`,
                { slug: cat.slug }
            )

            if (existing) {
                console.log(`  ⏭️  Skipping "${cat.nameEn}" (already exists)`)
                categoryIdMap.set(cat.oldValue, existing._id)
                continue
            }

            const doc = {
                _type: 'category',
                name: {
                    _type: 'localizedString',
                    id: cat.nameId,
                    en: cat.nameEn,
                },
                slug: {
                    _type: 'slug',
                    current: cat.slug,
                },
                description: {
                    _type: 'localizedText',
                    id: cat.descriptionId,
                    en: cat.descriptionEn,
                },
                icon: cat.icon,
                color: cat.color,
                order: cat.order,
                isSpecial: cat.isSpecial,
                ...(cat.specialHref && { specialHref: cat.specialHref }),
            }

            const result = await client.create(doc)
            console.log(`  ✅ Created "${cat.nameEn}" (${result._id})`)
            categoryIdMap.set(cat.oldValue, result._id)
        } catch (error) {
            console.error(`  ❌ Failed to create "${cat.nameEn}":`, error.message)
        }
    }

    console.log('\n📝 Updating posts to reference categories...')

    // Step 2: Get all posts with string category
    const posts = await client.fetch(`*[_type == "post" && defined(category) && !(_type == "reference")]`)

    let updated = 0
    let skipped = 0

    for (const post of posts) {
        const oldCategoryValue = post.category

        // Skip if already a reference
        if (typeof oldCategoryValue === 'object' && oldCategoryValue._ref) {
            skipped++
            continue
        }

        const newCategoryId = categoryIdMap.get(oldCategoryValue)

        if (!newCategoryId) {
            console.log(`  ⚠️  No matching category for post "${post.title?.id || post._id}" (category: "${oldCategoryValue}")`)
            skipped++
            continue
        }

        try {
            await client
                .patch(post._id)
                .set({
                    category: {
                        _type: 'reference',
                        _ref: newCategoryId,
                    },
                })
                .commit()
            console.log(`  ✅ Updated post: "${post.title?.id || post._id}"`)
            updated++
        } catch (error) {
            console.error(`  ❌ Failed to update post "${post._id}":`, error.message)
        }
    }

    console.log('\n✨ Migration complete!')
    console.log(`   Categories created: ${categories.length}`)
    console.log(`   Posts updated: ${updated}`)
    console.log(`   Posts skipped: ${skipped}`)
}

migrateCategories().catch(console.error)
