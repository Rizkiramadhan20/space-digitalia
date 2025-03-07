import React from 'react'

import { Metadata } from 'next'

import ArticleLayout from '@/hooks/dashboard/super-admins/article/article/ArticleLayout'

export const metadata: Metadata = {
    title: 'Article | SPACE DIGITALIA',
    description: 'Article Page for Super Admin',
}

export default function ArticlePage() {
    return (
        <ArticleLayout />
    )
}
