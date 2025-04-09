import { Fragment } from 'react'

import ProjectLayout from '@/hooks/pages/project/project/ProjectLayout'

import HeroProject from '@/hooks/pages/project/project/ui/HeroProject'

import { GoogleTagManager } from '@next/third-parties/google'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Project | SPACE DIGITALIA',
    description: 'Project',
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

