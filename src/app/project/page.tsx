import { Fragment } from 'react'

import { Metadata } from 'next'

import ProjectLayout from '@/hooks/pages/project/project/ProjectLayout'

import HeroProject from '@/hooks/pages/project/project/content/HeroProject'

export const metadata: Metadata = {
    title: "Project | SPACE DIGITALIA",
    description: "Project",
}

export default function Project() {
    return (
        <Fragment>
            <HeroProject />
            <ProjectLayout />
        </Fragment>
    )
}

