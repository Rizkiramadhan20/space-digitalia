import Link from 'next/link'

import Image from 'next/image'

import { formatDistanceToNow } from 'date-fns'

import { id } from 'date-fns/locale'

import { ArticleType } from '@/hooks/pages/articles/articles/lib/schema'

import { formatSlug } from '@/base/helper/formatSlug'

type TopArticleProps = {
    article: ArticleType
    tag: string
}

export default function TopArticle({ article, tag }: TopArticleProps) {
    return (
        <Link href={`/articles/${formatSlug(tag)}/${article.slug}`}
            className="group block mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 place-items-center bg-white rounded-3xl p-6 border border-gray-100 shadow-sm transition-all duration-300">
                <div className="w-full h-[150px] md:h-[350px] overflow-hidden rounded-2xl">
                    <Image
                        src={article.thumbnail}
                        alt={article.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                <div className="flex flex-col gap-6">
                    <span className="text-blue-600 font-medium text-sm tracking-wider uppercase p-2 bg-blue-50 rounded-full w-fit">{article.category}</span>
                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 line-clamp-3">{article.title}</h2>
                    <p className="text-base text-gray-600 line-clamp-3">{article.description}</p>

                    <div className="divider rounded-full w-full h-[1px] bg-gray-400"></div>

                    <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 overflow-hidden">
                                <Image
                                    src={article.author.photoURL}
                                    alt={article.author.name}
                                    width={50}
                                    height={50}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col">
                                <p className="font-semibold text-gray-800">{article.author.name}</p>
                                <p className="text-sm text-gray-500">{article.author.role}</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 italic">
                            {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true, locale: id })}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}