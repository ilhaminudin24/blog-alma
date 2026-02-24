'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { Stack, Flex, Text, TextArea, Card, Button as SanityButton } from '@sanity/ui'
import { set, unset, useFormValue } from 'sanity'
import type { ObjectInputProps } from 'sanity'
import { TranslateButton } from './TranslateButton'
import { translateToEnglish } from '../lib/translateService'
import { extractTextFromBlocks } from '../lib/extractText'
import { SparklesIcon } from '@sanity/icons'

/**
 * Auto-Excerpt Input for localizedText fields.
 * Reads content.id blocks and auto-generates excerpt if empty.
 * Also supports auto-translate on blur like the standard LocalizedTextInput.
 */
export function AutoExcerptInput(props: ObjectInputProps) {
    const { value, onChange } = props
    const currentValue = value as { id?: string; en?: string } | undefined
    const isTranslatingRef = useRef(false)
    const hasAutoFilledRef = useRef(false)

    // Read the content field from the parent document
    const contentValue = useFormValue(['content']) as { id?: any[]; en?: any[] } | undefined

    // Auto-generate excerpt from content.id blocks
    useEffect(() => {
        const idBlocks = contentValue?.id
        if (!idBlocks || idBlocks.length === 0) return

        // Only auto-fill if excerpt.id is currently empty
        if (!currentValue?.id && !hasAutoFilledRef.current) {
            const extractedText = extractTextFromBlocks(idBlocks, 150)
            if (extractedText.trim()) {
                hasAutoFilledRef.current = true
                onChange(set(extractedText, ['id']))
            }
        }
    }, [contentValue?.id, currentValue?.id, onChange])

    // Reset auto-fill flag when excerpt is manually cleared
    useEffect(() => {
        if (!currentValue?.id) {
            hasAutoFilledRef.current = false
        }
    }, [currentValue?.id])

    // Manual regenerate excerpt from content
    const handleRegenerate = useCallback(() => {
        const idBlocks = contentValue?.id
        if (!idBlocks || idBlocks.length === 0) return

        const extractedText = extractTextFromBlocks(idBlocks, 150)
        if (extractedText.trim()) {
            onChange(set(extractedText, ['id']))
            // Also clear English so it gets re-translated on blur
            onChange(unset(['en']))
        }
    }, [contentValue?.id, onChange])

    const handleIdChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value
        if (newValue) {
            onChange(set(newValue, ['id']))
        } else {
            onChange(unset(['id']))
        }
    }, [onChange])

    const handleEnChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value
        if (newValue) {
            onChange(set(newValue, ['en']))
        } else {
            onChange(unset(['en']))
        }
    }, [onChange])

    // Auto-translate on blur
    const handleIdBlur = useCallback(async () => {
        const indonesianText = currentValue?.id || ''
        const englishText = currentValue?.en || ''

        if (indonesianText.trim() && !englishText.trim() && !isTranslatingRef.current) {
            isTranslatingRef.current = true
            try {
                const translated = await translateToEnglish(indonesianText)
                if (translated) {
                    onChange(set(translated, ['en']))
                }
            } catch (error) {
                console.error('Auto-translate excerpt failed:', error)
            } finally {
                isTranslatingRef.current = false
            }
        }
    }, [currentValue?.id, currentValue?.en, onChange])

    const handleTranslate = useCallback(async () => {
        const indonesianText = currentValue?.id || ''
        return translateToEnglish(indonesianText)
    }, [currentValue?.id])

    const handleSetTranslation = useCallback((translated: string | any[]) => {
        if (typeof translated === 'string') {
            onChange(set(translated, ['en']))
        }
    }, [onChange])

    return (
        <Card padding={3} radius={2} shadow={1} style={{ backgroundColor: 'var(--card-bg-color)' }}>
            <Stack space={4}>
                {/* Indonesian Field */}
                <Stack space={2}>
                    <Flex align="center" gap={2}>
                        <Text size={1} weight="semibold">
                            🇮🇩 Ringkasan
                        </Text>
                        <SanityButton
                            icon={SparklesIcon}
                            text="Generate dari konten"
                            mode="ghost"
                            tone="primary"
                            fontSize={0}
                            padding={2}
                            onClick={handleRegenerate}
                            disabled={!contentValue?.id || contentValue.id.length === 0}
                        />
                    </Flex>
                    <TextArea
                        value={currentValue?.id || ''}
                        onChange={handleIdChange}
                        onBlur={handleIdBlur}
                        placeholder="✨ Otomatis diisi dari konten, atau tulis manual"
                        rows={3}
                        style={{ resize: 'vertical' }}
                    />
                </Stack>

                {/* English Field */}
                <Stack space={2}>
                    <Flex align="center" gap={2}>
                        <Text size={1} weight="semibold">
                            🇬🇧 Summary
                        </Text>
                        <TranslateButton
                            onTranslate={handleTranslate}
                            onSetValue={handleSetTranslation}
                            disabled={!currentValue?.id}
                        />
                    </Flex>
                    <TextArea
                        value={currentValue?.en || ''}
                        onChange={handleEnChange}
                        placeholder="Auto-translated / English summary"
                        rows={3}
                        style={{ resize: 'vertical' }}
                    />
                </Stack>
            </Stack>
        </Card>
    )
}
