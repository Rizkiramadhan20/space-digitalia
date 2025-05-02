import type { Metadata } from 'next'

import ProjectDetailsContent from '@/hooks/pages/project/[slug]/ProjectDetailsContent'

import { generateMetadata as getProjectMetadata } from '@/hooks/pages/project/[slug]/meta/metadata'

type Props = {
    params: Promise<{ typeCategory: string; typeTitle: string; slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params
    return getProjectMetadata({ params: { slug: resolvedParams.slug } })
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    return (
        <ProjectDetailsContent slug={resolvedParams.slug} />
    )
}