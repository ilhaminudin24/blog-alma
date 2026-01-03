import { createClient } from '@sanity/client'
import 'dotenv/config'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hh368yw9'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN

if (!token) {
    console.error('Error: SANITY_API_TOKEN is missing.')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
})

async function inspect() {
    const post = await client.fetch(`*[_type == "post"][0]`)
    console.log(JSON.stringify(post, null, 2))
}

inspect().catch(console.error)
