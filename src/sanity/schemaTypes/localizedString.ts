import { defineType } from 'sanity'

export const localizedString = defineType({
    name: 'localizedString',
    title: 'Localized String',
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
            type: 'string',
        },
        {
            name: 'en',
            title: 'English',
            type: 'string',
        },
    ],
})
