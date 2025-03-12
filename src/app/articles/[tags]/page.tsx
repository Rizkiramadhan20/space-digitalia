import { Fragment } from 'react'
import type { Metadata } from 'next'
import Script from "next/script";
import TagsArticleContent from '@/hooks/pages/articles/[tag]/TagsArticleContent'
import { generateMetadata as getArticleMetadata } from '@/hooks/pages/articles/[tag]/meta/metadata'
import TagsArticleHero from '@/hooks/pages/articles/[tag]/TagsArticleHero'
import TagsArticleNotFound from '@/hooks/pages/articles/[tag]/TagsArticleNotFound'

type Props = {
    params: Promise<{ tags: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params
    const tags = resolvedParams.tags.split(',').filter(Boolean)
    return getArticleMetadata(tags[0])
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    const tags = resolvedParams.tags.split(',').filter(Boolean)

    if (!tags.length) {
        return <TagsArticleNotFound tags={[]} />
    }

    return (
        <Fragment>
            <Script id="json-ld-articles-tags" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": `Articles - Tagged: ${tags.join(", ")} - Space Digitalia`,
                    "description": `Kumpulan artikel Space Digitalia dengan tag: ${tags.join(", ")}`,
                    "url": `https://spacedigitalia.my.id/articles/${tags.join(",")}`,
                    "isPartOf": {
                        "@type": "Blog",
                        "name": "Blog Space Digitalia",
                        "url": "https://spacedigitalia.my.id/articles"
                    },
                    "about": {
                        "@type": "Thing",
                        "name": tags.join(", "),
                        "description": `Artikel-artikel terkait ${tags.join(", ")}`
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
                    "inLanguage": "id-ID",
                    "keywords": tags.join(", "),
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
                                "item": `https://spacedigitalia.my.id/articles/${tags.join(",")}`
                            }
                        ]
                    }
                })}
            </Script>

            <TagsArticleHero tags={tags} />
            <TagsArticleContent tags={tags} />
        </Fragment>
    )
}
