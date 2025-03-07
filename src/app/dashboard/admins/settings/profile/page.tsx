import React from 'react'

import { Metadata } from 'next'

import ProfileLayout from "@/hooks/dashboard/admins/settings/profile/ProfileLayout"

export const metadata: Metadata = {
    title: 'Profile | SPACE DIGITALIA',
    description: 'Profile Page for Admins',
}

export default function Profile() {
    return (
        <ProfileLayout />
    )
}
