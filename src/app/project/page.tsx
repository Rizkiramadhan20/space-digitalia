import { Fragment } from 'react'

import { Metadata } from 'next'

import Script from "next/script";

import ProjectLayout from '@/hooks/pages/project/project/ProjectLayout'

import HeroProject from '@/hooks/pages/project/project/content/HeroProject'

export const metadata: Metadata = {
    title: "Project | Space Digitalia",
    description: "Project dan karya terbaik Space Digitalia dalam pengembangan website, aplikasi mobile, dan desain UI/UX. Lihat hasil kerja kami di sini.",
    keywords: "portfolio space digitalia, project space digitalia, karya space digitalia, web development portfolio, mobile app portfolio, UI/UX design portfolio",

    openGraph: {
        title: "Project | Space Digitalia",
        description: "Project dan karya terbaik Space Digitalia dalam pengembangan website, aplikasi mobile, dan desain UI/UX. Lihat hasil kerja kami di sini.",
        type: "website",
        locale: "id_ID",
    },

    twitter: {
        card: "summary_large_image",
        title: "Project | Space Digitalia",
        description: "Project dan karya terbaik Space Digitalia dalam pengembangan website, aplikasi mobile, dan desain UI/UX.",
    },
}

export default function Project() {
    return (
        <Fragment>
            <Script id="json-ld-project" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Project Space Digitalia",
                    "description": "Project dan karya terbaik Space Digitalia dalam pengembangan website, aplikasi mobile, dan desain UI/UX.",
                    "url": "https://spacedigitalia.my.id/project",
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": "Space Digitalia",
                        "url": "https://spacedigitalia.my.id"
                    },
                    "about": {
                        "@type": "Thing",
                        "name": "Web Development and Design Projects",
                        "description": "Koleksi project pengembangan website, aplikasi mobile, dan desain UI/UX oleh Space Digitalia"
                    },
                    "provider": {
                        "@type": "Organization",
                        "name": "Space Digitalia",
                        "url": "https://spacedigitalia.my.id"
                    }
                })}
            </Script>

            <HeroProject />
            <ProjectLayout />
        </Fragment>
    )
}

