'use client';

import { Fragment } from 'react'

import ProjectLayout from '@/hooks/pages/project/project/ProjectLayout'

import HeroProject from '@/hooks/pages/project/project/ui/HeroProject'

import { GoogleTagManager } from '@next/third-parties/google'

import NotificationWrapper from '@/components/NotificationWrapper'

export default function Project() {
    return (
        <Fragment>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string} />
            <NotificationWrapper>
                <HeroProject />
                <ProjectLayout />
            </NotificationWrapper>
        </Fragment>
    )
}

