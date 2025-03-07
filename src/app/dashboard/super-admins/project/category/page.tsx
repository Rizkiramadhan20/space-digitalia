import React from 'react'

import { Metadata } from 'next'

import CategoryProjectLayout from "@/hooks/dashboard/super-admins/project/category/CategoryProjectLayout"

export const metadata: Metadata = {
    title: 'Category Project | SPACE DIGITALIA',
    description: 'Category Project for Super Admin',
}

export default function Project() {
    return (
        <CategoryProjectLayout />
    )
}
