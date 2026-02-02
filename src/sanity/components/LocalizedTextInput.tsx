'use client'

import React, { useCallback } from 'react'
import { Stack, Flex, Text, TextArea, Card } from '@sanity/ui'
import { set, unset } from 'sanity'
import type { ObjectInputProps } from 'sanity'
import { TranslateButton } from './TranslateButton'
import { translateToEnglish } from '../lib/translateService'

export function LocalizedTextInput(props: ObjectInputProps) {
    const { value, onChange } = props
    const currentValue = value as { id?: string; en?: string } | undefined

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
                        Indonesian
                    </Text>
                    <TextArea
                        value={currentValue?.id || ''}
                        onChange={handleIdChange}
                        placeholder="Masukkan teks dalam Bahasa Indonesia"
                        rows={4}
                        style={{ resize: 'vertical' }}
                    />
                </Stack>

                {/* English Field with Translate Button */}
                <Stack space={2}>
                    <Flex align="center" gap={2}>
                        <Text size={1} weight="semibold">
                            English
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
                        placeholder="English translation"
                        rows={4}
                        style={{ resize: 'vertical' }}
                    />
                </Stack>
            </Stack>
        </Card>
    )
}
