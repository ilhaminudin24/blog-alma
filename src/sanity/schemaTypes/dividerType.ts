import { RemoveIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const dividerType = defineType({
    name: 'divider',
    title: 'Divider',
    type: 'object',
    icon: RemoveIcon,
    fields: [
        defineField({
            name: 'style',
            title: 'Style',
            type: 'string',
            options: {
                list: [
                    { title: '━━━ Line', value: 'line' },
                    { title: '• • • Dots', value: 'dots' },
                    { title: '✦ ✦ ✦ Stars', value: 'stars' },
                    { title: '〰️ Wave', value: 'wave' },
                    { title: '   Space Only', value: 'space' },
                ],
                layout: 'radio',
            },
            initialValue: 'line',
        }),
    ],
    preview: {
        select: {
            style: 'style',
        },
        prepare({ style }) {
            const previews: Record<string, string> = {
                line: '━━━━━━━━━━━━━━━',
                dots: '• • • • • • • • •',
                stars: '✦ ✦ ✦ ✦ ✦',
                wave: '〰️ 〰️ 〰️ 〰️',
                space: '        ',
            }
            return {
                title: previews[style] || '━━━━━',
                subtitle: 'Divider',
                media: RemoveIcon,
            }
        },
    },
})
