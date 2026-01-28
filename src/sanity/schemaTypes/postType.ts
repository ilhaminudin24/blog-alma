import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const postType = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    icon: DocumentTextIcon,
    groups: [
        {
            name: 'content',
            title: 'Content',
            default: true,
        },
        {
            name: 'settings',
            title: 'Settings',
        },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'localizedString',
            description: 'The main title of the post',
            group: 'content',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'The URL-friendly version of the title',
            group: 'settings',
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
            description: 'A short summary of the post for lists and SEO',
            group: 'content',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'localizedBlock',
            description: 'The main body of the post',
            group: 'content',
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            description: 'The main image displayed on the blog list and top of the post',
            group: 'content',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'localizedString',
                    title: 'Alternative text',
                    description: 'Important for SEO and accessibility',
                },
                {
                    name: 'size',
                    title: 'Image Display Size',
                    type: 'string',
                    description: 'Control how the image appears on the post page',
                    options: {
                        list: [
                            { title: 'Normal (16:9)', value: 'normal' },
                            { title: 'Full Screen', value: 'fullscreen' },
                            { title: 'Wide (Ultrawide)', value: 'wide' },
                            { title: 'Tall (Portrait)', value: 'tall' },
                            { title: 'Original (No Crop)', value: 'original' },
                        ],
                        layout: 'radio',
                    },
                    initialValue: 'normal',
                },
                {
                    name: 'showWatermark',
                    title: 'Show Watermark (@shealmalia)',
                    type: 'boolean',
                    description: 'Overlay the @shealmalia watermark on the cover image',
                    initialValue: false,
                }
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'datetime',
            description: 'The publication date',
            group: 'settings',
            initialValue: () => new Date().toISOString(),
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            description: 'The category this post belongs to',
            group: 'settings',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            description: 'Highlight this post in the featured section',
            group: 'settings',
            initialValue: false,
        }),
        defineField({
            name: 'likes',
            title: 'Likes',
            type: 'number',
            description: 'Number of likes (Read only)',
            group: 'settings',
            readOnly: true,
            initialValue: 0,
        }),
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            description: 'The layout style for this post',
            group: 'settings',
            options: {
                list: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'Wide', value: 'wide' },
                    { title: 'Tall', value: 'tall' },
                ],
            },
            initialValue: 'normal',
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
