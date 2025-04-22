'use client'

import { GoogleTagManager } from '@next/third-parties/google'

export function GoogleTagManagerScript() {
    return (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string} />
    )
} 