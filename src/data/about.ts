
export interface AboutData {
    name: string;
    greeting: string;
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
}

export const aboutData: AboutData = {
    name: "Alma",
    greeting: "Hello, Beautiful Soul! ✨",
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
    ]
};
