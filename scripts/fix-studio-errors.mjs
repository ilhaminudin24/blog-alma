import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hh368yw9'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN

if (!token) {
    console.error('Error: SANITY_API_TOKEN or SANITY_AUTH_TOKEN is missing.')
    console.error('Try running with: npx sanity exec scripts/fix-studio-errors.mjs --with-user-token')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
})

async function fixData() {
    console.log('Starting data fix...')

    // Fetch all posts
    const posts = await client.fetch(`*[_type == "post"]`)
    console.log(`Found ${posts.length} posts.`)

    for (const post of posts) {
        console.log(`Checking post: ${post.title}`)
        const patches = client.patch(post._id)
        let hasChanges = false

        // 1. Remove publishedAt if it exists
        if (post.publishedAt) {
            console.log(`  - Removing publishedAt`)
            patches.unset(['publishedAt'])
            hasChanges = true
        }

        // 2. Add missing _keys to content blocks
        if (post.content && Array.isArray(post.content)) {
            const newContent = post.content.map(block => {
                const newBlock = { ...block }
                if (!newBlock._key) {
                    newBlock._key = uuidv4()
                    console.log(`  - Added key to block`)
                    hasChanges = true
                }

                if (newBlock.children && Array.isArray(newBlock.children)) {
                    newBlock.children = newBlock.children.map(child => {
                        const newChild = { ...child }
                        if (!newChild._key) {
                            newChild._key = uuidv4()
                            console.log(`  - Added key to span`)
                            hasChanges = true
                        }
                        return newChild
                    })
                }
                return newBlock
            })

            // Only update if we detected changes in the mapping process (keys added)
            // But since we can't easily track "hasChanges" inside map without side effects, 
            // lets just compare JSON string or rely on the logic that if we found missing keys we set hasChanges.
            // Actually, to be safe, if we are in this block, we should verify if any keys were actually missing.
            // For simplicity, let's just always update content if we suspect issues, or better:
            // Check if any block or child was missing a key.
            const needsUpdate = post.content.some(b => !b._key || (b.children && b.children.some(c => !c._key)))

            if (needsUpdate) {
                patches.set({ content: newContent })
                hasChanges = true
            }
        }

        if (hasChanges) {
            await patches.commit()
            console.log(`  -> Saved changes for ${post.title}`)
        } else {
            console.log(`  -> No changes needed.`)
        }
    }

    console.log('Fix complete!')
}

fixData().catch(console.error)
