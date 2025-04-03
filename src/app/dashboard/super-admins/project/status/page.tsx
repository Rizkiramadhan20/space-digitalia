import React from 'react'

import { Metadata } from 'next'

import StatusProjectLayout from "@/hooks/dashboard/super-admins/project/status/StatusProjectLayout"

export const metadata: Metadata = {
    title: 'Status Project | SPACE DIGITALIA',
    description: 'Status Project for Super Admin',
}

export default function StatusProject() {
    return (
        <StatusProjectLayout />
    )
}
