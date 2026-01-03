
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // We need fresh data for writes
    token: process.env.SANITY_API_TOKEN,
})

export async function POST(req: Request) {
    try {
        const { _id, name, email, comment } = await req.json()

        if (!_id || !name || !comment) {
            return new Response(JSON.stringify({ message: 'Missing required fields' }), {
                status: 400,
            })
        }

        try {
            await client.create({
                _type: 'comment',
                post: {
                    _type: 'reference',
                    _ref: _id,
                },
                name,
                // email, // Optional: if we want to store email. Schema didn't have it, I'll skip or add if needed.
                // For now sticking to schema: name, content, post, approved.
                content: comment,
                approved: true, // Auto-approve for now
            })
        } catch (err) {
            console.error(err)
            return new Response(JSON.stringify({ message: 'Could not submit comment' }), {
                status: 500,
            })
        }

        return new Response(JSON.stringify({ message: 'Comment submitted' }), {
            status: 200,
        })
    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ message: 'Invalid request' }), {
            status: 400,
        })
    }
}
