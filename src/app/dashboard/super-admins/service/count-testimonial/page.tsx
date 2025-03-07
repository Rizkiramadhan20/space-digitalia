import React from 'react'

import { Metadata } from 'next'

import CountTestimonialLayout from "@/hooks/dashboard/super-admins/service/count-testimonial/CountLayout"

export const metadata: Metadata = {
    title: 'Count Testimonial | SPACE DIGITALIA',
    description: 'Count Testimonial Page for Super Admins',
}

export default function CountTestimonial() {
    return (
        <CountTestimonialLayout />
    )
}

