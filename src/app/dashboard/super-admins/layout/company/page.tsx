import React from 'react'

import { Metadata } from 'next'

import CompanyLayout from '@/hooks/dashboard/super-admins/layout/company/CompanyLayout'

export const metadata: Metadata = {
    title: 'Company | SPACE DIGITALIA',
    description: 'Company Page for Super Admin',
}

export default function CompanyPage() {
    return (
        <CompanyLayout />
    )
}
