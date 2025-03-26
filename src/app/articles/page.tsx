'use client';

import { Fragment } from 'react'

import ArticleLayout from '@/hooks/pages/articles/articles/ArticleLayout'

import HeroArticle from '@/hooks/pages/articles/articles/HeroArticles'

import { GoogleTagManager } from '@next/third-parties/google'

import NotificationWrapper from '@/components/NotificationWrapper'

export default function Article() {
    return (
        <Fragment>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string} />
            <NotificationWrapper>
                <HeroArticle />
                <ArticleLayout />
            </NotificationWrapper>
        </Fragment>
    )
}

