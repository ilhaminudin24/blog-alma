import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const flexibleImageType = defineType({
    name: 'flexibleImage',
    title: 'Image',
    type: 'object',
    icon: ImageIcon,
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            description: 'Deskripsi gambar untuk SEO dan aksesibilitas',
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
            description: 'Keterangan gambar (opsional)',
        }),
        defineField({
            name: 'position',
            title: 'Position',
            type: 'string',
            description: 'Posisi gambar dalam artikel',
            options: {
                list: [
                    { title: '⬅️ Left (Text Wraps Right)', value: 'left' },
                    { title: '↔️ Center', value: 'center' },
                    { title: '➡️ Right (Text Wraps Left)', value: 'right' },
                    { title: '📐 Full Width', value: 'full' },
                ],
                layout: 'radio',
            },
            initialValue: 'center',
        }),
        defineField({
            name: 'size',
            title: 'Size',
            type: 'string',
            description: 'Ukuran gambar (untuk position left/center/right)',
            options: {
                list: [
                    { title: 'Small (25%)', value: 'small' },
                    { title: 'Medium (50%)', value: 'medium' },
                    { title: 'Large (75%)', value: 'large' },
                ],
                layout: 'radio',
            },
            initialValue: 'medium',
            hidden: ({ parent }) => parent?.position === 'full',
        }),
    ],
    preview: {
        select: {
            title: 'alt',
            subtitle: 'position',
            media: 'image',
        },
        prepare({ title, subtitle, media }) {
            const positionLabels: Record<string, string> = {
                left: '⬅️ Left',
                center: '↔️ Center',
                right: '➡️ Right',
                full: '📐 Full Width',
            }
            return {
                title: title || 'Image',
                subtitle: positionLabels[subtitle] || subtitle,
                media,
            }
        },
    },
})
