'use client';

import { useEffect } from 'react';

import { subscribeToNewContent } from '@/utils/notification';

export const useNotification = () => {
    useEffect(() => {
        const setupNotifications = async () => {
            if (typeof window === 'undefined') return;

            if (!('Notification' in window)) {
                console.log('Notifications are not supported in this browser');
                return;
            }

            try {
                const permission = await Notification.requestPermission();
                localStorage.setItem('notification_consent', permission);

                if (permission === 'granted') {
                    subscribeToNewContent((content) => {
                        console.log('New content added:', content);
                    });
                }
            } catch (error) {
                console.error('Error setting up notifications:', error);
            }
        };

        setupNotifications();
    }, []);
}; 