'use client'

/**
 * Utility to extract plain text from Portable Text blocks.
 * Used for auto-generating excerpts from content.
 */
export function extractTextFromBlocks(blocks: any[], maxLength: number = 150): string {
    if (!blocks || blocks.length === 0) return ''

    const textParts: string[] = []

    for (const block of blocks) {
        // Only extract text from standard block types
        if (block._type === 'block' && block.children) {
            const blockText = block.children
                .filter((child: any) => child._type === 'span')
                .map((child: any) => child.text || '')
                .join('')

            if (blockText.trim()) {
                textParts.push(blockText.trim())
            }
        }

        // Stop early if we have enough text
        const joined = textParts.join(' ')
        if (joined.length >= maxLength) {
            return joined.slice(0, maxLength).trim() + '...'
        }
    }

    const result = textParts.join(' ')
    if (result.length > maxLength) {
        return result.slice(0, maxLength).trim() + '...'
    }
    return result
}
