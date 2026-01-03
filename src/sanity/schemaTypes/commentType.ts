import { defineField, defineType } from 'sanity'

export const commentType = defineType({
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'content',
            type: 'text',
        }),
        defineField({
            name: 'post',
            type: 'reference',
            to: [{ type: 'post' }],
            weak: true,
        }),
        defineField({
            name: 'approved',
            title: 'Approved',
            type: 'boolean',
            description: "Comments won't show on the site without approval",
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            name: 'name',
            comment: 'content',
            post: 'post.title',
        },
        prepare({ name, comment, post }) {
            return {
                title: `${name} on ${post}`,
                subtitle: comment,
            }
        },
    },
})
