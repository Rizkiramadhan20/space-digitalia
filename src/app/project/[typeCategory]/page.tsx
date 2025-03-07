import type { Metadata } from 'next'

import { Fragment } from 'react'

import ProjectTypeLayout from '@/hooks/pages/project/typeCategory/ProjectTypeLayout'

import { getProjectMetadata } from '@/hooks/pages/project/typeCategory/meta/metadata'

import ProjectTypeHero from '@/hooks/pages/project/typeCategory/ProjectTypeHero'

type Props = {
    params: Promise<{ typeCategory: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params
    return getProjectMetadata({ params: { typeCategory: resolvedParams.typeCategory } })
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    return (
        <Fragment>
            <ProjectTypeHero typeCategory={resolvedParams.typeCategory} />
            <ProjectTypeLayout typeCategory={resolvedParams.typeCategory} />
        </Fragment>
    )
}