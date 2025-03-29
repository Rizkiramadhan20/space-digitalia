import Link from 'next/link'

import { formatSlug } from '@/base/helper/formatSlug'

import { ArticleTagsProps } from "@/hooks/pages/articles/[slug]/ui/types/ArticleDetails"

export default function ArticleTags({ tags }: ArticleTagsProps) {
    return (
        <div className='mt-16 space-y-4'>
            <h2 className='text-xl font-semibold text-gray-900'>
                Tags
            </h2>
            <div className='flex flex-wrap gap-2 md:gap-3'>
                {tags.map((tag) => (
                    <Link
                        href={`/articles/${formatSlug(tag)}`}
                        key={tag}
                        className='inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 
                            rounded-full hover:bg-indigo-100 duration-200 
                            border border-indigo-100/50 hover:border-indigo-200/50
                            shadow-sm hover:shadow-md hover:-translate-y-0.5 transform transition-all'
                    >
                        #<span className="ml-1">{tag}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}