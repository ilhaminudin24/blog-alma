'use client'

import { GoogleGenAI } from '@google/genai'

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

/**
 * Translate text from Indonesian to English using Gemini API
 */
export async function translateToEnglish(text: string): Promise<string> {
    if (!text || text.trim() === '') {
        return ''
    }

    if (!GEMINI_API_KEY) {
        throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not configured')
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

    const prompt = `Translate the following Indonesian text to English. Only return the translated text, no explanations or additional text:

${text}`

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: prompt,
    })

    return response.text?.trim() || ''
}

/**
 * Translate Portable Text blocks from Indonesian to English
 * This handles the block structure while preserving formatting
 */
export async function translateBlocksToEnglish(blocks: any[]): Promise<any[]> {
    if (!blocks || blocks.length === 0) {
        return []
    }

    if (!GEMINI_API_KEY) {
        throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not configured')
    }

    // Extract text content from blocks for translation
    const textContent = blocks
        .filter((block: any) => block._type === 'block')
        .map((block: any) => {
            return block.children
                ?.filter((child: any) => child._type === 'span')
                .map((child: any) => child.text)
                .join('') || ''
        })
        .join('\n\n')

    if (!textContent.trim()) {
        return blocks
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

    const prompt = `Translate the following Indonesian text to English. Preserve paragraph breaks. Only return the translated text, no explanations:

${textContent}`

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: prompt,
    })

    const translatedText = response.text?.trim() || ''
    const translatedParagraphs = translatedText.split(/\n\n+/)

    // Rebuild blocks with translated content
    let paragraphIndex = 0
    const translatedBlocks = blocks.map((block: any) => {
        if (block._type === 'block' && paragraphIndex < translatedParagraphs.length) {
            const translatedParagraph = translatedParagraphs[paragraphIndex] || ''
            paragraphIndex++
            return {
                ...block,
                _key: `${block._key || Date.now()}-translated`,
                children: [
                    {
                        _type: 'span',
                        _key: `span-${Date.now()}-${paragraphIndex}`,
                        text: translatedParagraph,
                        marks: []
                    }
                ]
            }
        }
        // Keep non-block elements (images, etc.) as-is
        return {
            ...block,
            _key: `${block._key || Date.now()}-copy`
        }
    })

    return translatedBlocks
}
