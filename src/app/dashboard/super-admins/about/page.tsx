import React from 'react'

import { Metadata } from 'next'

import AboutLayout from '@/hooks/dashboard/super-admins/about/about/AboutLayout'

export const metadata: Metadata = {
    title: 'About | SPACE DIGITALIA',
    description: 'About Page for Super Admin',
}

export default function AboutPage() {
    return (
        <AboutLayout />
    )
}
