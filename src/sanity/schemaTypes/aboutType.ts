import { defineType, defineField } from 'sanity'

export const aboutType = defineType({
    name: 'about',
    title: 'About Page',
    type: 'document',
    fields: [
        // Hero Section
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role/Tagline',
            type: 'localizedString',
        }),
        defineField({
            name: 'greeting',
            title: 'Greeting',
            type: 'localizedString',
        }),
        defineField({
            name: 'introduction',
            title: 'Introduction',
            type: 'localizedText',
        }),

        // Story Section
        defineField({
            name: 'storyTitle',
            title: 'Story Section Title',
            type: 'localizedString',
        }),
        defineField({
            name: 'story',
            title: 'Story Paragraphs',
            type: 'array',
            of: [{ type: 'localizedText' }],
        }),

        // Fun Facts Section
        defineField({
            name: 'funFactsTitle',
            title: 'Fun Facts Title',
            type: 'localizedString',
        }),
        defineField({
            name: 'funFacts',
            title: 'Fun Facts',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'icon', title: 'Icon Emoji', type: 'string' },
                    { name: 'label', title: 'Label', type: 'localizedString' },
                    { name: 'value', title: 'Value', type: 'localizedString' },
                ],
                preview: {
                    select: { title: 'label.id', icon: 'icon' },
                    prepare: ({ title, icon }) => ({
                        title: `${icon} ${title}`,
                    }),
                },
            }],
        }),

        // Favorites Section
        defineField({
            name: 'favoritesTitle',
            title: 'Favorites Section Title',
            type: 'localizedString',
        }),
        defineField({
            name: 'favorites',
            title: 'Favorites Categories',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'category', title: 'Category Name', type: 'localizedString' },
                    {
                        name: 'items',
                        title: 'Items',
                        type: 'array',
                        of: [{ type: 'localizedString' }]
                    },
                    {
                        name: 'color',
                        title: 'Background Color',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'Pastel Blue', value: 'bg-pastel-blue' },
                                { title: 'Pastel Pink', value: 'bg-pastel-pink' },
                                { title: 'Pastel Lilac', value: 'bg-pastel-lilac' },
                                { title: 'Pastel Yellow', value: 'bg-pastel-yellow' },
                                { title: 'Pastel Mint', value: 'bg-pastel-mint' },
                                { title: 'Pastel Peach', value: 'bg-pastel-peach' },
                            ],
                        },
                    },
                ],
                preview: {
                    select: { title: 'category.id' },
                },
            }],
        }),

        // Gallery Section
        defineField({
            name: 'gallery',
            title: 'Gallery Images',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
                fields: [
                    { name: 'alt', title: 'Alt Text', type: 'localizedString' },
                    { name: 'caption', title: 'Caption', type: 'localizedString' },
                ],
            }],
        }),
    ],
    preview: {
        select: { title: 'name' },
        prepare: ({ title }) => ({
            title: `About: ${title}`,
        }),
    },
})
