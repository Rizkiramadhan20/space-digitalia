export interface PreconnectConfig {
    url: string;
    crossOrigin?: boolean;
}

export interface DnsPrefetchConfig {
    url: string;
}

export interface SiteConfig {
    preconnect: PreconnectConfig[];
    dnsPrefetch: DnsPrefetchConfig[];
}

export interface GTMDataLayer {
    [key: string]: string | number | boolean;
    consent: 'pending' | 'granted' | 'denied';
    analytics_storage: 'granted' | 'denied';
    ad_storage: 'granted' | 'denied';
    functionality_storage: 'granted' | 'denied';
    security_storage: 'granted' | 'denied';
    wait_for_update: number;
}

export const siteConfig: SiteConfig = {
    preconnect: [
        { url: 'https://www.googletagmanager.com', crossOrigin: true },
        { url: 'https://firebase.googleapis.com', crossOrigin: true },
    ],
    dnsPrefetch: [
        { url: 'https://ik.imagekit.io' },
        { url: 'https://firestore.googleapis.com' },
        { url: 'https://identitytoolkit.googleapis.com' },
        { url: 'https://app.midtrans.com' },
    ]
};

export const getGTMConfig = (): GTMDataLayer => ({
    'consent': 'pending',
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'functionality_storage': 'denied',
    'security_storage': 'granted',
    'wait_for_update': 500
});