import { Fragment } from 'react'

import { Metadata } from 'next'

import ProjectLayout from '@/hooks/pages/project/project/ProjectLayout'

import HeroProject from '@/hooks/pages/project/project/content/HeroProject'

export const metadata: Metadata = {
    title: "Project | Space Digitalia",
    description: "Portofolio project dan karya terbaik Space Digitalia dalam pengembangan website, aplikasi mobile, dan desain UI/UX. Lihat hasil kerja kami di sini.",
    keywords: "portfolio space digitalia, project space digitalia, karya space digitalia, web development portfolio, mobile app portfolio, UI/UX design portfolio",

    openGraph: {
        title: "Project Portfolio | Space Digitalia",
        description: "Portofolio project dan karya terbaik Space Digitalia dalam pengembangan website, aplikasi mobile, dan desain UI/UX. Lihat hasil kerja kami di sini.",
        type: "website",
        locale: "id_ID",
    },

    twitter: {
        card: "summary_large_image",
        title: "Project Portfolio | Space Digitalia",
        description: "Portofolio project dan karya terbaik Space Digitalia dalam pengembangan website, aplikasi mobile, dan desain UI/UX.",
    },
}

export default function Project() {
    return (
        <Fragment>
            <HeroProject />
            <ProjectLayout />
        </Fragment>
    )
}

