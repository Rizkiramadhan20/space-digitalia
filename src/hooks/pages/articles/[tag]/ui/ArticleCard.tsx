import Link from 'next/link'

import Image from 'next/image'

import { formatDistanceToNow } from 'date-fns'

import { id } from 'date-fns/locale'

import { ArticleType } from '@/hooks/pages/articles/articles/lib/schema'

import { formatSlug } from '@/base/helper/formatSlug'

type ArticleCardProps = {
    article: ArticleType
    tag: string
}

export default function ArticleCard({ article, tag }: ArticleCardProps) {
    return (
        <Link href={`/articles/${formatSlug(tag)}/${article.slug}`}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="w-full h-[250px] overflow-hidden">
                <Image
                    src={article.thumbnail}
                    alt={article.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="p-6">
                <span className="text-blue-600 text-xs font-medium tracking-wider uppercase">{article.category}</span>
                <h2 className="text-xl font-bold text-gray-800 mt-2 mb-3 line-clamp-2">{article.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-3 mb-6">{article.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                            <Image
                                src={article.author.photoURL}
                                alt={article.author.name}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-700">{article.author.name}</p>
                            <p className="text-xs text-gray-500">{article.author.role}</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 italic">
                        {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true, locale: id })}
                    </p>
                </div>
            </div>
        </Link>
    )
}