import React from 'react'

import { Metadata } from 'next'

import ArticleLayout from "@/hooks/dashboard/admins/article/ArticleLayout"

export const metadata: Metadata = {
    title: 'Article | SPACE DIGITALIA',
    description: 'Article Page for Admins',
}

export default function Article() {
    return (
        <ArticleLayout />
    )
}
