'use client'

import React, { useCallback, useRef } from 'react'
import { Stack, Flex, Text, TextInput, Card } from '@sanity/ui'
import { set, unset } from 'sanity'
import type { ObjectInputProps } from 'sanity'
import { TranslateButton } from './TranslateButton'
import { translateToEnglish } from '../lib/translateService'

export function LocalizedStringInput(props: ObjectInputProps) {
    const { value, onChange } = props
    const currentValue = value as { id?: string; en?: string } | undefined
    const isTranslatingRef = useRef(false)

    const handleIdChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        if (newValue) {
            onChange(set(newValue, ['id']))
        } else {
            onChange(unset(['id']))
        }
    }, [onChange])

    const handleEnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        if (newValue) {
            onChange(set(newValue, ['en']))
        } else {
            onChange(unset(['en']))
        }
    }, [onChange])

    // Auto-translate on blur: when user finishes typing Indonesian, auto-fill English
    const handleIdBlur = useCallback(async () => {
        const indonesianText = currentValue?.id || ''
        const englishText = currentValue?.en || ''

        // Only auto-translate if Indonesian has text and English is empty
        if (indonesianText.trim() && !englishText.trim() && !isTranslatingRef.current) {
            isTranslatingRef.current = true
            try {
                const translated = await translateToEnglish(indonesianText)
                if (translated) {
                    onChange(set(translated, ['en']))
                }
            } catch (error) {
                console.error('Auto-translate failed:', error)
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
                    <Text size={1} weight="semibold">
                        🇮🇩 Indonesian
                    </Text>
                    <TextInput
                        value={currentValue?.id || ''}
                        onChange={handleIdChange}
                        onBlur={handleIdBlur}
                        placeholder="Masukkan teks dalam Bahasa Indonesia"
                    />
                </Stack>

                {/* English Field with Translate Button */}
                <Stack space={2}>
                    <Flex align="center" gap={2}>
                        <Text size={1} weight="semibold">
                            🇬🇧 English
                        </Text>
                        <TranslateButton
                            onTranslate={handleTranslate}
                            onSetValue={handleSetTranslation}
                            disabled={!currentValue?.id}
                        />
                        {isTranslatingRef.current && (
                            <Text size={0} muted>Translating...</Text>
                        )}
                    </Flex>
                    <TextInput
                        value={currentValue?.en || ''}
                        onChange={handleEnChange}
                        placeholder="Auto-filled / English translation"
                    />
                </Stack>
            </Stack>
        </Card>
    )
}
