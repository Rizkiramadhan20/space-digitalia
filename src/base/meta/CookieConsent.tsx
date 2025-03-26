'use client'

import { useEffect, useState } from 'react';

import { updateAnalyticsConsent, getStoredConsent } from '@/utils/consent';

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const currentConsent = getStoredConsent();
        if (currentConsent === 'denied') {
            setShowBanner(true);
        }
    }, []);

    const acceptAll = () => {
        updateAnalyticsConsent('granted');
        setShowBanner(false);
    };

    const rejectAll = () => {
        updateAnalyticsConsent('denied');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-50">
            <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm">
                    Kami menggunakan cookies untuk menganalisis penggunaan website dan meningkatkan pengalaman Anda.
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={rejectAll}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                        Tolak Semua
                    </button>
                    <button
                        onClick={acceptAll}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Terima Semua
                    </button>
                </div>
            </div>
        </div>
    );
}