import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { question, name, honeypot } = body

        // Honeypot Spam Protection
        if (honeypot) {
            console.warn('Spam detected: honeypot field filled')
            return NextResponse.json({ message: 'Submission accepted' }, { status: 200 })
        }

        if (!question) {
            return NextResponse.json({ message: 'Question is required' }, { status: 400 })
        }

        const token = process.env.SANITY_API_TOKEN

        if (!token) {
            console.error('Missing SANITY_API_TOKEN');
            return NextResponse.json({ message: 'Server configuration error' }, { status: 500 })
        }

        const client = createClient({
            projectId,
            dataset,
            apiVersion,
            token, // Important: secure server-side token
            useCdn: false,
        })

        await client.create({
            _type: 'qna',
            question,
            askerName: name || 'Guest',
            publishedAt: new Date().toISOString(),
        })

        return NextResponse.json({ message: 'Question submitted successfully' }, { status: 200 })
    } catch (error) {
        console.error('Error submitting question:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
