// 'use client';

// import { useEffect } from 'react';

// import { subscribeToNewContent } from '@/utils/notification';

// import toast from 'react-hot-toast';

// export const useNotification = () => {
//     useEffect(() => {
//         const setupNotifications = async () => {
//             if (typeof window === 'undefined') return;

//             // Check if browser supports notifications
//             if (!('Notification' in window)) {
//                 console.log('Notifications are not supported in this browser');
//                 return;
//             }

//             // Check if we're on HTTPS
//             if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
//                 console.log('Notifications require HTTPS');
//                 return;
//             }

//             try {
//                 // Check existing permission first
//                 if (Notification.permission === 'granted') {
//                     subscribeToNewContent((content) => {
//                         console.log('New content added:', content);
//                     });
//                     return;
//                 }

//                 // If permission is denied, don't ask again
//                 if (Notification.permission === 'denied') {
//                     console.log('Notification permission was denied');
//                     return;
//                 }

//                 // Request permission
//                 const permission = await Notification.requestPermission();
//                 if (permission === 'granted') {
//                     toast.success('Notifikasi berhasil diaktifkan!');
//                     subscribeToNewContent((content) => {
//                         console.log('New content added:', content);
//                     });
//                 } else {
//                     toast.error('Notifikasi tidak diizinkan');
//                 }
//             } catch (error) {
//                 console.error('Error setting up notifications:', error);
//                 toast.error('Gagal mengaktifkan notifikasi');
//             }
//         };

//         setupNotifications();
//     }, []);
// };
