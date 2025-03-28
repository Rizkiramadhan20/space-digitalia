import React, { Fragment } from 'react'

export const metadata = {
    title: 'Kebijakan Privasi | Space Digitalia',
    description: 'Kebijakan Privasi',
}

import KebijakanPrivasi from '@/hooks/pages/KebijakanPrivasi/KebijakanPrivasi'

import HeroKebijakanPrivasi from '@/hooks/pages/KebijakanPrivasi/HeroKebijakanPrivasi'

export default function page() {
    return (
        <Fragment>
            <HeroKebijakanPrivasi />
            <KebijakanPrivasi />
        </Fragment>
    )
}
