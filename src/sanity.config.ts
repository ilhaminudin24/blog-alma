'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import './sanity/studioStyles.css'
import { codeInput } from '@sanity/code-input'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schema' folder
    schema,
    plugins: [
        structureTool({ structure }),
        // Vision is a tool that lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion }),
        // Code input for code blocks with syntax highlighting
        codeInput(),
    ],
    document: {
        actions: (prev, context) => {
            const { schemaType } = context
            if (schemaType === 'post') {
                return prev.map((originalAction) =>
                    originalAction.action === 'delete'
                        ? // Replace the default delete action with our custom one (or add alongside)
                        // To keep it simple and safe, we'll ADD our action alongside the default one
                        // since we also fixed the default one with weak:true.
                        originalAction
                        : originalAction
                ).concat([require('./sanity/lib/actions').DeleteWithComments])
            }
            return prev
        },
    },
})
