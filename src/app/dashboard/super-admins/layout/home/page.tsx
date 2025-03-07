import React from 'react'

import { Metadata } from 'next'

import HomeLayout from '@/hooks/dashboard/super-admins/layout/home/HomeLayout'

export const metadata: Metadata = {
    title: 'Home | SPACE DIGITALIA',
    description: 'Home Page for Super Admin',
}

export default function HomePage() {
    return (
        <HomeLayout />
    )
}
