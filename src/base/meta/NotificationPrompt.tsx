'use client';

import { useState, useEffect } from 'react';

export default function NotificationPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const notificationConsent = localStorage.getItem('notification_consent');
        if (!notificationConsent) {
            setShowPrompt(true);
        }
    }, []);

    const handleEnable = async () => {
        if (typeof window === 'undefined') return;

        if (!('Notification' in window)) return;

        try {
            const permission = await Notification.requestPermission();
            localStorage.setItem('notification_consent', permission);

            if (permission === 'granted') {
                setShowPrompt(false);
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50">
            <p className="mb-2">Ingin mendapatkan notifikasi ketika ada project atau artikel baru?</p>
            <div className="flex gap-2">
                <button
                    onClick={() => setShowPrompt(false)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-md"
                >
                    Nanti Saja
                </button>

                <button
                    onClick={handleEnable}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
                >
                    Aktifkan
                </button>
            </div>
        </div>
    );
} 