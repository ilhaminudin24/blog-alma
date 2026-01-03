import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config'

// Mock Data (Copy-pasted for simplicity in script)
const musicLibrary = [
    {
        id: '1',
        title: 'Sunday Morning',
        artist: 'Lofi Chill',
        src: '/music/sunday.mp3',
        mood: 'Relaxed',
        category: 'Daily Life',
    },
    {
        id: '2',
        title: 'Upbeat Pop',
        artist: 'Happy Vibez',
        src: '/music/pop.mp3',
        mood: 'Excited',
        category: 'Makeup & Skincare',
    },
    {
        id: '3',
        title: 'Dreamy Piano',
        artist: 'Sleepy Cat',
        src: '/music/dreamy.mp3',
        mood: 'Creative',
        category: 'Hobbies',
    },
    {
        id: '4',
        title: 'Soft Acoustic',
        artist: 'Folk Soul',
        src: '/music/acoustic.mp3',
        mood: 'Grateful',
        category: 'Lifestyle',
    },
    {
        id: '5',
        title: 'Lofi Chill Beats',
        artist: 'Study Girl',
        src: '/music/lofi.mp3',
        mood: 'Relaxed',
    },
    {
        id: '6',
        title: 'Indie Mix',
        artist: 'Sunset Lover',
        src: '/music/indie.mp3',
        mood: 'Nostalgic',
    }
];

const posts = [
    {
        id: '1',
        slug: 'my-skincare-journey',
        title: 'My Skincare Journey: From Acne to Glowing Skin ✨',
        excerpt: 'My journey from acne to glowing skin using a simple, consistent skincare routine.',
        coverImage: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2070&auto=format&fit=crop',
        date: '2 Jan 2026',
        category: 'Makeup & Skincare',
        mood: 'Happy',
        musicId: '2',
        content: '<p>Skincare is self-care...</p>',
        featured: true,
        likes: 124,
        layout: 'wide'
    },
    {
        id: '5',
        slug: 'natural-makeup-look',
        title: 'Makeup Tutorial: Natural Glowy Look 💄',
        excerpt: 'A step-by-step guide to achieving a natural, glowy makeup look for everyday wear.',
        coverImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070&auto=format&fit=crop',
        date: '3 Jan 2026',
        category: 'Makeup & Skincare',
        mood: 'Excited',
        musicId: '2',
        content: '<p>Step 1: Prep your skin...</p>',
        featured: true,
        likes: 89,
        layout: 'tall'
    },
    {
        id: '7',
        slug: 'best-korean-sunscreens',
        title: 'Top 5 Korean Sunscreens You Need ☀️',
        excerpt: 'Reviewing the best lightweight, non-greasy Korean sunscreens for all skin types.',
        coverImage: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=2070&auto=format&fit=crop',
        date: '15 Dec 2025',
        category: 'Makeup & Skincare',
        mood: 'Relaxed',
        musicId: '1',
        content: '<p>Sunscreen is the most important step...</p>',
        featured: false,
        likes: 45,
        layout: 'normal'
    },
    {
        id: '8',
        slug: 'night-routine-unwind',
        title: 'My Relaxing Nighttime Skincare Routine 🌙',
        excerpt: 'Unwinding after a long day with my favorite serums and moisturizers.',
        coverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop',
        date: '10 Dec 2025',
        category: 'Makeup & Skincare',
        mood: 'Relaxed',
        musicId: '5',
        content: '<p>Double cleansing is a game changer...</p>',
        featured: false,
        likes: 62,
        layout: 'normal'
    },
    {
        id: '2',
        slug: 'weekend-in-my-life',
        title: 'A Day in My Life: Weekend Edition 🌸',
        excerpt: 'Join me for a cozy weekend filled with self-care, productivity, and relaxation.',
        coverImage: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2035&auto=format&fit=crop',
        date: '1 Jan 2026',
        category: 'Daily Life',
        mood: 'Relaxed',
        musicId: '1',
        content: '<p>Waking up at 9AM...</p>',
        featured: true,
        likes: 210,
        layout: 'normal'
    },
    {
        id: '6',
        slug: 'mood-playlist',
        title: 'My Current Mood Playlist 🎵',
        excerpt: 'Sharing my mood-based music playlists for different occasions and feelings.',
        coverImage: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop',
        date: '2 Jan 2026',
        category: 'Daily Life',
        mood: 'Nostalgic',
        musicId: '6',
        content: '<p>Music heals the soul...</p>',
        featured: false,
        likes: 34,
        layout: 'normal'
    },
    {
        id: '9',
        slug: 'coffee-shop-hopping',
        title: 'Coffee Shop Hopping in the City ☕',
        excerpt: 'Exploring the cutest cafes in town and rating their latte art.',
        coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
        date: '20 Dec 2025',
        category: 'Daily Life',
        mood: 'Energetic',
        musicId: '4',
        content: '<p>First stop: The Daily Grind...</p>',
        featured: true,
        likes: 156,
        layout: 'wide'
    },
    {
        id: '10',
        slug: 'dealing-with-burnout',
        title: 'Honest Talk: Dealing with Burnout 🌧️',
        excerpt: 'A personal reflection on managing stress and finding balance when things get overwhelming.',
        coverImage: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?q=80&w=2070&auto=format&fit=crop',
        date: '5 Nov 2025',
        category: 'Daily Life',
        mood: 'Melancholy',
        musicId: '6',
        content: '<p>It is okay not to be okay...</p>',
        featured: false,
        likes: 98,
        layout: 'normal'
    },
    {
        id: '3',
        slug: 'watercolor-painting',
        title: 'My Favorite Hobby: Watercolor Painting 🎨',
        excerpt: 'Discovering the magic of watercolor painting and why it became my favorite creative outlet.',
        coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?q=80&w=2072&auto=format&fit=crop',
        date: '28 Dec 2025',
        category: 'Hobbies',
        mood: 'Creative',
        musicId: '3',
        content: '<p>Colors everywhere...</p>',
        featured: false,
        likes: 77,
        layout: 'normal'
    },
    {
        id: '11',
        slug: 'reading-list-2025',
        title: 'My 2025 Reading List & Goals 📚',
        excerpt: 'Books I plan to read this year and my goal to finish 20 novels.',
        coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop',
        date: '30 Dec 2025',
        category: 'Hobbies',
        mood: 'Excited',
        musicId: '1',
        content: '<p>So many books, so little time...</p>',
        featured: true,
        likes: 112,
        layout: 'tall'
    },
    {
        id: '12',
        slug: 'baking-sourdough',
        title: 'Attempting Sourdough for the First Time 🍞',
        excerpt: 'The messy, flour-filled adventure of making my own sourdough starter.',
        coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop',
        date: '12 Nov 2025',
        category: 'Hobbies',
        mood: 'Happy',
        musicId: '4',
        content: '<p>It is alive!...</p>',
        featured: false,
        likes: 54,
        layout: 'normal'
    },
    {
        id: '4',
        slug: 'why-started-diary',
        title: 'Why I Started This Diary 📖',
        excerpt: 'The story behind starting this personal diary and what you can expect to find here.',
        coverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1962&auto=format&fit=crop',
        date: '25 Dec 2025',
        category: 'Lifestyle',
        mood: 'Grateful',
        musicId: '4',
        content: '<p>Just to document...</p>',
        featured: true,
        likes: 205,
        layout: 'normal'
    },
    {
        id: '13',
        slug: 'decluttering-my-space',
        title: 'Minimalism: Decluttering My Space 🧹',
        excerpt: 'How cleaning my physical space helped clear my mental space.',
        coverImage: 'https://images.unsplash.com/photo-1484100356142-db6ab6244067?q=80&w=2067&auto=format&fit=crop',
        date: '18 Nov 2025',
        category: 'Lifestyle',
        mood: 'Energetic',
        musicId: '2',
        content: '<p>Less is more...</p>',
        featured: false,
        likes: 88,
        layout: 'normal'
    },
    {
        id: '14',
        slug: 'digital-detox-weekend',
        title: 'I Went Offline for 48 Hours 📵',
        excerpt: 'My experience disconnecting from social media and reconnecting with reality.',
        coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop',
        date: '22 Oct 2025',
        category: 'Lifestyle',
        mood: 'Relaxed',
        musicId: '5',
        content: '<p>No notifications, just peace...</p>',
        featured: false,
        likes: 134,
        layout: 'wide'
    }
];

// Config from env (need to be passed when running script)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hh368yw9'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
    console.error('Error: SANITY_API_TOKEN is missing.')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token, // Read-write token
    useCdn: false,
})

async function uploadImage(imageUrl) {
    try {
        const res = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        })
        if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`)
        const buffer = await res.arrayBuffer()
        const asset = await client.assets.upload('image', Buffer.from(buffer), {
            filename: imageUrl.split('/').pop()?.split('?')[0] || 'image.jpg'
        })
        return asset._id
    } catch (error) {
        console.warn(`Image upload failed for ${imageUrl}: ${error.message}. Using fallback.`)
        // Fallback image (Abstract shapes)
        try {
            const fallbackUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop'
            // Avoid infinite loop if fallback fails by just fetching directly without recursive call for now, 
            // or just simple second attempt logic.
            const res2 = await fetch(fallbackUrl)
            if (!res2.ok) return null
            const buffer2 = await res2.arrayBuffer()
            return (await client.assets.upload('image', Buffer.from(buffer2), { filename: 'fallback.jpg' }))._id
        } catch (e) {
            console.error('Fallback failed too:', e)
            return null
        }
    }
}

async function migrate() {
    console.log('Starting migration...')

    // 0. CLEANUP: Delete existing data to prevent duplicates
    console.log('Cleaning up existing data...')
    try {
        await client.delete({ query: '*[_type in ["post", "music"]]' })
        console.log('Cleanup complete. Starting fresh migration.')
    } catch (err) {
        console.error('Cleanup failed (might be empty):', err.message)
    }

    // 1. Migrate Music
    const musicIdMap = {}

    console.log('Migrating Music...')
    for (const track of musicLibrary) {
        const doc = {
            _type: 'music',
            title: track.title,
            artist: track.artist,
            src: track.src,
            mood: track.mood,
            category: track.category,
        }

        const created = await client.create(doc)
        musicIdMap[track.id] = created._id
        console.log(`Created music: ${track.title}`)
    }

    // 2. Migrate Posts
    console.log('Migrating Posts...')
    for (const post of posts) {
        const imageId = await uploadImage(post.coverImage)

        const doc = {
            _type: 'post',
            title: post.title,
            slug: { _type: 'slug', current: post.slug },
            excerpt: post.excerpt,
            // publishedAt: new Date(post.date).toISOString(), // REMOVED: Not in schema
            date: new Date(post.date).toISOString(), // Using same field for date as per schema
            category: post.category,
            mood: post.mood,
            featured: post.featured,
            likes: post.likes,
            layout: post.layout,
            // Convert simple HTML P tag to block
            content: [
                {
                    _key: uuidv4(),
                    _type: 'block',
                    style: 'normal',
                    children: [
                        {
                            _key: uuidv4(),
                            _type: 'span',
                            text: post.content.replace(/<[^>]*>?/gm, '') // Strip tags for plain text content
                        }
                    ],
                    markDefs: []
                }
            ],
            coverImage: imageId ? {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: imageId
                }
            } : undefined,
            music: musicIdMap[post.musicId] ? {
                _type: 'reference',
                _ref: musicIdMap[post.musicId]
            } : undefined
        }

        await client.create(doc)
        console.log(`Created post: ${post.title}`)
    }

    console.log('Migration complete!')
}

migrate().catch(console.error)
