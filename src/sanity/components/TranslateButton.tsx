'use client'

import React, { useState, useCallback } from 'react'
import { Button, Spinner, useToast } from '@sanity/ui'
import { TranslateIcon } from '@sanity/icons'

interface TranslateButtonProps {
    onTranslate: () => Promise<string | any[]>
    onSetValue: (value: string | any[]) => void
    disabled?: boolean
    isBlock?: boolean
}

export function TranslateButton({ onTranslate, onSetValue, disabled, isBlock }: TranslateButtonProps) {
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const handleTranslate = useCallback(async () => {
        setIsLoading(true)
        try {
            const translated = await onTranslate()
            if (translated) {
                onSetValue(translated)
                toast.push({
                    status: 'success',
                    title: 'Translation complete',
                    description: isBlock
                        ? 'Content has been translated to English'
                        : 'Text has been translated to English'
                })
            }
        } catch (error) {
            console.error('Translation error:', error)
            toast.push({
                status: 'error',
                title: 'Translation failed',
                description: error instanceof Error ? error.message : 'An error occurred during translation'
            })
        } finally {
            setIsLoading(false)
        }
    }, [onTranslate, onSetValue, toast, isBlock])

    return (
        <Button
            mode="ghost"
            tone="primary"
            onClick={handleTranslate}
            disabled={disabled || isLoading}
            title="Translate from Indonesian to English"
            style={{ marginLeft: '8px' }}
        >
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <TranslateIcon />
                    <span style={{ marginLeft: '4px' }}>Translate</span>
                </>
            )}
        </Button>
    )
}
