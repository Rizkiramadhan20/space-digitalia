import { analytics } from './firebase';
import { setConsent, ConsentSettings } from "firebase/analytics";

type ConsentStatus = 'granted' | 'denied';
type DataLayerItem = {
    consent: 'default' | 'update';
    analytics_storage: ConsentStatus;
    ad_storage: ConsentStatus;
};

const requestNotificationPermission = async (): Promise<'granted' | 'denied'> => {
    if (typeof window === 'undefined') return 'denied';

    if (!('Notification' in window)) {
        return 'denied';
    }

    try {
        const permission = await Notification.requestPermission();
        localStorage.setItem('notification_consent', permission);
        return permission as 'granted' | 'denied';
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        return 'denied';
    }
};

const updateAnalyticsConsent = (status: ConsentStatus) => {
    if (analytics) {
        const consentSettings: ConsentSettings = {
            analytics_storage: status,
            ad_storage: status
        };
        setConsent(consentSettings);
    }

    if (typeof window !== 'undefined' && 'dataLayer' in window) {
        ((window as unknown) as { dataLayer: DataLayerItem[] }).dataLayer.push({
            'consent': status === 'granted' ? 'update' : 'default',
            'analytics_storage': status,
            'ad_storage': status
        });
    }

    // Simpan preference di localStorage
    localStorage.setItem('analytics_consent', status);
};

const getStoredConsent = (): ConsentStatus => {
    if (typeof window === 'undefined') return 'denied';
    return (localStorage.getItem('analytics_consent') as ConsentStatus) || 'denied';
};

export {
    requestNotificationPermission,
    updateAnalyticsConsent,
    getStoredConsent
}; 