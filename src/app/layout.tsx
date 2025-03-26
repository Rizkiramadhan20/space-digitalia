import { metadata } from "@/base/meta/Metadata";

import "@/base/style/globals.css";

import Providers from "@/base/router/Provider";

import Pathname from "@/base/router/Pathname";

import { openSans } from "@/base/fonts/Fonts";

import { GoogleTagManager } from '@next/third-parties/google'

import { getStoredConsent } from '@/utils/consent'

import CookieConsent from '@/base/meta/CookieConsent';

import NotificationPrompt from '@/base/meta/NotificationPrompt';

metadata.manifest = "/manifest.json";

export { metadata };

import NotificationWrapper from '@/components/NotificationWrapper';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://firebase.googleapis.com" />
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="preconnect" href="https://identitytoolkit.googleapis.com" />
        <link rel="preconnect" href="https://app.midtrans.com" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
      </head>
      <body className={`${openSans.variable} antialiased`}>
        <NotificationPrompt />
        <CookieConsent />
        {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
          <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
            dataLayer={{
              'consent': 'default',
              'analytics_storage': getStoredConsent(),
              'ad_storage': getStoredConsent()
            }}
          />
        )}
        <NotificationWrapper>
          <Providers>
            <Pathname>
              {children}
            </Pathname>
          </Providers>
        </NotificationWrapper>
      </body>
    </html>
  );
}
