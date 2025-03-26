import { Fragment } from 'react'

import { Metadata } from 'next'

import ArticleLayout from '@/hooks/pages/articles/articles/ArticleLayout'

import HeroArticle from '@/hooks/pages/articles/articles/HeroArticles'

import { GoogleTagManager } from '@next/third-parties/google'

export const metadata: Metadata = {
    title: "Articles | Space Digitalia",
    description: "Baca artikel terbaru seputar teknologi, pengembangan web, mobile app, UI/UX design, dan tips digital marketing dari Space Digitalia.",
    keywords: "artikel teknologi, artikel web development, artikel mobile app, artikel UI/UX design, blog space digitalia, tips digital marketing",

    openGraph: {
        title: "Articles | Space Digitalia",
        description: "Baca artikel terbaru seputar teknologi, pengembangan web, mobile app, UI/UX design, dan tips digital marketing.",
        type: "article",
        locale: "id_ID",
    },

    twitter: {
        card: "summary_large_image",
        title: "Articles | Space Digitalia",
        description: "Artikel terbaru seputar teknologi dan pengembangan digital dari Space Digitalia.",
    },
}

export default function Article() {
    return (
        <Fragment>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string} />
            <HeroArticle />
            <ArticleLayout />
        </Fragment>
    )
}

