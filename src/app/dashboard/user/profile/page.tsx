import React from 'react'

import { Metadata } from 'next'

import ProfileLayout from '@/hooks/dashboard/user/profile/profile/ProfileLayout'

export const metadata: Metadata = {
    title: "Profile | SPACE DIGITALIA",
    description: "Profile",
}

export default function page() {
    return (
        <ProfileLayout />
    )
}
