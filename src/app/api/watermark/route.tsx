import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return new Response('Missing url parameter', { status: 400 });
    }

    // Attempt to extract dimensions from Sanity URL
    // Format: .../filename-WIDTHxHEIGHT.extension
    const dimensionMatch = imageUrl.match(/-(\d+)x(\d+)\./);
    const width = dimensionMatch ? parseInt(dimensionMatch[1], 10) : 1200;
    const height = dimensionMatch ? parseInt(dimensionMatch[2], 10) : 630;

    // Calculate number of watermarks to ensure coverage
    // Grid approach: estimated 300px spacing
    const cols = Math.ceil(width / 300) + 1;
    const rows = Math.ceil(height / 200) + 1;
    const watermarks = Array.from({ length: cols * rows });

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Background Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={imageUrl}
                    alt="Background"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 0,
                    }}
                />

                {/* Watermark Overlay Grid */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 10,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignContent: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                >
                    {watermarks.map((_, i) => (
                        <div
                            key={i}
                            style={{
                                width: '300px',
                                height: '200px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: 'rotate(-30deg)',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: Math.max(24, Math.floor(width / 40)), // Responsive font size
                                    fontWeight: 900,
                                    color: 'rgba(255, 255, 255, 0.25)',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    whiteSpace: 'nowrap',
                                    userSelect: 'none',
                                }}
                            >
                                @shealmalia
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        ),
        {
            width,
            height,
        }
    );
}
