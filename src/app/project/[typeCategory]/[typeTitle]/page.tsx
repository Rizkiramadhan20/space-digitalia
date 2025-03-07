import type { Metadata } from 'next'

import { Fragment } from 'react'

import ProjectTypeTitleLayout from '@/hooks/pages/project/typeTitle/ProjectTypeTitleLayout'

import { getProjectMetadata } from '@/hooks/pages/project/typeTitle/meta/metadata'

import ProjectTypeTitleHero from '@/hooks/pages/project/typeTitle/ProjectTypeTitleHero'

type Props = {
    params: Promise<{ typeTitle: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params
    return getProjectMetadata({ params: { typeTitle: resolvedParams.typeTitle } })
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    return (
        <Fragment>
            <ProjectTypeTitleHero typeTitle={resolvedParams.typeTitle} />
            <ProjectTypeTitleLayout typeTitle={resolvedParams.typeTitle} />
        </Fragment>
    )
}