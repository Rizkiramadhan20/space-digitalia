import { Fragment } from 'react'
import { Metadata } from 'next'
import Script from "next/script";
import ArticleLayout from '@/hooks/pages/articles/articles/ArticleLayout'
import HeroArticle from '@/hooks/pages/articles/articles/HeroArticles'

export const metadata: Metadata = {
    title: "Articles | Space Digitalia",
    description: "Baca artikel terbaru seputar teknologi, pengembangan web, mobile app, UI/UX design, dan tips digital marketing dari Space Digitalia.",
    keywords: "artikel teknologi, artikel web development, artikel mobile app, artikel UI/UX design, blog space digitalia, tips digital marketing",

    openGraph: {
        title: "Articles | Space Digitalia",
        description: "Baca artikel terbaru seputar teknologi, pengembangan web, mobile app, UI/UX design, dan tips digital marketing.",
        type: "article",
        locale: "id_ID",
    },

    twitter: {
        card: "summary_large_image",
        title: "Articles | Space Digitalia",
        description: "Artikel terbaru seputar teknologi dan pengembangan digital dari Space Digitalia.",
    },
}

export default function Article() {
    return (
        <Fragment>
            <Script id="json-ld-articles" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "name": "Articles - Space Digitalia",
                    "description": "Artikel terbaru seputar teknologi, pengembangan web, mobile app, UI/UX design, dan tips digital marketing.",
                    "url": "https://spacedigitalia.my.id/articles",
                    "isPartOf": {
                        "@type": "WebSite",
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
                    "inLanguage": "id-ID",
                    "copyrightYear": new Date().getFullYear(),
                    "genre": [
                        "Technology",
                        "Web Development",
                        "Mobile Development",
                        "UI/UX Design",
                        "Digital Marketing"
                    ],
                    "breadcrumb": {
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Articles",
                                "item": "https://spacedigitalia.my.id/articles"
                            }
                        ]
                    }
                })}
            </Script>

            <HeroArticle />
            <ArticleLayout />
        </Fragment>
    )
}

