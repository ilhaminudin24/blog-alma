import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType, defineArrayMember } from 'sanity'

export const galleryType = defineType({
    name: 'gallery',
    title: 'Image Gallery',
    type: 'object',
    icon: ImagesIcon,
    fields: [
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            description: 'Tambahkan 2-12 gambar',
            of: [
                defineArrayMember({
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            type: 'string',
                            title: 'Alt Text',
                        }),
                        defineField({
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        }),
                    ],
                }),
            ],
            validation: (rule) => rule.min(2).max(12),
        }),
        defineField({
            name: 'layout',
            title: 'Layout Style',
            type: 'string',
            options: {
                list: [
                    { title: '📊 Grid 2 Columns', value: 'grid-2' },
                    { title: '📊 Grid 3 Columns', value: 'grid-3' },
                    { title: '🧱 Masonry', value: 'masonry' },
                    { title: '🎠 Carousel/Slider', value: 'carousel' },
                ],
                layout: 'radio',
            },
            initialValue: 'grid-2',
        }),
    ],
    preview: {
        select: {
            images: 'images',
            layout: 'layout',
        },
        prepare({ images, layout }) {
            const layoutLabels: Record<string, string> = {
                'grid-2': '📊 2 Columns',
                'grid-3': '📊 3 Columns',
                'masonry': '🧱 Masonry',
                'carousel': '🎠 Carousel',
            }
            return {
                title: `Gallery (${images?.length || 0} images)`,
                subtitle: layoutLabels[layout] || layout,
                media: ImagesIcon,
            }
        },
    },
})
