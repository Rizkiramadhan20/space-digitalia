import { Fragment } from 'react'

import { Metadata } from 'next'

import ProjectLayout from '@/hooks/pages/project/project/ProjectLayout'

import HeroProject from '@/hooks/pages/project/project/ui/HeroProject'

import { GoogleTagManager } from '@next/third-parties/google'

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
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string} />
            <HeroProject />
            <ProjectLayout />
        </Fragment>
    )
}

