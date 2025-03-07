import type { Metadata } from 'next'

import ArticleDetails from '@/hooks/pages/articles/[slug]/ArticleDetails'

import { generateMetadata as getArticleMetadata } from '@/hooks/pages/articles/[slug]/lib/meta/metadata'

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params
    return getArticleMetadata({ params: { slug: resolvedParams.slug } })
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    return <ArticleDetails slug={resolvedParams.slug} />
}