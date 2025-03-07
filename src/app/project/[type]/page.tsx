import { Fragment } from 'react'

import type { Metadata } from 'next'

import ProjectDetailsContent from '@/hooks/pages/project/[type]/ProjectTypeLayout'

import { generateMetadata as getProjectMetadata } from '@/hooks/pages/project/[type]/meta/metadata'

import HeroCheckout from '@/hooks/pages/project/[type]/content/HeroCheckout'

type Props = {
    params: Promise<{ type: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(): Promise<Metadata> {
    return getProjectMetadata()
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    return (
        <Fragment>
            <HeroCheckout typeCategory={resolvedParams.type} />
            <ProjectDetailsContent typeCategory={resolvedParams.type} />
        </Fragment>
    )
}