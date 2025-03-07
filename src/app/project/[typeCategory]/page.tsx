import { Fragment } from 'react'

import type { Metadata } from 'next'

import ProjectTypeDetails from '@/hooks/pages/project/typeCategory/ProjectTypeLayout'

import { getProjectMetadata } from '@/hooks/pages/project/typeCategory/meta/metadata'

import TypeCategoryProject from '@/hooks/pages/project/typeCategory/content/TypeCategoryProject'

type Props = {
    params: Promise<{ typeCategory: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params
    return getProjectMetadata({ params: { type: resolvedParams.typeCategory } })
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    return <Fragment>
        <TypeCategoryProject typeCategory={resolvedParams.typeCategory} />
        <ProjectTypeDetails typeCategory={resolvedParams.typeCategory} />
    </Fragment>
}