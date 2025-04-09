import React, { Fragment } from 'react'

import ArticleLayout from '@/hooks/pages/articles/articles/ArticleLayout'

import HeroArticle from '@/hooks/pages/articles/articles/HeroArticles'

import { GoogleTagManager } from '@next/third-parties/google'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Articles | SPACE DIGITALIA',
    description: 'Articles',
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

