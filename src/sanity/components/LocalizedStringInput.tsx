'use client'

import React, { useCallback } from 'react'
import { Stack, Flex, Text, TextInput, Card } from '@sanity/ui'
import { set, unset } from 'sanity'
import type { ObjectInputProps } from 'sanity'
import { TranslateButton } from './TranslateButton'
import { translateToEnglish } from '../lib/translateService'

export function LocalizedStringInput(props: ObjectInputProps) {
    const { value, onChange } = props
    const currentValue = value as { id?: string; en?: string } | undefined

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
                    <TextInput
                        value={currentValue?.id || ''}
                        onChange={handleIdChange}
                        placeholder="Masukkan teks dalam Bahasa Indonesia"
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
                    <TextInput
                        value={currentValue?.en || ''}
                        onChange={handleEnChange}
                        placeholder="English translation"
                    />
                </Stack>
            </Stack>
        </Card>
    )
}
