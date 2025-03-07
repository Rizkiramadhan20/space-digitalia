import React from 'react'

import { Metadata } from 'next'

import UserLayout from '@/hooks/dashboard/super-admins/accounts/user/UserLayout'

export const metadata: Metadata = {
    title: 'User | SPACE DIGITALIA',
    description: 'User Page for Super Admin',
}

export default function UserPage() {
    return (
        <UserLayout />
    )
}
