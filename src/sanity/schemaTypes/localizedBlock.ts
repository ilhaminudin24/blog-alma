import { defineType, defineArrayMember } from 'sanity'
import { LocalizedBlockInput } from '../components/LocalizedBlockInput'

// Shared block configuration for consistency
const contentBlockConfig = [
    defineArrayMember({
        type: 'block',
        // Enhanced text styles
        styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
        ],
        lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
        ],
        marks: {
            // Enhanced decorators
            decorators: [
                { title: 'Bold', value: 'strong' },
                { title: 'Italic', value: 'em' },
                { title: 'Underline', value: 'underline' },
                { title: 'Strike', value: 'strike-through' },
                { title: 'Code', value: 'code' },
                { title: 'Highlight', value: 'highlight' },
            ],
            // Link annotations
            annotations: [
                {
                    name: 'link',
                    type: 'object',
                    title: 'External Link',
                    fields: [
                        {
                            name: 'href',
                            type: 'url',
                            title: 'URL',
                            validation: (rule: any) => rule.uri({
                                scheme: ['http', 'https', 'mailto', 'tel'],
                            }),
                        },
                        {
                            name: 'openInNewTab',
                            type: 'boolean',
                            title: 'Open in new tab',
                            initialValue: true,
                        },
                    ],
                },
                {
                    name: 'internalLink',
                    type: 'object',
                    title: 'Link to Post',
                    fields: [
                        {
                            name: 'reference',
                            type: 'reference',
                            title: 'Post',
                            to: [{ type: 'post' }],
                        },
                    ],
                },
            ],
        },
    }),
    // New block types
    defineArrayMember({ type: 'flexibleImage' }),
    defineArrayMember({ type: 'gallery' }),
    defineArrayMember({ type: 'callout' }),
    defineArrayMember({ type: 'videoEmbed' }),
    defineArrayMember({ type: 'code' }), // From @sanity/code-input
    defineArrayMember({ type: 'divider' }),
    // Existing custom types
    defineArrayMember({ type: 'quote' }),
    defineArrayMember({ type: 'moodBoard' }),
]

export const localizedBlock = defineType({
    name: 'localizedBlock',
    title: 'Localized Block',
    type: 'object',
    components: {
        input: LocalizedBlockInput,
    },
    fields: [
        {
            name: 'id',
            title: 'Indonesian',
            type: 'array',
            of: contentBlockConfig,
        },
        {
            name: 'en',
            title: 'English',
            type: 'array',
            of: contentBlockConfig,
        },
    ],
})
