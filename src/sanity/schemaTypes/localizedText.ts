import { defineType } from 'sanity'

export const localizedText = defineType({
    name: 'localizedText',
    title: 'Localized Text',
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
            type: 'text',
            rows: 3,
        },
        {
            name: 'en',
            title: 'English',
            type: 'text',
            rows: 3,
        },
    ],
})
