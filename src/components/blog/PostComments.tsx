"use client";

import { Send, User } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';



export function PostComments({ postId, initialComments = [] }: { postId: string, initialComments?: any[] }) {
    const t = useTranslations('comments');
    const [comments, setComments] = useState(initialComments);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        if (!name.trim() || !content.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/comment', {
                method: 'POST',
                body: JSON.stringify({ _id: postId, name, comment: content }),
            });
            const data = await res.json();

            if (res.ok) {
                // Optimistic update
                const newComment = {
                    _id: Math.random().toString(), // Temporary ID
                    name,
                    content,
                    _createdAt: new Date().toISOString(),
                };
                setComments([newComment, ...comments]);
                setName('');
                setContent('');
                setMessage('Comment submitted successfully!');
            } else {
                setMessage(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error(error);
            setMessage('Failed to submit comment');
        } finally {
            setIsSubmitting(false);
            // Clear message after 3 seconds
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <section className="mt-12">
            <h3 className="font-handwritten text-3xl text-gray-700 mb-8 flex items-center gap-2">
                💭 {t('title')} ({comments.length})
            </h3>

            {/* Input Area */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-8">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder={t('namePlaceholder')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pastel-lilac/50 font-sans outline-none placeholder:text-gray-400 mb-2"
                    />
                    <textarea
                        rows={3}
                        placeholder={t('commentPlaceholder')}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-pastel-lilac/50 font-sans outline-none placeholder:text-gray-400 resize-none"
                    ></textarea>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-pastel-lilac-darker font-bold">{message}</span>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-pastel-lilac text-gray-700 px-6 py-2 rounded-xl font-bold text-sm hover:bg-pastel-lilac-border transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <Send size={16} /> {isSubmitting ? 'Sending...' : t('submit')}
                    </button>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.length === 0 ? (
                    <p className="text-gray-500 text-center italic">No comments yet. Be the first to share your thoughts! ✨</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment._id} className="group">
                            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
                                {/* Decorative tape effect */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pastel-mint/30 transform -rotate-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-pastel-lilac/30 flex items-center justify-center text-pastel-lilac-darker shrink-0">
                                        <User size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-gray-700 font-rounded">{comment.name}</h4>
                                            <div className="flex items-center gap-2 text-xs text-gray-400 font-sans">
                                                <span>{new Date(comment._createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 font-sans text-sm leading-relaxed">{comment.content}</p>

                                        <div className="flex items-center gap-4 mt-3">
                                            {/* <button className="text-xs text-gray-400 hover:text-pastel-pink-border flex items-center gap-1 transition-colors">
                                                <span className="text-lg">♡</span> {comment.likes || 0}
                                            </button> */}
                                            {/* Reply functionality to be implemented */}
                                            {/* <button className="text-xs text-gray-400 hover:text-pastel-lilac-border transition-colors">
                                                {t('reply')}
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
