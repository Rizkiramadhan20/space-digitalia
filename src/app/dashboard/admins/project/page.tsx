import React from 'react'

import { Metadata } from 'next'

import ProjectLayout from "@/hooks/dashboard/admins/project/ProjectLayout"

export const metadata: Metadata = {
    title: 'Project | SPACE DIGITALIA',
    description: 'Project Page for Admins',
}

export default function Project() {
    return (
        <ProjectLayout />
    )
}
