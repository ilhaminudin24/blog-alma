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


    ],
    preview: {
        select: { title: 'name' },
        prepare: ({ title }) => ({
            title: `About: ${title}`,
        }),
    },
})

