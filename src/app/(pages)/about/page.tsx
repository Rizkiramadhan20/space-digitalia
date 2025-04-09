import React, { Fragment } from 'react'

import { Metadata } from 'next'

import AboutLayout from '@/hooks/pages/about/about/AboutLayout'

import Featured from '@/hooks/pages/about/featured/Featured'

import Team from '@/hooks/pages/about/team/Team'

export const metadata: Metadata = {
    title: "About Us | SPACE DIGITALIA",
    description: "Halaman tentang space digitalia",
}

export default function AboutPage() {
    return (
        <Fragment>
            <AboutLayout />
            <Featured />
            <Team />
        </Fragment>
    )
}
