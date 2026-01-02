
import Image from 'next/image';

interface AboutGalleryProps {
    images: {
        src: string;
        alt: string;
        caption?: string;
    }[];
}

export function AboutGallery({ images }: AboutGalleryProps) {
    return (
        <section className="py-16 px-4 mb-12">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {images.map((img, index) => (
                        <div key={index} className={`relative group rounded-3xl overflow-hidden shadow-md cursor-pointer ${index === 1 ? 'md:-mt-8' : ''}`}> {/* Staggered effect */}
                            <div className="aspect-[3/4] relative">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white font-medium font-rounded">{img.caption}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
