import { Link } from '@/i18n/routing';
import { NotebookPen, User } from 'lucide-react';
import { Button } from '../ui/button';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useTranslations } from 'next-intl';

export function Header() {
    const t = useTranslations('nav');
    const tHeader = useTranslations('header');

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b border-pastel-lilac/30">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-pastel-pink p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                        <NotebookPen className="w-5 h-5 text-white fill-white" />
                    </div>
                    <span className="font-rounded font-bold text-xl text-gray-800 tracking-tight">
                        {tHeader('siteName')} <span className="text-xs text-gray-400 font-normal ml-1 hidden sm:inline-block"></span>
                    </span>
                </Link>

                <nav className="flex items-center gap-4">
                    {/* Placeholder for future links */}
                    <Link href="/about">
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex rounded-full">
                            <User className="w-4 h-4 mr-1" />{t('about')}
                        </Button>
                    </Link>
                    <LanguageSwitcher />
                </nav>
            </div>
        </header>
    );
}
