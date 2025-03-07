import React from 'react'

import { Metadata } from 'next'

import SecurityLayout from "@/hooks/dashboard/super-admins/settings/security/SecurityLayout"

export const metadata: Metadata = {
    title: 'Security | SPACE DIGITALIA',
    description: 'Security Page for Super Admins',
}

export default function Security() {
    return (
        <SecurityLayout />
    )
}

