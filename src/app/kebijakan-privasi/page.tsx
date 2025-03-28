import React, { Fragment } from 'react'

export const metadata = {
    title: 'Kebijakan Privasi | Space Digitalia',
    description: 'Halaman ini berisi kebijakan privasi dari Space Digitalia',
}

import HeroKebijakanPrivasi from '@/hooks/pages/KebijakanPrivasi/ui/HeroKebijakanPrivasi'

import KebijakanPrivasiLayout from '@/hooks/pages/KebijakanPrivasi/KebijakanPrivasiLayout'

export default function page() {
    return (
        <Fragment>
            <HeroKebijakanPrivasi />
            <KebijakanPrivasiLayout />
        </Fragment>
    )
}
