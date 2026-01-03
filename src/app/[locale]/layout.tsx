import type { Metadata } from "next";
import { Fredoka, Bubblegum_Sans, Nunito } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing'; // Wait, I didn't create i18n/routing.ts? I created request.ts and middleware.ts.
// Middleware config has locales. I should probably ensure locale is valid.

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const bubblegumSans = Bubblegum_Sans({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-bubblegum"
});

export const metadata: Metadata = {
    title: "Ruang Cerita Alma",
    description: "A personal blog sharing stories and lifestyle.",
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!['en', 'id'].includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages({ locale });

    return (
        <html lang={locale}>
            <body className={`${nunito.variable} ${fredoka.variable} ${bubblegumSans.variable} antialiased bg-[#FDFBF7] text-gray-800 min-h-screen flex flex-col`}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
