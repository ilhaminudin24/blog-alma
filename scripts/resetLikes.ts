import { createClient } from 'next-sanity';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hh368yw9';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
    console.error('Error: SANITY_API_TOKEN is missing in .env.local');
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
});

async function resetLikes() {
    console.log('Fetching all posts...');
    const posts = await client.fetch(`*[_type == "post"]{_id, title, likes}`);

    console.log(`Found ${posts.length} posts. Resetting likes to 0...`);

    const transaction = client.transaction();

    posts.forEach((post: any) => {
        transaction.patch(post._id, (p) => p.set({ likes: 0 }));
    });

    try {
        const result = await transaction.commit();
        console.log('Success! Reset likes for all posts.');
        console.log(result);
    } catch (error) {
        console.error('Failed to reset likes:', error);
    }
}

resetLikes();
