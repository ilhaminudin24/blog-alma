import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const postType = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    icon: DocumentTextIcon,
    groups: [
        {
            name: 'content',
            title: '✍️ Content',
            default: true,
        },
        {
            name: 'settings',
            title: '⚙️ Settings',
        },
    ],
    fields: [
        // ========== CONTENT TAB (user focuses here) ==========
        defineField({
            name: 'title',
            title: 'Judul',
            type: 'localizedString',
            description: 'Tulis judul dalam Bahasa Indonesia — English otomatis diterjemahkan',
            group: 'content',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            description: 'Upload gambar cover untuk post ini',
            group: 'content',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'localizedString',
                    title: 'Alternative text',
                    description: 'Deskripsi gambar untuk SEO dan aksesibilitas',
                },
                {
                    name: 'size',
                    title: 'Image Display Size',
                    type: 'string',
                    description: 'Ukuran tampilan gambar di halaman post',
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
            name: 'content',
            title: 'Konten',
            type: 'localizedBlock',
            description: 'Tulis konten dalam Bahasa Indonesia — gunakan tombol translate untuk English',
            group: 'content',
        }),
        defineField({
            name: 'excerpt',
            title: 'Ringkasan',
            type: 'localizedText',
            description: '✨ Otomatis diisi dari konten. Bisa diedit manual jika perlu.',
            group: 'content',
        }),
        defineField({
            name: 'category',
            title: 'Kategori',
            type: 'reference',
            to: [{ type: 'category' }],
            description: 'Pilih kategori (opsional — akan diisi otomatis jika kosong)',
            group: 'content',
        }),

        // ========== SETTINGS TAB (mostly auto-filled) ==========
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Auto-generate dari judul. Klik Generate jika belum terisi.',
            group: 'settings',
            options: {
                source: 'title.id',
                maxLength: 96,
                slugify: (input: string) =>
                    input
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w-]+/g, '')
                        .slice(0, 96),
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Tanggal Publikasi',
            type: 'datetime',
            description: 'Otomatis diisi saat membuat post baru',
            group: 'settings',
            initialValue: () => new Date().toISOString(),
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            description: 'Tampilkan di bagian highlight',
            group: 'settings',
            initialValue: false,
        }),
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            description: 'Gaya layout untuk post ini',
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
        defineField({
            name: 'likes',
            title: 'Likes',
            type: 'number',
            description: 'Jumlah likes (dikelola otomatis)',
            group: 'settings',
            initialValue: 0,
            readOnly: true,
        }),
        defineField({
            name: 'views',
            title: 'Views',
            type: 'number',
            description: 'Jumlah views (dikelola otomatis)',
            group: 'settings',
            initialValue: 0,
            readOnly: true,
        }),
    ],
    // Default values for new posts
    initialValue: async () => ({
        date: new Date().toISOString(),
        featured: false,
        layout: 'normal',
        likes: 0,
        views: 0,
    }),
    preview: {
        select: {
            title: 'title.id',
            author: 'author.name',
            media: 'coverImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})
