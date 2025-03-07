import React from 'react'

import { Metadata } from 'next'

import FeaturedLayout from '@/hooks/dashboard/super-admins/layout/featured/FeaturedLayout'

export const metadata: Metadata = {
    title: 'Featured | SPACE DIGITALIA',
    description: 'Featured Page for Super Admin',
}

export default function FeaturedPage() {
    return (
        <FeaturedLayout />
    )
}
