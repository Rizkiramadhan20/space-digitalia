import type { Metadata } from 'next'

import { Fragment } from 'react'

import Script from "next/script";

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
            <Script id="json-ld-project-category" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": `Projects - ${resolvedParams.typeCategory} - Space Digitalia`,
                    "description": `Koleksi project ${resolvedParams.typeCategory} terbaik dari Space Digitalia`,
                    "url": `https://spacedigitalia.my.id/project/${resolvedParams.typeCategory}`,
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": "Space Digitalia",
                        "url": "https://spacedigitalia.my.id"
                    },
                    "about": {
                        "@type": "Thing",
                        "name": `Projects - ${resolvedParams.typeCategory}`,
                        "description": `Project kategori ${resolvedParams.typeCategory} oleh Space Digitalia`
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
                            }
                        ]
                    }
                })}
            </Script>

            <ProjectTypeHero typeCategory={resolvedParams.typeCategory} />
            <ProjectTypeLayout typeCategory={resolvedParams.typeCategory} />
        </Fragment>
    )
}