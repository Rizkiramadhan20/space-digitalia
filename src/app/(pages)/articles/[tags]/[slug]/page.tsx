import type { Metadata } from 'next'

import { Fragment } from 'react'

import Script from "next/script";

import ArticleDetails from '@/hooks/pages/articles/[slug]/ArticleDetails'

import { generateMetadata as getArticleMetadata } from '@/hooks/pages/articles/[slug]/lib/meta/metadata'

type Props = {
    params: Promise<{ tags: string; slug: string }>
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
    const tags = resolvedParams.tags.split(',').filter(Boolean)

    return (
        <Fragment>
            <Script id="json-ld-article-detail" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": `Article - ${resolvedParams.slug} - Space Digitalia`,
                    "url": `https://spacedigitalia.my.id/articles/${resolvedParams.tags}/${resolvedParams.slug}`,
                    "datePublished": new Date().toISOString(),
                    "dateModified": new Date().toISOString(),
                    "author": {
                        "@type": "Organization",
                        "name": "Space Digitalia",
                        "url": "https://spacedigitalia.my.id"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "Space Digitalia",
                        "url": "https://spacedigitalia.my.id",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://spacedigitalia.my.id/favicon.ico"
                        }
                    },
                    "keywords": tags.join(", "),
                    "inLanguage": "id-ID",
                    "isPartOf": {
                        "@type": "Blog",
                        "name": "Blog Space Digitalia",
                        "url": "https://spacedigitalia.my.id/articles"
                    },
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": `https://spacedigitalia.my.id/articles/${resolvedParams.tags}/${resolvedParams.slug}`
                    },
                    "breadcrumb": {
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Articles",
                                "item": "https://spacedigitalia.my.id/articles"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": `Tagged: ${tags.join(", ")}`,
                                "item": `https://spacedigitalia.my.id/articles/${resolvedParams.tags}`
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": resolvedParams.slug,
                                "item": `https://spacedigitalia.my.id/articles/${resolvedParams.tags}/${resolvedParams.slug}`
                            }
                        ]
                    }
                })}
            </Script>

            <ArticleDetails slug={resolvedParams.slug} />
        </Fragment>
    )
}