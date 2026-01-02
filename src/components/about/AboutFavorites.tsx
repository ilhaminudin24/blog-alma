
import { Star } from 'lucide-react';

interface AboutFavoritesProps {
    favorites: {
        category: string;
        items: string[];
        color: string;
    }[];
}

export function AboutFavorites({ favorites }: AboutFavoritesProps) {
    return (
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <span className="inline-block p-3 bg-pastel-mint/50 rounded-full mb-4">
                        <Star className="w-6 h-6 text-green-500 fill-green-500/50" />
                    </span>
                    <h2 className="text-4xl font-handwritten text-gray-800">Things I Love</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {favorites.map((fav, index) => (
                        <div key={index} className="relative group">
                            <div className={`absolute inset-0 ${fav.color} rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-40`}></div>
                            <div className="relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300 h-full">
                                <h3 className="text-2xl font-handwritten text-gray-700 mb-6 border-b-2 border-dashed border-gray-100 pb-2">{fav.category}</h3>
                                <ul className="space-y-3">
                                    {fav.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-gray-600 font-rounded">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
