import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MusicPlayer } from "@/components/layout/MusicPlayer";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import AskWidget from "@/components/qna/AskWidget";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { getLocale } from "next-intl/server";

export default async function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const settings = await client.fetch(siteSettingsQuery, { language: locale });

    return (
        <>
            <Header />
            <main className="flex-1 pt-20">
                {children}
            </main>
            <Footer />
            <TextureOverlay />
            <MusicPlayer />
            <AskWidget visible={settings?.showAskWidget} />
        </>
    );
}
