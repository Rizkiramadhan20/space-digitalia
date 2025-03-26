'use client';

import { useNotification } from '@/hooks/useNotification';

export default function NotificationWrapper({ children }: { children: React.ReactNode }) {
    useNotification();
    return <>{children}</>;
} 