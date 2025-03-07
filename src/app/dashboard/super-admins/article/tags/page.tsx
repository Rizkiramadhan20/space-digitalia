import React from 'react'

import { Metadata } from 'next'

import TagsLayout from '@/hooks/dashboard/super-admins/article/tags/TagsLayout'

export const metadata: Metadata = {
    title: 'Tags | SPACE DIGITALIA',
    description: 'Tags Page for Super Admin',
}

export default function TagsPage() {
    return (
        <TagsLayout />
    )
}
