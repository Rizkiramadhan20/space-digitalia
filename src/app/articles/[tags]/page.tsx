import { Fragment } from 'react'

import type { Metadata } from 'next'

import TagsArticleContent from '@/hooks/pages/articles/[tag]/TagsArticleContent'

import { generateMetadata as getArticleMetadata } from '@/hooks/pages/articles/[tag]/meta/metadata'

import TagsArticleHero from '@/hooks/pages/articles/[tag]/TagsArticleHero'

import TagsArticleNotFound from '@/hooks/pages/articles/[tag]/TagsArticleNotFound'

type Props = {
    params: Promise<{ tags: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params
    const tags = resolvedParams.tags.split(',').filter(Boolean)
    return getArticleMetadata(tags[0])
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    const tags = resolvedParams.tags.split(',').filter(Boolean)

    if (!tags.length) {
        return <TagsArticleNotFound tags={[]} />
    }

    return (
        <Fragment>
            <TagsArticleHero tags={tags} />
            <TagsArticleContent tags={tags} />
        </Fragment>
    )
}
