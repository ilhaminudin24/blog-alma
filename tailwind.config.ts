import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                pastel: {
                    lilac: "#E6E6FA",
                    mint: "#F0FFF4", // Slightly more visible mint
                    peach: "#FFDAB9",
                    blue: "#ADD8E6",
                    yellow: "#FFFACD", // Lemon Chiffon
                    pink: "#FFB7B2",
                },
                primary: {
                    DEFAULT: "#E6E6FA", // Lilac as primary
                    foreground: "#4A5568",
                },
            },
            fontFamily: {
                rounded: ['var(--font-quicksand)', 'sans-serif'],
                handwritten: ['var(--font-patrick-hand)', 'cursive'],
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
        },
    },
    plugins: [],
};
export default config;
