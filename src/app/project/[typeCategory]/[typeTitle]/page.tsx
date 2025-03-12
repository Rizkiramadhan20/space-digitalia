import type { Metadata } from 'next'

import { Fragment } from 'react'

import Script from "next/script";

import ProjectTypeTitleLayout from '@/hooks/pages/project/typeTitle/ProjectTypeTitleLayout'

import { getProjectMetadata } from '@/hooks/pages/project/typeTitle/meta/metadata'

import ProjectTypeTitleHero from '@/hooks/pages/project/typeTitle/ProjectTypeTitleHero'

type Props = {
    params: Promise<{ typeCategory: string; typeTitle: string }>
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
            <Script id="json-ld-project-detail" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": `Project - ${resolvedParams.typeTitle} - Space Digitalia`,
                    "description": `Detail project ${resolvedParams.typeTitle} oleh Space Digitalia`,
                    "url": `https://spacedigitalia.my.id/project/${resolvedParams.typeCategory}/${resolvedParams.typeTitle}`,
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": "Space Digitalia",
                        "url": "https://spacedigitalia.my.id"
                    },
                    "about": {
                        "@type": "CreativeWork",
                        "name": resolvedParams.typeTitle,
                        "creator": {
                            "@type": "Organization",
                            "name": "Space Digitalia"
                        }
                    },
                    "provider": {
                        "@type": "Organization",
                        "name": "Space Digitalia",
                        "url": "https://spacedigitalia.my.id"
                    },
                    "breadcrumb": {
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Project",
                                "item": "https://spacedigitalia.my.id/project"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": resolvedParams.typeCategory,
                                "item": `https://spacedigitalia.my.id/project/${resolvedParams.typeCategory}`
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": resolvedParams.typeTitle,
                                "item": `https://spacedigitalia.my.id/project/${resolvedParams.typeCategory}/${resolvedParams.typeTitle}`
                            }
                        ]
                    }
                })}
            </Script>

            <ProjectTypeTitleHero typeTitle={resolvedParams.typeTitle} />
            <ProjectTypeTitleLayout typeTitle={resolvedParams.typeTitle} />
        </Fragment>
    )
}