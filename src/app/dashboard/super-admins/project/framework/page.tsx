import React from 'react'

import { Metadata } from 'next'

import FrameworkProjectLayout from "@/hooks/dashboard/super-admins/project/framework/FrameworkProjectLayout"

export const metadata: Metadata = {
    title: 'Framework Project | SPACE DIGITALIA',
    description: 'Framework for Super Admin',
}

export default function Project() {
    return (
        <FrameworkProjectLayout />
    )
}
