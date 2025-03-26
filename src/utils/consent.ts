import { analytics } from './firebase';
import { setConsent, ConsentSettings } from "firebase/analytics";

type ConsentStatus = 'granted' | 'denied';
type DataLayerItem = {
    consent: 'default' | 'update';
    analytics_storage: ConsentStatus;
    ad_storage: ConsentStatus;
};

export const updateAnalyticsConsent = (status: ConsentStatus) => {
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

export const getStoredConsent = (): ConsentStatus => {
    if (typeof window === 'undefined') return 'denied';
    return (localStorage.getItem('analytics_consent') as ConsentStatus) || 'denied';
}; 