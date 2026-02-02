'use client'

import React, { useCallback } from 'react'
import { Stack, Flex, Text, Card } from '@sanity/ui'
import { set, unset } from 'sanity'
import type { ObjectInputProps, ObjectMember } from 'sanity'
import { TranslateButton } from './TranslateButton'
import { translateBlocksToEnglish } from '../lib/translateService'

export function LocalizedBlockInput(props: ObjectInputProps) {
    const { value, onChange, renderDefault, members } = props
    const currentValue = value as { id?: any[]; en?: any[] } | undefined

    const handleTranslate = useCallback(async () => {
        const indonesianBlocks = currentValue?.id || []
        return translateBlocksToEnglish(indonesianBlocks)
    }, [currentValue?.id])

    const handleSetTranslation = useCallback((translated: string | any[]) => {
        if (Array.isArray(translated)) {
            onChange(set(translated, ['en']))
        }
    }, [onChange])

    // Find the Indonesian and English field members
    const idMember = members?.find((m): m is ObjectMember => m.kind === 'field' && m.name === 'id')
    const enMember = members?.find((m): m is ObjectMember => m.kind === 'field' && m.name === 'en')

    return (
        <Card padding={4} radius={2} shadow={1} style={{ backgroundColor: 'var(--card-bg-color)' }}>
            <Stack space={5}>
                {/* Indonesian Field */}
                <Stack space={3}>
                    <Text size={2} weight="semibold">
                        Indonesian
                    </Text>
                    {idMember && (
                        <div style={{ width: '100%' }}>
                            {renderDefault({
                                ...props,
                                members: [idMember],
                            })}
                        </div>
                    )}
                </Stack>

                {/* English Field with Translate Button */}
                <Stack space={3}>
                    <Flex align="center" gap={2}>
                        <Text size={2} weight="semibold">
                            English
                        </Text>
                        <TranslateButton
                            onTranslate={handleTranslate}
                            onSetValue={handleSetTranslation}
                            disabled={!currentValue?.id || currentValue.id.length === 0}
                            isBlock={true}
                        />
                    </Flex>
                    {enMember && (
                        <div style={{ width: '100%' }}>
                            {renderDefault({
                                ...props,
                                members: [enMember],
                            })}
                        </div>
                    )}
                </Stack>
            </Stack>
        </Card>
    )
}
