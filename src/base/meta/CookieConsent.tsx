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
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-6 shadow-2xl z-50 border-t border-gray-100">
            <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-3 w-full sm:w-auto">
                    <div className="flex items-center gap-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                            <path d="M8.5 8.5v.01" />
                            <path d="M16 15.5v.01" />
                            <path d="M12 12v.01" />
                        </svg>
                        <p className="text-base font-semibold text-gray-800">
                            Cookies & Notifikasi
                        </p>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                        Kami menggunakan cookies untuk analitik dan notifikasi untuk memberitahu Anda tentang project dan artikel baru. Dengan menerima, Anda menyetujui keduanya.
                    </p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <button
                        onClick={rejectAll}
                        className="flex-1 sm:flex-initial px-5 py-2.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 ease-in-out"
                    >
                        Tolak Semua
                    </button>
                    <button
                        onClick={acceptAll}
                        className="flex-1 sm:flex-initial px-5 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 ease-in-out flex items-center justify-center gap-2 group"
                    >
                        <span>Terima Semua</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 transform transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M5 12h13" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}