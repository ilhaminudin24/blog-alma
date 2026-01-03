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

const migrate = async () => {
    console.log('Fetching posts...')
    console.log(`Project ID: ${client.config().projectId}`)
    console.log(`Dataset: ${client.config().dataset}`)

    try {
        const posts = await client.fetch(`*[_type == "post"]`)
        console.log(`Found ${posts.length} posts to migrate.`)

        const transaction = client.transaction()
        let patchCount = 0

        for (const post of posts) {
            console.log(`Processing: ${post.title}`)

            const patch = client.patch(post._id)
            const updates = {}

            // Title
            if (typeof post.title === 'string') {
                updates['title'] = {
                    _type: 'localizedString',
                    id: post.title,
                    en: ''
                }
            }

            // Excerpt
            if (typeof post.excerpt === 'string') {
                updates['excerpt'] = {
                    _type: 'localizedText',
                    id: post.excerpt,
                    en: ''
                }
            }

            // Content
            if (Array.isArray(post.content) && !post.content._type) {
                // Check if it's already localized (it would be an object with _type: localizedBlock)
                // Arrays don't have _type property directly usually unless it's an object wrapping it.
                // If post.content is an ARRAY, it is the OLD format. 
                // If post.content is an OBJECT with _type 'localizedBlock', it is NEW format.
                updates['content'] = {
                    _type: 'localizedBlock',
                    id: post.content,
                    en: []
                }
            }

            // Cover Image Alt
            if (post.coverImage && typeof post.coverImage.alt === 'string') {
                updates['coverImage.alt'] = {
                    _type: 'localizedString',
                    id: post.coverImage.alt,
                    en: ''
                }
            }

            if (Object.keys(updates).length > 0) {
                patch.set(updates)
                transaction.patch(patch)
                patchCount++
            }
        }

        if (patchCount > 0) {
            console.log(`Committing transaction for ${patchCount} documents...`)
            const res = await transaction.commit()
            console.log('Migration successful!', res)
        } else {
            console.log('No posts needed migration.')
        }
    } catch (err) {
        console.error('Migration failed:', err.message)
        // Print full error if possible
        console.error(err)
    }
}

migrate()
