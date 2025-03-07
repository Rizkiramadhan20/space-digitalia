import React from 'react'

import { Metadata } from 'next'

import AdminLayout from '@/hooks/dashboard/super-admins/accounts/admins/AdminLayout'

export const metadata: Metadata = {
    title: 'Admin | SPACE DIGITALIA',
    description: 'Admin Page for Super Admin',
}

export default function AdminPage() {
    return (
        <AdminLayout />
    )
}
