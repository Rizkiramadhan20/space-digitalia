import { Fragment } from 'react'

import { Metadata } from 'next'

import ServicesLayout from '@/hooks/pages/services/ServicesLayout'

import TestiMonialCount from '@/hooks/pages/services/testimonialCount/TestiMonialCount'

import ServiceContent from '@/hooks/pages/services/serviceContent/ServiceContent'

export const metadata: Metadata = {
    title: "Services | SPACE DIGITALIA",
    description: "Services",
}

export default function Services() {
    return (
        <Fragment>
            <ServicesLayout />
            <ServiceContent />
            <TestiMonialCount />
        </Fragment>
    )
}

