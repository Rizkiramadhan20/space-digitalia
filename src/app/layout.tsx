import { metadata } from "@/base/meta/Metadata";

import "@/base/style/globals.css";

import Providers from "@/base/router/Provider";

import Pathname from "@/base/router/Pathname";

import { openSans } from "@/base/fonts/Fonts";

import { GoogleTagManager } from '@next/third-parties/google'

metadata.manifest = "/manifest.json";

export { metadata };

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
        <link rel="preload" href="/styles/critical.css" as="style" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
      </head>
      <body className={`${openSans.variable} antialiased`}>
        {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
          <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
            dataLayer={{
              'consent': 'default',
              'analytics_storage': 'denied',
              'ad_storage': 'denied'
            }}
          />
        )}
        <Providers>
          <Pathname>
            {children}
          </Pathname>
        </Providers>
      </body>
    </html>
  );
}
