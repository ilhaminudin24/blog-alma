"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, User } from "lucide-react"

export default function AskWidget({ visible = true }: { visible?: boolean }) {
    const [isOpen, setIsOpen] = useState(false)
    const [question, setQuestion] = useState("")
    const [name, setName] = useState("")
    // Honeypot field - should remain empty
    const [hp, setHp] = useState("")
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

    if (!visible) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (status === "submitting") return

        setStatus("submitting")

        try {
            const res = await fetch("/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question,
                    name,
                    honeypot: hp,
                }),
            })

            if (!res.ok) throw new Error("Failed to submit")

            setStatus("success")
            setQuestion("")
            setName("")
            setTimeout(() => {
                setIsOpen(false)
                setStatus("idle")
            }, 3000)
        } catch (error) {
            console.error(error)
            setStatus("error")
            setTimeout(() => setStatus("idle"), 3000)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="w-[90vw] max-w-sm rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl p-6"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-gray-800">Ask Me Anything</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-gray-100/50 rounded-full transition-colors"
                            >
                                <X size={18} className="text-gray-500" />
                            </button>
                        </div>

                        {status === "success" ? (
                            <div className="text-center py-8 text-green-600">
                                <p className="font-medium">Question submitted!</p>
                                <p className="text-sm opacity-80 mt-1">Thanks for asking.</p>
                            </div>
                        ) : status === "error" ? (
                            <div className="text-center py-8 text-red-600">
                                <p className="font-medium">Something went wrong.</p>
                                <p className="text-sm opacity-80 mt-1">Please try again later.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Honeypot - Hidden from users */}
                                <input
                                    type="text"
                                    name="website_url"
                                    value={hp}
                                    onChange={(e) => setHp(e.target.value)}
                                    className="hidden"
                                    autoComplete="off"
                                />

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-500 ml-1">Name (Optional)</label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Anonymous"
                                            className="w-full bg-white/50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-500 ml-1">Your Question</label>
                                    <textarea
                                        required
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        placeholder="What's on your mind?"
                                        rows={3}
                                        className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none placeholder:text-gray-400"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "submitting" || !question.trim()}
                                    className="w-full bg-gray-900 text-white rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === "submitting" ? (
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Send Question <Send size={14} />
                                        </>
                                    )}
                                </button>

                                <p className="text-[10px] text-center text-gray-400">
                                    Questions are moderated before publishing.
                                </p>
                            </form>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/50 flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageCircle size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    )
}
