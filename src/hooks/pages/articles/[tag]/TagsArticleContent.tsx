'use client'
import { useEffect, useState } from 'react'

import TagsArticleSkelaton from '@/hooks/pages/articles/[tag]/TagsArticleSkelaton'

import TagsArticleNotFound from '@/hooks/pages/articles/[tag]/TagsArticleNotFound'

import { fetchArticlesByTag } from '@/hooks/pages/articles/[tag]/lib/FetchTags'

import { ArticleType } from '@/hooks/pages/articles/articles/lib/schema'

import TopArticle from '@/hooks/pages/articles/[tag]/ui/TopArticle'

import ArticleCard from '@/hooks/pages/articles/[tag]/ui/ArticleCard'

type Props = { tags: string[] }

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

    const topArticle = articles[0]
    const otherArticles = articles.slice(1)

    return (
        <section className="min-h-full bg-gradient-to-b from-gray-50/50 to-white">
            <div className="container px-4 lg:px-8 xl:px-10 py-2 lg:py-6">
                {topArticle && <TopArticle article={topArticle} tag={tags[0]} />}

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 place-items-center bg-white rounded-3xl p-6 border border-gray-100'>
                    {otherArticles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            tag={tags[0]}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
