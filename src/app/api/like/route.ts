import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // We must not use CDN for writes
    token: process.env.SANITY_API_TOKEN,
});

// Debug logging
console.log('API Route loaded.');
console.log('Sanity Project ID:', projectId);
console.log('Sanity Dataset:', dataset);
console.log('Token exists:', !!process.env.SANITY_API_TOKEN);
if (process.env.SANITY_API_TOKEN) {
    console.log('Token prefix:', process.env.SANITY_API_TOKEN.substring(0, 5) + '...');
} else {
    console.error('CRITICAL: SANITY_API_TOKEN is missing!');
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { postId, increment } = body;

        if (!postId) {
            return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
        }

        // Determine increment value (default to +1)
        const incValue = increment === false ? -1 : 1;

        // Patch the document
        const updatedPost = await client
            .patch(postId)
            .setIfMissing({ likes: 0 })
            .inc({ likes: incValue })
            .commit();

        return NextResponse.json({
            likes: updatedPost.likes,
            message: incValue > 0 ? 'Liked successfully' : 'Unliked successfully'
        });
    } catch (error) {
        console.error('Error updating likes:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
