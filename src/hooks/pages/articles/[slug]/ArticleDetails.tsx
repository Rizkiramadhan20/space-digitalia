"use client"

import React, { useEffect, useState } from 'react'

import { FetchArticleDetails, FetchRelatedArticles } from '@/hooks/pages/articles/[slug]/lib/FetchArticle'

import { ArticleType } from '@/hooks/pages/articles/articles/lib/schema'

import Image from 'next/image'

import ArticleSkeleton from '@/hooks/pages/articles/[slug]/ArticleDetailsSkelaton'

import ArticleNotFound from '@/hooks/pages/articles/[slug]/ArticleNotFound'

import Breadcrumb from '@/hooks/pages/articles/[slug]/ui/content/Breadcrumb'

import ArticleHeader from '@/hooks/pages/articles/[slug]/ui/content/ArticleHeader'

import ArticleContent from '@/hooks/pages/articles/[slug]/ui/content/hooks/ArticleContent'

import ArticleTags from '@/hooks/pages/articles/[slug]/ui/content/hooks/ArticleTags'

import AuthorCard from '@/hooks/pages/articles/[slug]/ui/content/hooks/AuthorCard'

import RelatedArticles from '@/hooks/pages/articles/[slug]/ui/content/RelatedArticles'

import { useArticleViews } from '@/hooks/pages/articles/[slug]/ui/utils/useArticleViews'

export default function ArticleDetails({ slug }: { slug: string }) {
    const [articleData, setArticleData] = useState<ArticleType[]>([])

    const [loading, setLoading] = useState(true)

    const [relatedArticles, setRelatedArticles] = useState<ArticleType[]>([])

    const { viewCount } = useArticleViews(slug)

    useEffect(() => {
        const unsubscribe = FetchArticleDetails(slug, (article: ArticleType[]) => {
            setArticleData(article)
            setLoading(false)
        })

        FetchRelatedArticles(slug, (articles: ArticleType[]) => {
            setRelatedArticles(articles)
        })

        return () => {
            unsubscribe()
        }
    }, [slug])

    if (loading) {
        return <ArticleSkeleton />
    }

    const filteredArticle = articleData.find(item => item.slug === slug)

    if (!filteredArticle) {
        return <ArticleNotFound />
    }

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <section className='min-h-full bg-gradient-to-b from-gray-50/50 to-white'>
            <div className="container mx-auto px-4 lg:px-8 xl:px-10 py-2 lg:py-12 max-w-7xl">
                <div className="mb-8 lg:mb-12">
                    <Breadcrumb slug={slug} tags={filteredArticle.tags} />
                </div>

                <ArticleHeader
                    title={filteredArticle.title}
                    category={filteredArticle.category}
                    createdAt={filteredArticle.createdAt}
                    viewCount={viewCount}
                    thumbnail={filteredArticle.thumbnail}
                    currentUrl={currentUrl}
                />

                <div className="w-full md:h-[600px] h-[400px] relative rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-gray-200/60">
                    <Image
                        src={filteredArticle.thumbnail}
                        alt={filteredArticle.title}
                        fill
                        className='object-cover w-full h-full transition-all duration-700 hover:scale-105'
                        priority
                    />
                </div>

                <div className='flex flex-col lg:flex-row gap-12 lg:gap-20'>
                    <div className='lg:w-2/3'>
                        <ArticleContent
                            content={filteredArticle.content}
                            thumbnail={filteredArticle.thumbnail}
                            title={filteredArticle.title}
                        />
                        <ArticleTags tags={filteredArticle.tags} />
                    </div>

                    <div className='lg:w-1/3'>
                        <div className='space-y-6 lg:sticky lg:top-24'>
                            <AuthorCard author={filteredArticle.author} />
                            <RelatedArticles
                                articles={relatedArticles}
                                currentSlug={slug}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
