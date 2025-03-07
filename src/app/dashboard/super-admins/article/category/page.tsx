import React from 'react'

import { Metadata } from 'next'

import CategoryLayout from '@/hooks/dashboard/super-admins/article/category/CategoryLayout'

export const metadata: Metadata = {
    title: 'Category | SPACE DIGITALIA',
    description: 'Category Page for Super Admin',
}

export default function CategoryPage() {
    return (
        <CategoryLayout />
    )
}
