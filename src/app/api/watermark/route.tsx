import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import satori from 'satori';

// Switch to Node.js runtime for sharp
export const runtime = 'nodejs';

// Revalidate font cache every day
export const revalidate = 86400;

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

        // Fetch Font (Robota) for Satori
        // Using a reliable CDN for the font file. Satori requires TTF/WOFF (not WOFF2)
        const fontUrl = 'https://cdnjs.cloudflare.com/ajax/libs/roboto-fontface/0.10.0/fonts/roboto/Roboto-Black.ttf';
        const fontResponse = await fetch(fontUrl);
        const fontData = await fontResponse.arrayBuffer();

        // Grid calculations
        const patternWidth = 300;
        const patternHeight = 200;
        const cols = Math.ceil(width / patternWidth) + 1;
        const rows = Math.ceil(height / patternHeight) + 1;
        const textToRepeat = '@shealmalia';

        // Generate SVG using Satori
        // Satori converts HTML/JSX + Font -> SVG Paths -> No system fonts needed on Vercel
        const svg = await satori(
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                {Array.from({ length: cols * rows }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: `${patternWidth}px`,
                            height: `${patternHeight}px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: 'rotate(-30deg)',
                        }}
                    >
                        <span
                            style={{
                                fontSize: `${Math.max(24, Math.floor(width / 40))}px`,
                                fontWeight: 900,
                                color: 'rgba(255, 255, 255, 0.25)',
                                // textShadow is not fully supported in satori the same way, 
                                // but we can simulate or just rely on color/opacity.
                                // Satori supports some CSS, sticking to basic flex and typography is safest.
                            }}
                        >
                            {textToRepeat}
                        </span>
                    </div>
                ))}
            </div>,
            {
                width,
                height,
                fonts: [
                    {
                        name: 'Roboto',
                        data: fontData,
                        weight: 900,
                        style: 'normal',
                    },
                ],
            }
        );

        // Composite the Satori-generated SVG watermark
        const outputBuffer = await image
            .composite([{
                input: Buffer.from(svg),
                top: 0,
                left: 0,
            }])
            .png()
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
