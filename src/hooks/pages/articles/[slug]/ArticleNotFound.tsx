import React from 'react'

import { BackgroundPattern } from '@/hooks/pages/articles/[slug]/ui/ArticleNotFound/Background'

import { ContentSection } from '@/hooks/pages/articles/[slug]/ui/ArticleNotFound/ContentSection'

export default function ArticleNotFound() {
    return (
        <section className='relative min-h-full overflow-hidden'>
            <BackgroundPattern />
            <ContentSection />
        </section>
    )
}