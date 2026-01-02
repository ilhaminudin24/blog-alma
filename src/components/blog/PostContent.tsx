export function PostContent({ content }: { content: string }) {
    return (
        <article className="prose prose-lg prose-gray max-w-none 
            prose-headings:font-rounded prose-headings:text-gray-800 
            prose-p:font-sans prose-p:text-gray-600 prose-p:leading-relaxed
            prose-img:rounded-[2rem] prose-img:shadow-sm prose-img:mx-auto prose-img:my-8
            prose-blockquote:not-italic prose-blockquote:font-handwritten prose-blockquote:text-xl prose-blockquote:text-gray-500 prose-blockquote:bg-pastel-lilac/20 prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:rounded-3xl prose-blockquote:border-l-0 prose-blockquote:relative
            prose-blockquote:before:content-[''] prose-blockquote:before:w-1 prose-blockquote:before:h-2/3 prose-blockquote:before:bg-pastel-lilac prose-blockquote:before:absolute prose-blockquote:before:left-0 prose-blockquote:before:top-1/2 prose-blockquote:before:-translate-y-1/2 prose-blockquote:before:rounded-full
            first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-bold first-letter:text-pastel-lilac-border first-letter:font-rounded
            [&_strong]:text-pastel-lilac-darker [&_strong]:font-medium
            ">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
    )
}
