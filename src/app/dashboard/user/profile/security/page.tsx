import React from 'react'

import { Metadata } from 'next'

import SecurityLayout from '@/hooks/dashboard/user/profile/security/SecurityLayout'

export const metadata: Metadata = {
    title: "Security | SPACE DIGITALIA",
    description: "Security",
}

export default function page() {
    return (
        <SecurityLayout />
    )
}
