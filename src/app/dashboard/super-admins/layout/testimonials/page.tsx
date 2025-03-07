import React from 'react'

import { Metadata } from 'next'

import TestimonialsLayout from '@/hooks/dashboard/super-admins/layout/testimonials/TestimonialsLayout'

export const metadata: Metadata = {
    title: 'Testimonials | SPACE DIGITALIA',
    description: 'Testimonials Page for Super Admin',
}

export default function TestimonialsPage() {
    return (
        <TestimonialsLayout />
    )
}
