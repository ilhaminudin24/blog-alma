import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hh368yw9',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN, // Needs write token
    useCdn: false,
})

/**
 * This script migrates posts to ensure EN content is populated.
 * If EN content is empty/missing, it copies ID content to EN.
 * This ensures fallback content works properly for both locales.
 */
const migrateEnContent = async () => {
    console.log('🔄 Starting EN content migration...')
    console.log(`Project ID: ${client.config().projectId}`)
    console.log(`Dataset: ${client.config().dataset}`)
    console.log('')
    console.log('ℹ️  This script ONLY updates existing posts - no duplicates will be created.')
    console.log('   It copies ID content to EN fields for posts missing EN content.')
    console.log('')

    try {
        const posts = await client.fetch(`*[_type == "post"]`)
        console.log(`Found ${posts.length} existing posts to check.`)

        const transaction = client.transaction()
        let patchCount = 0

        for (const post of posts) {
            console.log(`\n📝 Processing: ${post.title?.id || post.title || 'Untitled'}`)

            const patch = client.patch(post._id)
            const updates = {}

            // Title - copy ID to EN if EN is empty
            if (post.title && typeof post.title === 'object') {
                if (!post.title.en && post.title.id) {
                    console.log('  → Copying title ID to EN')
                    updates['title.en'] = post.title.id
                }
            }

            // Excerpt - copy ID to EN if EN is empty
            if (post.excerpt && typeof post.excerpt === 'object') {
                if (!post.excerpt.en && post.excerpt.id) {
                    console.log('  → Copying excerpt ID to EN')
                    updates['excerpt.en'] = post.excerpt.id
                }
            }

            // Content - copy ID to EN if EN is empty
            if (post.content && typeof post.content === 'object') {
                const hasEnContent = post.content.en && Array.isArray(post.content.en) && post.content.en.length > 0
                const hasIdContent = post.content.id && Array.isArray(post.content.id) && post.content.id.length > 0

                if (!hasEnContent && hasIdContent) {
                    console.log('  → Copying content ID to EN')
                    updates['content.en'] = post.content.id
                }
            }

            // Cover Image Alt - copy ID to EN if EN is empty
            if (post.coverImage?.alt && typeof post.coverImage.alt === 'object') {
                if (!post.coverImage.alt.en && post.coverImage.alt.id) {
                    console.log('  → Copying coverImage.alt ID to EN')
                    updates['coverImage.alt.en'] = post.coverImage.alt.id
                }
            }

            if (Object.keys(updates).length > 0) {
                patch.set(updates)
                transaction.patch(patch)
                patchCount++
                console.log(`  ✓ ${Object.keys(updates).length} field(s) will be updated`)
            } else {
                console.log('  ✓ No updates needed')
            }
        }

        if (patchCount > 0) {
            console.log(`\n🚀 Committing transaction for ${patchCount} documents...`)
            const res = await transaction.commit()
            console.log('✅ Migration successful!', res)
        } else {
            console.log('\n✅ All posts already have EN content. No migration needed.')
        }
    } catch (err) {
        console.error('❌ Migration failed:', err.message)
        console.error(err)
    }
}

migrateEnContent()
