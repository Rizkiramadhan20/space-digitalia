'use client';

import dynamic from 'next/dynamic';

import type { GTMDataLayer } from '@/types/config';

const GoogleTagManager = dynamic(
    () => import('@next/third-parties/google').then(mod => mod.GoogleTagManager),
    { ssr: false }
);

interface GTMProviderProps {
    gtmId: string;
    dataLayer: GTMDataLayer;
}

export default function GTMProvider({ gtmId, dataLayer }: GTMProviderProps) {
    return <GoogleTagManager gtmId={gtmId} dataLayer={dataLayer} />;
}