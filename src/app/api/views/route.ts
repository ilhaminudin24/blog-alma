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

export async function POST(req: NextRequest) {
    try {
        // Validate token exists
        if (!process.env.SANITY_API_TOKEN) {
            console.error('CRITICAL: SANITY_API_TOKEN is not set');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const body = await req.json();
        const { postId } = body;

        if (!postId) {
            return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
        }

        console.log('Incrementing views for post:', postId);

        // Increment views count
        const updatedPost = await client
            .patch(postId)
            .setIfMissing({ views: 0 })
            .inc({ views: 1 })
            .commit();

        console.log('Successfully updated views to:', updatedPost.views);

        return NextResponse.json({
            views: updatedPost.views,
            message: 'View recorded successfully'
        });
    } catch (error) {
        console.error('Error updating views:', {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        });

        return NextResponse.json({
            error: 'Failed to update views',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
