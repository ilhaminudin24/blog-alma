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
        // Validate token exists
        if (!process.env.SANITY_API_TOKEN) {
            console.error('CRITICAL: SANITY_API_TOKEN is not set');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const body = await req.json();
        const { postId, increment } = body;

        if (!postId) {
            return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
        }

        // Determine increment value (default to +1)
        const incValue = increment === false ? -1 : 1;

        console.log('Attempting to patch document:', postId, 'with increment:', incValue);

        // Patch the document
        const updatedPost = await client
            .patch(postId)
            .setIfMissing({ likes: 0 })
            .inc({ likes: incValue })
            .commit();

        console.log('Successfully updated likes to:', updatedPost.likes);

        return NextResponse.json({
            likes: updatedPost.likes,
            message: incValue > 0 ? 'Liked successfully' : 'Unliked successfully'
        });
    } catch (error) {
        // Log detailed error for debugging
        console.error('Error updating likes:', {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            response: (error as any)?.response?.body || (error as any)?.responseBody
        });

        // Return more specific error for debugging
        return NextResponse.json({
            error: 'Failed to update likes',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

