import type { Metadata } from 'next'

import Script from "next/script";

import { Fragment } from 'react';

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
        <Fragment>
            <Script id="json-ld-project-detail" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": `Project - ${resolvedParams.slug} - Space Digitalia`,
                    "description": `Detail lengkap project ${resolvedParams.slug} oleh Space Digitalia`,
                    "url": `https://spacedigitalia.my.id/project/${resolvedParams.typeCategory}/${resolvedParams.typeTitle}/${resolvedParams.slug}`,
                    "datePublished": new Date().toISOString(),
                    "publisher": {
                        "@type": "Organization",
                        "name": "Space Digitalia",
                        "url": "https://spacedigitalia.my.id",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://spacedigitalia.my.id/favicon.ico"
                        }
                    },
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": `https://spacedigitalia.my.id/project/${resolvedParams.typeCategory}/${resolvedParams.typeTitle}/${resolvedParams.slug}`
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
                            },
                            {
                                "@type": "ListItem",
                                "position": 4,
                                "name": resolvedParams.slug,
                                "item": `https://spacedigitalia.my.id/project/${resolvedParams.typeCategory}/${resolvedParams.typeTitle}/${resolvedParams.slug}`
                            }
                        ]
                    }
                })}
            </Script>

            <ProjectDetailsContent slug={resolvedParams.slug} />
        </Fragment>
    )
}