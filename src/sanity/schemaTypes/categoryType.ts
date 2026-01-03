import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'localizedString',
            description: 'Category name in Indonesian and English',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name.id',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'localizedText',
            description: 'Category description in Indonesian and English',
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Icon to display for this category',
            options: {
                list: [
                    { title: 'Book Open (Personal Story)', value: 'book-open' },
                    { title: 'Sun (Lifestyle)', value: 'sun' },
                    { title: 'Coffee', value: 'coffee' },
                    { title: 'Sparkles (Beauty & Care)', value: 'sparkles' },
                    { title: 'Palette (Creative)', value: 'palette' },
                    { title: 'Brain (Psychology)', value: 'brain' },
                    { title: 'Message Circle Question (Q&A)', value: 'message-circle-question' },
                    { title: 'Heart', value: 'heart' },
                    { title: 'Star', value: 'star' },
                    { title: 'Music', value: 'music' },
                    { title: 'Camera', value: 'camera' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'color',
            title: 'Color Theme',
            type: 'string',
            description: 'Color theme for the category card',
            options: {
                list: [
                    { title: 'Yellow (Pastel Yellow)', value: 'yellow' },
                    { title: 'Pink (Pastel Pink)', value: 'pink' },
                    { title: 'Purple (Pastel Lilac)', value: 'purple' },
                    { title: 'Blue (Pastel Blue)', value: 'blue' },
                    { title: 'Green (Pastel Mint)', value: 'green' },
                    { title: 'Indigo', value: 'indigo' },
                    { title: 'Orange', value: 'orange' },
                    { title: 'Red', value: 'red' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this category appears (lower numbers appear first)',
            initialValue: 0,
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: 'isSpecial',
            title: 'Is Special Link?',
            type: 'boolean',
            description: 'If true, this category links to a special page (like Q&A) instead of a category page',
            initialValue: false,
        }),
        defineField({
            name: 'specialHref',
            title: 'Special Link URL',
            type: 'string',
            description: 'Custom URL for special categories (e.g., /qna)',
            hidden: ({ document }) => !document?.isSpecial,
        }),
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name.id',
            subtitle: 'description.id',
            order: 'order',
        },
        prepare({ title, subtitle, order }) {
            return {
                title: `${order}. ${title}`,
                subtitle,
            }
        },
    },
})
