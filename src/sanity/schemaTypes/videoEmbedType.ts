import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const videoEmbedType = defineType({
    name: 'videoEmbed',
    title: 'Video Embed',
    type: 'object',
    icon: PlayIcon,
    fields: [
        defineField({
            name: 'url',
            title: 'Video URL',
            type: 'url',
            description: 'Paste URL YouTube atau Vimeo (contoh: https://youtube.com/watch?v=...)',
            validation: (rule) => rule.required().uri({
                scheme: ['http', 'https'],
            }),
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
            description: 'Keterangan video (opsional)',
        }),
    ],
    preview: {
        select: {
            url: 'url',
            caption: 'caption',
        },
        prepare({ url, caption }) {
            return {
                title: caption || 'Video',
                subtitle: url,
                media: PlayIcon,
            }
        },
    },
})
