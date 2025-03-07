import React from 'react'

import { Metadata } from 'next'

import ProjectLayout from "@/hooks/dashboard/super-admins/project/project/ProjectLayout"

export const metadata: Metadata = {
    title: 'Project | SPACE DIGITALIA',
    description: 'Project Page for Super Admin',
}

export default function Project() {
    return (
        <ProjectLayout />
    )
}
