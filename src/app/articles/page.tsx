import { Fragment } from 'react'

import { Metadata } from 'next'

import ArticleLayout from '@/hooks/pages/articles/articles/ArticleLayout'

import HeroArticle from '@/hooks/pages/articles/articles/HeroArticles'

export const metadata: Metadata = {
    title: "Articles | Space Digitalia",
    description: "Baca artikel terbaru seputar teknologi, pengembangan web, mobile app, UI/UX design, dan tips digital marketing dari Space Digitalia.",
    keywords: "artikel teknologi, artikel web development, artikel mobile app, artikel UI/UX design, blog space digitalia, tips digital marketing",

    openGraph: {
        title: "Articles | Space Digitalia",
        description: "Baca artikel terbaru seputar teknologi, pengembangan web, mobile app, UI/UX design, dan tips digital marketing dari Space Digitalia.",
        type: "website",
        locale: "id_ID",
    },

    twitter: {
        card: "summary_large_image",
        title: "Articles | Space Digitalia",
        description: "Baca artikel terbaru seputar teknologi, pengembangan web, mobile app, UI/UX design, dan tips digital marketing.",
    },

    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID,
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

