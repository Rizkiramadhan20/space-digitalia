import { Fragment } from 'react'

import { Metadata } from 'next'

import ArticleLayout from '@/hooks/pages/articles/articles/ArticleLayout'

import HeroArticle from '@/hooks/pages/articles/articles/HeroArticles'

export const metadata: Metadata = {
    title: "Articles | SPACE DIGITALIA",
    description: "Articles",
}

export default function Article() {
    return (
        <Fragment>
            <HeroArticle />
            <ArticleLayout />
        </Fragment>
    )
}

