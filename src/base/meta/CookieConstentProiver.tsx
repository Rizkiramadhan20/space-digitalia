'use client';

import dynamic from 'next/dynamic';

const CookieConsent = dynamic(() => import('@/base/meta/CookieConsent'), {
    ssr: false
});

export default function CookieConsentProvider() {
    return <CookieConsent />;
}