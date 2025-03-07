'use client'
import { useEffect, useState } from 'react'

import TagsArticleSkelaton from '@/hooks/pages/articles/[tag]/TagsArticleSkelaton'

import TagsArticleNotFound from '@/hooks/pages/articles/[tag]/TagsArticleNotFound'

import { fetchArticlesByTag } from '@/hooks/pages/articles/[tag]/lib/FetchTags'

import { ArticleType } from '@/hooks/pages/articles/articles/lib/schema'

type Props = { tags: string[] }

import Link from 'next/link'

import Image from 'next/image'

import { formatDistanceToNow } from 'date-fns'

import { id } from 'date-fns/locale'

import { formatSlug } from '@/base/helper/formatSlug'

export default function TagsArticleContent({ tags }: Props) {
    const [articles, setArticles] = useState<ArticleType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!tags.length) return

        const fetchData = async () => {
            try {
                setIsLoading(true)

                let data = await fetchArticlesByTag(tags[0])

                if (data.length === 0 && tags[0].includes('-')) {
                    const tagWithSpaces = tags[0].replace(/-/g, ' ')
                    data = await fetchArticlesByTag(tagWithSpaces)
                }

                setArticles(data.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                ))
            } catch (error) {
                console.error("Error:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [tags])

    if (isLoading) return <TagsArticleSkelaton />

    if (articles.length === 0) return <TagsArticleNotFound tags={tags} />

    const topArticle = articles.length > 0 ? articles[0] : null;

    const otherArticles = articles.length > 1 ? articles.slice(1) : [];

    return (
        <section className="min-h-full bg-gradient-to-b from-gray-50/50 to-white">
            <div className="container px-4 lg:px-8 xl:px-10 py-2 lg:py-6">
                {
                    topArticle && (
                        <Link href={`/articles/${formatSlug(tags[0])}/${topArticle.slug}`}
                            className="group block mb-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 place-items-center bg-white rounded-3xl p-6 border border-gray-100 shadow-sm transition-all duration-300">
                                <div className="w-full h-[150px] md:h-[350px] overflow-hidden rounded-2xl">
                                    <Image
                                        src={topArticle.thumbnail}
                                        alt={topArticle.title}
                                        width={500}
                                        height={500}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <div className="flex flex-col gap-6">
                                    <span className="text-blue-600 font-medium text-sm tracking-wider uppercase p-2 bg-blue-50 rounded-full w-fit">{topArticle.category}</span>
                                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 line-clamp-3">{topArticle.title}</h2>
                                    <p className="text-base text-gray-600 line-clamp-3">{topArticle.description}</p>

                                    <div className="divider rounded-full w-full h-[1px] bg-gray-400"></div>

                                    <div className="flex justify-between items-center gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 overflow-hidden">
                                                <Image
                                                    src={topArticle.author.photoURL}
                                                    alt={topArticle.author.name}
                                                    width={50}
                                                    height={50}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <p className="font-semibold text-gray-800">{topArticle.author.name}</p>
                                                <p className="text-sm text-gray-500">{topArticle.author.role}</p>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-500 italic">
                                            {formatDistanceToNow(new Date(topArticle.createdAt), { addSuffix: true, locale: id })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                }

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 place-items-center bg-white rounded-3xl p-6 border border-gray-100'>
                    {
                        otherArticles.map((article) => (
                            <Link href={`/articles/${formatSlug(tags[0])}/${article.slug}`}
                                key={article.id}
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
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
