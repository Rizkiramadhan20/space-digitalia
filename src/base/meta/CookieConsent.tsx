'use client'

import { useEffect, useState } from 'react';
import { updateConsent, getStoredConsent } from '@/utils/consent';
import { subscribeToNewContent } from '@/utils/notification';
import toast from 'react-hot-toast';

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const currentConsent = getStoredConsent();
        if (!currentConsent || currentConsent === 'denied') {
            setShowBanner(true);
        }
    }, []);

    const acceptAll = async () => {
        try {
            await updateConsent('granted');

            // Handle notification permission
            if ('Notification' in window) {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    toast.success('Notifikasi berhasil diaktifkan!');
                    subscribeToNewContent((content) => {
                        console.log('New content added:', content);
                    });
                }
            }

            setShowBanner(false);
        } catch (error) {
            console.error('Error accepting consent:', error);
            toast.error('Terjadi kesalahan saat mengaktifkan consent');
        }
    };

    const rejectAll = async () => {
        try {
            await updateConsent('denied');
            localStorage.setItem('notification_prompt_shown', 'true');
            setShowBanner(false);
            toast.success('Preferensi Anda telah disimpan');
        } catch (error) {
            console.error('Error rejecting consent:', error);
            toast.error('Terjadi kesalahan saat menyimpan preferensi');
        }
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-50 border-t">
            <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <p className="text-sm font-medium">
                            Cookies & Notifikasi
                        </p>
                    </div>
                    <p className="text-sm text-gray-600">
                        Kami menggunakan cookies untuk analitik dan notifikasi untuk memberitahu Anda tentang project dan artikel baru. Dengan menerima, Anda menyetujui keduanya.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={rejectAll}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Tolak Semua
                    </button>
                    <button
                        onClick={acceptAll}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <span>Terima Semua</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}