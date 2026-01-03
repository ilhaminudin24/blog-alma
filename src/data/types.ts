export interface Category {
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    color?: string;
}

export type Mood = 'Happy' | 'Melancholy' | 'Energetic' | 'Relaxed' | 'Excited' | 'Nostalgic' | 'Grateful' | 'Creative';


export interface Post {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: {
        url: string;
        alt?: string;
    };
    date: string;
    category: Category;
    mood: string;
    content: any; // Portable Text block array
    featured: boolean;
    likes: number;
    layout?: 'normal' | 'wide' | 'tall';
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
