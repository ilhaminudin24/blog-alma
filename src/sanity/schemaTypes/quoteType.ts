import { BlockquoteIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const quoteType = defineType({
    name: 'quote',
    title: 'Quote',
    type: 'object',
    icon: BlockquoteIcon,
    fields: [
        defineField({
            name: 'text',
            title: 'Quote Text',
            type: 'text',
            rows: 3,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
        }),
    ],
    preview: {
        select: {
            title: 'text',
            subtitle: 'author',
        },
        prepare({ title, subtitle }) {
            return {
                title: `"${title}"`,
                subtitle: subtitle ? `- ${subtitle}` : undefined,
                media: BlockquoteIcon,
            }
        },
    },
})
