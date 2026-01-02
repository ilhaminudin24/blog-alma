export type Category = 'Daily Life' | 'Lifestyle' | 'Hobbies' | 'Makeup & Skincare';
export type Mood = 'Happy' | 'Melancholy' | 'Energetic' | 'Relaxed' | 'Excited' | 'Nostalgic' | 'Grateful' | 'Creative';

export interface MusicTrack {
    id: string;
    title: string;
    artist: string;
    src: string; // URL
    duration?: string;
    category?: Category; // Linked to a category or general
    mood?: Mood;
}

export interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string; // URL
    date: string;
    category: Category;
    mood: Mood;
    music?: MusicTrack; // Specific track for this post
    content: string; // Markdown/HTML
    featured: boolean;
    likes: number;
    layout?: 'normal' | 'wide' | 'tall'; // For Bento Grid sizing
}

export interface UserProfile {
    name: string;
    bio: string;
    avatar: string;
    socials: {
        instagram: string;
        twitter: string;
        pinterest: string;
    };
}
