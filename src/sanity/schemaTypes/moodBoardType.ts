import { DashboardIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const moodBoardType = defineType({
    name: 'moodBoard',
    title: 'Mood Board (3 Columns)',
    type: 'object',
    icon: DashboardIcon,
    fields: [
        defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            validation: (rule) => rule.required().min(1).max(3),
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'heading',
                            title: 'Heading (e.g., COFFEE CONSUMED)',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'text',
                            title: 'Text',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'color',
                            title: 'Color Theme',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Blue', value: 'blue' },
                                    { title: 'Pink', value: 'pink' },
                                    { title: 'Yellow', value: 'yellow' },
                                    { title: 'Green', value: 'green' },
                                    { title: 'Purple', value: 'purple' },
                                ],
                            },
                            initialValue: 'blue',
                        }),
                    ],
                }),
            ],
        }),
    ],
    preview: {
        select: {
            items: 'items',
        },
        prepare({ items }) {
            return {
                title: 'Mood Board',
                subtitle: `${items?.length || 0} items`,
                media: DashboardIcon,
            }
        },
    },
})
