
import { MessageCircle } from 'lucide-react';

interface AboutContentProps {
    storyTitle?: string;
    story: string[];
    funFactsTitle?: string;
    funFacts: {
        icon: string;
        label: string;
        value: string;
    }[];
}

export function AboutContent({ storyTitle = "My Little Story", story, funFactsTitle = "Fun Facts", funFacts }: AboutContentProps) {
    return (
        <section className="py-12 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Main Story Column */}
            <div className="md:col-span-2 space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-pastel-peach/30 rounded-lg">
                        <MessageCircle className="w-6 h-6 text-orange-400" />
                    </div>
                    <h2 className="text-3xl font-handwritten text-gray-800">{storyTitle}</h2>
                </div>

                <div className="prose prose-lg text-gray-600 font-rounded space-y-6 leading-relaxed">
                    {story.map((paragraph, index) => (
                        <p key={index} className="bg-white/40 p-6 rounded-2xl border border-white/60 shadow-sm backdrop-blur-sm hover:bg-white/60 transition-colors">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>

            {/* Fun Facts Sidebar */}
            <div className="space-y-6">
                <h2 className="text-2xl font-handwritten text-gray-800 mb-6 text-center md:text-left">{funFactsTitle}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                    {funFacts.map((fact, index) => (
                        <div key={index} className="group p-4 bg-white/50 hover:bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                            <div className="flex items-center gap-4">
                                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                                    {fact.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{fact.label}</p>
                                    <p className="text-base font-medium text-gray-700">{fact.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
