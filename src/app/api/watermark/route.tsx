import { NextRequest } from 'next/server';
import sharp from 'sharp';

// Switch to Node.js runtime for sharp
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return new Response('Missing url parameter', { status: 400 });
    }

    try {
        // Fetch the source image
        const response = await fetch(imageUrl);
        if (!response.ok) {
            return new Response('Failed to fetch image', { status: response.status });
        }

        const arrayBuffer = await response.arrayBuffer();
        const inputBuffer = Buffer.from(arrayBuffer);

        // Get image metadata
        const image = sharp(inputBuffer);
        const metadata = await image.metadata();
        const width = metadata.width || 1200;
        const height = metadata.height || 630;

        // Create SVG Watermark Pattern
        // We'll create a single SVG that covers the whole image
        // This is much faster than compositing hundreds of separate text layers
        const fontSize = Math.max(24, Math.floor(width / 40));
        const opacity = 0.25;
        const textToRepeat = '@shealmalia';

        // Grid calculations
        const patternWidth = 300;
        const patternHeight = 200;
        const cols = Math.ceil(width / patternWidth) + 1;
        const rows = Math.ceil(height / patternHeight) + 1;

        let svgContent = '';

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = (c * patternWidth) + (patternWidth / 2);
                const y = (r * patternHeight) + (patternHeight / 2);

                // SVG text element with rotation
                svgContent += `
                    <text 
                        x="${x}" 
                        y="${y}" 
                        font-family="sans-serif" 
                        font-size="${fontSize}" 
                        font-weight="900" 
                        fill="rgba(255, 255, 255, ${opacity})" 
                        text-anchor="middle" 
                        dominant-baseline="middle" 
                        transform="rotate(-30, ${x}, ${y})"
                        style="text-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                    >${textToRepeat}</text>
                `;
            }
        }

        const svgImage = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                ${svgContent}
            </svg>
        `;

        // Composite the watermark
        const outputBuffer = await image
            .composite([{
                input: Buffer.from(svgImage),
                top: 0,
                left: 0,
            }])
            .png() // or .jpeg() depending on preference, PNG preserves quality well
            .toBuffer();

        return new Response(outputBuffer as unknown as BodyInit, {
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });

    } catch (error) {
        console.error('Watermark generation error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
