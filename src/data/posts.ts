import { Post } from './types';
import { musicLibrary } from './music';

export const posts: Post[] = [
    // --- Makeup & Skincare ---
    {
        _id: '1',
        slug: 'my-skincare-journey',
        title: 'My Skincare Journey: From Acne to Glowing Skin ✨',
        excerpt: 'My journey from acne to glowing skin using a simple, consistent skincare routine.',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2070&auto=format&fit=crop',
            alt: 'Skincare products'
        },
        date: '2026-01-02',
        category: {
            name: 'Makeup & Skincare',
            slug: 'makeup-and-skincare'
        },
        mood: 'Happy',
        music: musicLibrary[1],
        content: [], // Placeholder for Portable Text
        featured: true,
        likes: 124,
        layout: 'wide'
    },
    {
        _id: '5',
        slug: 'natural-makeup-look',
        title: 'Makeup Tutorial: Natural Glowy Look 💄',
        excerpt: 'A step-by-step guide to achieving a natural, glowy makeup look for everyday wear.',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070&auto=format&fit=crop',
            alt: 'Makeup brushes'
        },
        date: '2026-01-03',
        category: {
            name: 'Makeup & Skincare',
            slug: 'makeup-and-skincare'
        },
        mood: 'Excited',
        music: musicLibrary[1],
        content: [],
        featured: true,
        likes: 89,
        layout: 'tall'
    },
    {
        _id: '7',
        slug: 'best-korean-sunscreens',
        title: 'Top 5 Korean Sunscreens You Need ☀️',
        excerpt: 'Reviewing the best lightweight, non-greasy Korean sunscreens for all skin types.',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1556228720-1987ba83dd26?q=80&w=2070&auto=format&fit=crop',
            alt: 'Sunscreen application'
        },
        date: '2025-12-15',
        category: {
            name: 'Makeup & Skincare',
            slug: 'makeup-and-skincare'
        },
        mood: 'Relaxed',
        music: musicLibrary[0],
        content: [],
        featured: false,
        likes: 45,
        layout: 'normal'
    },
    {
        _id: '8',
        slug: 'night-routine-unwind',
        title: 'My Relaxing Nighttime Skincare Routine 🌙',
        excerpt: 'Unwinding after a long day with my favorite serums and moisturizers.',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop',
            alt: 'Nighttime skincare'
        },
        date: '2025-12-10',
        category: {
            name: 'Makeup & Skincare',
            slug: 'makeup-and-skincare'
        },
        mood: 'Relaxed',
        music: musicLibrary[4],
        content: [],
        featured: false,
        likes: 62,
        layout: 'normal'
    },

    // --- Daily Life ---
    {
        _id: '2',
        slug: 'weekend-in-my-life',
        title: 'A Day in My Life: Weekend Edition 🌸',
        excerpt: 'Join me for a cozy weekend filled with self-care, productivity, and relaxation.',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2035&auto=format&fit=crop',
            alt: 'Weekend vibes'
        },
        date: '2026-01-01',
        category: {
            name: 'Daily Life',
            slug: 'daily-life'
        },
        mood: 'Relaxed',
        music: musicLibrary[0],
        content: [],
        featured: true,
        likes: 210,
        layout: 'normal'
    },
    {
        _id: '6',
        slug: 'mood-playlist',
        title: 'My Current Mood Playlist 🎵',
        excerpt: 'Sharing my mood-based music playlists for different occasions and feelings.',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop',
            alt: 'Headphones and music'
        },
        date: '2026-01-02',
        category: {
            name: 'Daily Life',
            slug: 'daily-life'
        },
        mood: 'Nostalgic',
        music: musicLibrary[5],
        content: [],
        featured: false,
        likes: 34,
        layout: 'normal'
    },
    {
        _id: '9',
        slug: 'coffee-shop-hopping',
        title: 'Coffee Shop Hopping in the City ☕',
        excerpt: 'Exploring the cutest cafes in town and rating their latte art.',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
            alt: 'Coffee cup'
        },
        date: '2025-12-20',
        category: {
            name: 'Daily Life',
            slug: 'daily-life'
        },
        mood: 'Energetic',
        music: musicLibrary[3],
        content: [],
        featured: true,
        likes: 156,
        layout: 'wide'
    },
    {
        _id: '10',
        slug: 'dealing-with-burnout',
        title: 'Honest Talk: Dealing with Burnout 🌧️',
        excerpt: 'A personal reflection on managing stress and finding balance when things get overwhelming.',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1499209974431-276138d7162a?q=80&w=2070&auto=format&fit=crop',
            alt: 'Rainy window'
        },
        date: '2025-11-05',
        category: {
            name: 'Daily Life',
            slug: 'daily-life'
        },
        mood: 'Melancholy',
        music: musicLibrary[5],
        content: [],
        featured: false,
        likes: 98,
        layout: 'normal'
    },

    // --- Hobbies ---
    {
        _id: '3',
        slug: 'watercolor-painting',
        title: 'My Favorite Hobby: Watercolor Painting 🎨',
        excerpt: 'Discovering the magic of watercolor painting and why it became my favorite creative outlet.',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?q=80&w=2072&auto=format&fit=crop',
            alt: 'Watercolor paints'
        },
        date: '2025-12-28',
        category: {
            name: 'Hobbies',
            slug: 'hobbies'
        },
        mood: 'Creative',
        music: musicLibrary[2],
        content: [],
        featured: false,
        likes: 77,
        layout: 'normal'
    },
    {
        _id: '11',
        slug: 'reading-list-2025',
        title: 'My 2025 Reading List & Goals 📚',
        excerpt: 'Books I plan to read this year and my goal to finish 20 novels.',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop',
            alt: 'Stack of books'
        },
        date: '2025-12-30',
        category: {
            name: 'Hobbies',
            slug: 'hobbies'
        },
        mood: 'Excited',
        music: musicLibrary[0],
        content: [],
        featured: true,
        likes: 112,
        layout: 'tall'
    },
    {
        _id: '12',
        slug: 'baking-sourdough',
        title: 'Attempting Sourdough for the First Time 🍞',
        excerpt: 'The messy, flour-filled adventure of making my own sourdough starter.',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop',
            alt: 'Sourdough bread'
        },
        date: '2025-11-12',
        category: {
            name: 'Hobbies',
            slug: 'hobbies'
        },
        mood: 'Happy',
        music: musicLibrary[3],
        content: [],
        featured: false,
        likes: 54,
        layout: 'normal'
    },

    // --- Lifestyle ---
    {
        _id: '4',
        slug: 'why-started-diary',
        title: 'Why I Started This Diary 📖',
        excerpt: 'The story behind starting this personal diary and what you can expect to find here.',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1962&auto=format&fit=crop',
            alt: 'Open diary'
        },
        date: '2025-12-25',
        category: {
            name: 'Lifestyle',
            slug: 'lifestyle'
        },
        mood: 'Grateful',
        music: musicLibrary[3],
        content: [],
        featured: true,
        likes: 205,
        layout: 'normal'
    },
    {
        _id: '13',
        slug: 'decluttering-my-space',
        title: 'Minimalism: Decluttering My Space 🧹',
        excerpt: 'How cleaning my physical space helped clear my mental space.',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1484100356142-db6ab6244067?q=80&w=2067&auto=format&fit=crop',
            alt: 'Clean room'
        },
        date: '2025-11-18',
        category: {
            name: 'Lifestyle',
            slug: 'lifestyle'
        },
        mood: 'Energetic',
        music: musicLibrary[1],
        content: [],
        featured: false,
        likes: 88,
        layout: 'normal'
    },
    {
        _id: '14',
        slug: 'digital-detox-weekend',
        title: 'I Went Offline for 48 Hours 📵',
        excerpt: 'My experience disconnecting from social media and reconnecting with reality.',
        coverImage: {
            url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop',
            alt: 'Nature view'
        },
        date: '2025-10-22',
        category: {
            name: 'Lifestyle',
            slug: 'lifestyle'
        },
        mood: 'Relaxed',
        music: musicLibrary[4],
        content: [],
        featured: false,
        likes: 134,
        layout: 'wide'
    },
];

