import { defineField, defineType } from 'sanity'

export const qnaType = defineType({
    name: 'qna',
    title: 'Q&A',
    type: 'document',
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'askerName',
            title: 'Asker Name',
            type: 'string',
            initialValue: 'Guest',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),

    ],
    preview: {
        select: {
            title: 'question',
            author: 'askerName',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})
