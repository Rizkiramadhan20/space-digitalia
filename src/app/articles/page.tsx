import { Fragment } from 'react'

import { Metadata } from 'next'

import ArticleLayout from '@/hooks/pages/articles/articles/ArticleLayout'

import HeroArticle from '@/hooks/pages/articles/articles/HeroArticles'

export const metadata: Metadata = {
    title: "Articles | SPACE DIGITALIA",
    description: "Articles",
    keywords: "Articles, SPACE DIGITALIA",

    openGraph: {
        title: "Articles | SPACE DIGITALIA",
        description: "Articles",
    },

    verification: {
        other: {
            'google-tag-manager': process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string,
        },
    },
}

export default function Article() {
    return (
        <Fragment>
            <HeroArticle />
            <ArticleLayout />
        </Fragment>
    )
}

