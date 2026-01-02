
export interface AboutData {
    name: string;
    role: string;
    greeting: string;
    introduction: string;
    story: string[];
    funFacts: {
        icon: string;
        label: string;
        value: string;
    }[];
    favorites: {
        category: string;
        items: string[];
        color: string; // Tailwind color class helper
    }[];
    gallery: {
        src: string;
        alt: string;
        caption?: string;
    }[];
}

export const aboutData: AboutData = {
    name: "Alma",
    role: "Daydreamer & Storyteller",
    greeting: "Hello, Beautiful Soul! ✨",
    introduction: "I'm Alma, just a girl who loves turning ordinary moments into magical memories. Welcome to my little corner of the internet.",
    story: [
        "Ever since I was little, I've had a fascination with keeping diaries. There's something magical about freezing a moment in time with just ink and paper.",
        "This blog is an extension of that love—a digital garden where I plant my thoughts, water them with creativity, and watch them bloom.",
        "When I'm not writing, you can find me exploring cozy cafes, reading fantasy novels, or trying to bake the perfect batch of chocolate chip cookies (emphasis on 'trying'!)."
    ],
    funFacts: [
        { icon: "☕", label: "Coffee Order", value: "Oat Milk Vanilla Latte" },
        { icon: "🐾", label: "Spirit Animal", value: "A sleepy cat" },
        { icon: "🎨", label: "Favorite Color", value: "Pastel Lilac" },
        { icon: "✈️", label: "Dream Destination", value: "Kyoto, Japan" },
    ],
    favorites: [
        {
            category: "Books",
            items: ["The Little Prince", "Kafka on the Shore", "Harry Potter"],
            color: "bg-pastel-blue"
        },
        {
            category: "Music",
            items: ["Lo-fi Beats", "Indie Pop", "Classical Piano"],
            color: "bg-pastel-pink"
        },
        {
            category: "Hobbies",
            items: ["Journaling", "Photography", "Stargazing"],
            color: "bg-pastel-lilac"
        }
    ],
    gallery: [
        {
            src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2000&auto=format&fit=crop",
            alt: "A cozy reading corner",
            caption: "My happy place 📚"
        },
        {
            src: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=2000&auto=format&fit=crop",
            alt: "Journaling in a cafe",
            caption: "Planning big dreams ✍️"
        },
        {
            src: "https://images.unsplash.com/photo-1490481638943-ddcdcf6287ef?q=80&w=2000&auto=format&fit=crop",
            alt: "Flowers in sunlight",
            caption: "Little joys 🌸"
        }
    ]
};
