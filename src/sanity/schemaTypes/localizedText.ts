import { defineType } from 'sanity'
import { LocalizedTextInput } from '../components/LocalizedTextInput'

export const localizedText = defineType({
    name: 'localizedText',
    title: 'Localized Text',
    type: 'object',
    components: {
        input: LocalizedTextInput,
    },
    fields: [
        {
            name: 'id',
            title: 'Indonesian',
            type: 'text',
            rows: 4,
        },
        {
            name: 'en',
            title: 'English',
            type: 'text',
            rows: 4,
        },
    ],
})

