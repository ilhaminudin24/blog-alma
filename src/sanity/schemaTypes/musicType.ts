import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const musicType = defineType({
    name: 'music',
    title: 'Music',
    type: 'document',
    icon: PlayIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'artist',
            title: 'Artist',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'src',
            title: 'Source URL',
            type: 'string',
            description: 'URL to the audio file (e.g. /music/song.mp3) or external link',
        }),
        defineField({
            name: 'mood',
            title: 'Mood',
            type: 'string',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'artist',
        },
    },
})
