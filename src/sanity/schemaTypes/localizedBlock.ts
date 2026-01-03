import { defineType } from 'sanity'

export const localizedBlock = defineType({
    name: 'localizedBlock',
    title: 'Localized Block',
    type: 'object',
    fieldsets: [
        {
            title: 'Translations',
            name: 'translations',
            options: { collapsible: true }
        },
    ],
    fields: [
        {
            name: 'id',
            title: 'Indonesian',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image' },
                { type: 'quote' },
                { type: 'moodBoard' },
            ],
        },
        {
            name: 'en',
            title: 'English',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image' },
                { type: 'quote' },
                { type: 'moodBoard' },
            ],
        },
    ],
})
