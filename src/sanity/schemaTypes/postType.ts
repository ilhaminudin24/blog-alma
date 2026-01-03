import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const postType = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'localizedString',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title.id', // Update source for slug generation
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'localizedText',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'localizedString',
                    title: 'Alternative text',
                }
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'mood',
            title: 'Mood',
            type: 'string',
            options: {
                list: [
                    { title: 'Happy', value: 'Happy' },
                    { title: 'Excited', value: 'Excited' },
                    { title: 'Relaxed', value: 'Relaxed' },
                    { title: 'Nostalgic', value: 'Nostalgic' },
                    { title: 'Energetic', value: 'Energetic' },
                    { title: 'Melancholy', value: 'Melancholy' },
                    { title: 'Creative', value: 'Creative' },
                    { title: 'Grateful', value: 'Grateful' },
                ],
            },
        }),

        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'likes',
            title: 'Likes',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'Wide', value: 'wide' },
                    { title: 'Tall', value: 'tall' },
                ],
            },
            initialValue: 'normal',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'localizedBlock',
        }),
    ],
    preview: {
        select: {
            title: 'title.id', // Update preview selection
            author: 'author.name',
            media: 'coverImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})
