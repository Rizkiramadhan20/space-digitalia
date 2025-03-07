import React from 'react'

import { Metadata } from 'next'

import ServiceLayout from '@/hooks/dashboard/super-admins/layout/service/ServiceLayout'

export const metadata: Metadata = {
    title: 'Service | SPACE DIGITALIA',
    description: 'Service Page for Super Admin',
}

export default function ServicePage() {
    return (
        <ServiceLayout />
    )
}
