import React from 'react'

import { Metadata } from 'next'

import TypeProjectLayout from "@/hooks/dashboard/super-admins/project/type/TypeProjectLayout"

export const metadata: Metadata = {
    title: 'Type Project | SPACE DIGITALIA',
    description: 'Type Project for Super Admin',
}

export default function Project() {
    return (
        <TypeProjectLayout />
    )
}
