import Image from 'next/image'

import { ArticleContentProps } from "@/hooks/pages/articles/[slug]/ui/types/ArticleDetails"

export default function ArticleContent({ content, thumbnail, title }: ArticleContentProps) {
    return (
        <>
            <div className="w-full md:h-[600px] h-[400px] relative rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-gray-200/60">
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    className='object-cover w-full h-full transition-all duration-700 hover:scale-105'
                    priority
                />
            </div>
            <div className="prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:tracking-tight
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                
                prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8
                prose-h2:text-3xl prose-h2:font-semibold prose-h2:mb-6 prose-h2:mt-12
                prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-gray-800 prose-h3:mt-10 prose-h3:mb-4
                
                prose-ul:mt-6 prose-ul:mb-8 prose-ul:space-y-3
                prose-ol:mt-6 prose-ol:mb-8 prose-ol:space-y-3
                prose-li:text-gray-700 prose-li:leading-relaxed
                [&_ol>li]:list-decimal
                [&_ul>li]:list-disc
                [&_li[data-list=bullet]]:list-disc
                [&_ol>li]:ml-4
                [&_ul>li]:ml-4
                
                prose-strong:text-gray-900 prose-strong:font-semibold
                
                prose-a:text-indigo-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                
                prose-blockquote:border-l-4 prose-blockquote:border-indigo-500
                prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-8
                prose-blockquote:text-gray-700 prose-blockquote:italic
                prose-blockquote:bg-indigo-50/50 prose-blockquote:rounded-r-2xl
                
                [&_.ql-code-block-container]:mockup-code 
                [&_.ql-code-block-container]:w-full 
                [&_.ql-code-block-container]:my-6
                [&_.ql-code-block-container]:bg-gray-900
                [&_.ql-code-block-container]:p-4
                [&_.ql-code-block]:before:content-['$'] 
                [&_.ql-code-block]:before:mr-2 
                [&_.ql-code-block]:before:text-red-500
                [&_.ql-code-block]:flex
                [&_.ql-code-block]:items-center
                [&_.ql-code-block]:text-sm
                [&_.ql-code-block]:font-mono
                [&_.ql-code-block]:px-3
                [&_.ql-code-block]:py-1
                
                [&_.ql-code-block_span.hljs-keyword]:text-pink-400
                [&_.ql-code-block_span.hljs-string]:text-green-400
                [&_.ql-code-block_span.hljs-number]:text-orange-400
                [&_.ql-code-block_span.hljs-function]:text-blue-400
                [&_.ql-code-block_span.hljs-comment]:text-gray-500
                [&_.ql-code-block_span.hljs-variable]:text-purple-400
                [&_.ql-code-block_span.hljs-operator]:text-yellow-400
                [&_.ql-code-block]:text-gray-300
                
                prose-code:bg-gray-100 
                prose-code:text-gray-800 
                prose-code:px-2 
                prose-code:py-0.5 
                prose-code:rounded-md
                prose-code:font-mono
                
                [&_.ql-ui]:hidden"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </>
    )
}