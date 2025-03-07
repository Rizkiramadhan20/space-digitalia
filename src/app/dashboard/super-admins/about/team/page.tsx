import React from 'react'

import { Metadata } from 'next'

import TeamLayout from '@/hooks/dashboard/super-admins/about/team/TeamLayout'

export const metadata: Metadata = {
    title: 'Team | SPACE DIGITALIA',
    description: 'Team Page for Super Admin',
}

export default function TeamPage() {
    return (
        <TeamLayout />
    )
}
