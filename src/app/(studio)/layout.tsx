export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning>
                <div className="min-h-screen bg-gray-50">
                    {children}
                </div>
            </body>
        </html>
    )
}
