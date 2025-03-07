import React from 'react'

import { Metadata } from 'next'

import ServiceLayout from "@/hooks/dashboard/super-admins/service/service/ServiceLayout"

export const metadata: Metadata = {
    title: 'Service | SPACE DIGITALIA',
    description: 'Service Page for Super Admins',
}

export default function Service() {
    return (
        <ServiceLayout />
    )
}

