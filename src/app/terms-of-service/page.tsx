import React, { Fragment } from 'react'

export const metadata = {
    title: 'Terms of Service | Space Digitalia',
    description: 'Halaman ini berisi syarat dan ketentuan penggunaan layanan Space Digitalia',
}

import HeroTermsOfService from '@/hooks/pages/TermsofService/HeroTermsOfService'

import TermsOfService from '@/hooks/pages/TermsofService/TermsOfService'

export default function page() {
    return (
        <Fragment>
            <HeroTermsOfService />
            <TermsOfService />
        </Fragment>
    )
}
