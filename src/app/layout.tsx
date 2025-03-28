import dynamic from 'next/dynamic';

import { metadata } from "@/base/meta/Metadata";

import "@/base/style/globals.css";

import { openSans } from "@/base/fonts/Fonts";

import { siteConfig } from '@/types/config';

import { getGTMConfig } from '@/types/config';

import GTMProvider from '@/base/meta/GTMProvider';

import CookieConsentProvider from '@/base/meta/CookieConstentProiver';

const Providers = dynamic(() => import("@/base/router/Provider"), {
  ssr: true
});

const Pathname = dynamic(() => import("@/base/router/Pathname"), {
  ssr: true
});

metadata.manifest = "/manifest.json";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {siteConfig.preconnect.map(({ url, crossOrigin }) => (
          <link
            key={url}
            rel="preconnect"
            href={url}
            {...(crossOrigin && { crossOrigin: "anonymous" })}
          />
        ))}

        {siteConfig.dnsPrefetch.map(({ url }) => (
          <link key={url} rel="dns-prefetch" href={url} />
        ))}
      </head>
      <body className={`${openSans.variable} antialiased`}>
        <CookieConsentProvider />
        {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
          <GTMProvider
            gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
            dataLayer={getGTMConfig()}
          />
        )}
        <Providers>
          <Pathname>{children}</Pathname>
        </Providers>
      </body>
    </html>
  );
}
