import { defineType } from 'sanity'
import { LocalizedStringInput } from '../components/LocalizedStringInput'

export const localizedString = defineType({
    name: 'localizedString',
    title: 'Localized String',
    type: 'object',
    components: {
        input: LocalizedStringInput,
    },
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

