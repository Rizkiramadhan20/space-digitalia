import React from 'react'

import { Metadata } from 'next'

import UserLayout from '@/hooks/dashboard/user/UserLayout'

export const metadata: Metadata = {
    title: "Dashboard User | SPACE DIGITALIA",
    description: "Dashboard User",
}

export default function page() {
    return (
        <UserLayout />
    )
}
