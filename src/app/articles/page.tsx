import { Fragment } from 'react'

import { Metadata } from 'next'

import ArticleLayout from '@/hooks/pages/articles/articles/ArticleLayout'

import HeroArticle from '@/hooks/pages/articles/articles/HeroArticles'

export const metadata: Metadata = {
    title: "Articles | Space Digitalia",
    description: "Baca artikel terbaru seputar teknologi, pengembangan web, mobile app, UI/UX design, dan tips digital marketing dari Space Digitalia.",
    keywords: "artikel teknologi, artikel web development, artikel mobile app, artikel UI/UX design, blog space digitalia, tips digital marketing",
}

export default function Article() {
    return (
        <Fragment>
            <HeroArticle />
            <ArticleLayout />
        </Fragment>
    )
}

