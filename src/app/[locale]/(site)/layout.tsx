import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MusicPlayer } from "@/components/layout/MusicPlayer";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import AskWidget from "@/components/qna/AskWidget";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="flex-1 pt-20">
                {children}
            </main>
            <Footer />
            <TextureOverlay />
            <MusicPlayer />
            <AskWidget />
        </>
    );
}
