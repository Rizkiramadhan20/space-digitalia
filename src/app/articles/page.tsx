import React from 'react'

import Article from '@/components/ui/article/Article'

import { GoogleTagManager } from '@next/third-parties/google'

export default function page() {
    return (
        <main>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string} />
            <Article />
        </main>
    )
}

