"use client";

import { Send, User } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Comment = {
    id: string;
    author: string;
    content: string;
    date: string;
    likes: number;
};

const initialComments: Comment[] = [
    {
        id: '1',
        author: 'Sarah',
        content: 'Relate banget sama cerita ini! Aku juga lagi ngalamin hal yang sama akhir-akhir ini. Thank you for sharing! 💜',
        date: '2 min ago',
        likes: 12
    },
    {
        id: '2',
        author: 'Dinda',
        content: 'Foto-fotonya aesthetic banget! Pake kamera apa?',
        date: '1 hour ago',
        likes: 5
    }
];

export function PostComments() {
    const t = useTranslations('comments');

    return (
        <section className="mt-12">
            <h3 className="font-handwritten text-3xl text-gray-700 mb-8 flex items-center gap-2">
                💭 {t('title')} (3)
            </h3>

            {/* Input Area */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-8">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder={t('namePlaceholder')}
                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pastel-lilac/50 font-sans outline-none placeholder:text-gray-400 mb-2"
                    />
                    <textarea
                        rows={3}
                        placeholder={t('commentPlaceholder')}
                        className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-pastel-lilac/50 font-sans outline-none placeholder:text-gray-400 resize-none"
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button className="bg-pastel-lilac text-gray-700 px-6 py-2 rounded-xl font-bold text-sm hover:bg-pastel-lilac-border transition-colors flex items-center gap-2">
                        <Send size={16} /> {t('submit')}
                    </button>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {initialComments.map((comment) => (
                    <div key={comment.id} className="group">
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
                            {/* Decorative tape effect */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pastel-mint/30 transform -rotate-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-pastel-lilac/30 flex items-center justify-center text-pastel-lilac-darker shrink-0">
                                    <User size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-gray-700 font-rounded">{comment.author}</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 font-sans">
                                            <span>{comment.date}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 font-sans text-sm leading-relaxed">{comment.content}</p>

                                    <div className="flex items-center gap-4 mt-3">
                                        <button className="text-xs text-gray-400 hover:text-pastel-pink-border flex items-center gap-1 transition-colors">
                                            <span className="text-lg">♡</span> {comment.likes}
                                        </button>
                                        <button className="text-xs text-gray-400 hover:text-pastel-lilac-border transition-colors">
                                            {t('reply')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
