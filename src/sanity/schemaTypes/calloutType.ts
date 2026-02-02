import { InfoOutlineIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const calloutType = defineType({
    name: 'callout',
    title: 'Callout Box',
    type: 'object',
    icon: InfoOutlineIcon,
    fields: [
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            description: 'Jenis callout box',
            options: {
                list: [
                    { title: '💡 Tip', value: 'tip' },
                    { title: 'ℹ️ Info', value: 'info' },
                    { title: '⚠️ Warning', value: 'warning' },
                    { title: '❌ Caution', value: 'caution' },
                    { title: '✅ Success', value: 'success' },
                ],
                layout: 'radio',
            },
            initialValue: 'info',
        }),
        defineField({
            name: 'title',
            title: 'Title (Optional)',
            type: 'string',
            description: 'Judul callout (opsional)',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'text',
            rows: 4,
            description: 'Isi pesan callout',
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            type: 'type',
            content: 'content',
        },
        prepare({ title, type, content }) {
            const icons: Record<string, string> = {
                tip: '💡',
                info: 'ℹ️',
                warning: '⚠️',
                caution: '❌',
                success: '✅',
            }
            return {
                title: `${icons[type] || 'ℹ️'} ${title || content?.substring(0, 40) || 'Callout'}`,
                subtitle: type?.charAt(0).toUpperCase() + type?.slice(1),
                media: InfoOutlineIcon,
            }
        },
    },
})
