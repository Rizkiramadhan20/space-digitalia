import React from 'react'

import { Metadata } from 'next'

import LicenceProjectLayout from "@/hooks/dashboard/super-admins/project/license/LicenceProjectLayout"

export const metadata: Metadata = {
    title: 'Licence Project | SPACE DIGITALIA',
    description: 'Licence for Super Admin',
}

export default function Project() {
    return (
        <LicenceProjectLayout />
    )
}
