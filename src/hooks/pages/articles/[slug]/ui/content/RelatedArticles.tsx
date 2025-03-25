import { ArticleType } from '@/hooks/pages/articles/articles/lib/schema'

import { format } from 'date-fns'

import Image from 'next/image'

import Link from 'next/link'

import { formatSlug } from '@/base/helper/formatSlug'

type RelatedArticlesProps = {
    articles: ArticleType[]
    currentSlug: string
}

export default function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
    const filteredArticles = articles.filter(article => article.slug !== currentSlug)

    if (filteredArticles.length === 0) return null

    return (
        <div className='bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/60'>
            <h3 className='text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2'>
                Related Articles
            </h3>

            <div className='space-y-2'>
                {filteredArticles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                ))}
            </div>
        </div>
    )
}

function ArticleCard({ article }: { article: ArticleType }) {
    return (
        <Link
            href={`/articles/${formatSlug(article.tags[0])}/${formatSlug(article.slug)}`}
            className='group block p-3 -mx-3 rounded-2xl hover:bg-gray-50/80 transition-all duration-300'
        >
            <div className='flex gap-5 items-center'>
                <div className='relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden ring-1 ring-gray-100'>
                    <Image
                        src={article.thumbnail}
                        alt={article.title}
                        fill
                        className='object-cover transition-all duration-500 group-hover:scale-110'
                    />
                </div>

                <div className='flex-1 space-y-2'>
                    <h4 className='text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors'>
                        {article.title}
                    </h4>

                    <div className='flex items-center gap-3 text-xs text-gray-500'>
                        <span className='flex items-center gap-1.5'>
                            <CalendarIcon />
                            {format(new Date(article.createdAt), 'MMM dd, yyyy')}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const CalendarIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
)