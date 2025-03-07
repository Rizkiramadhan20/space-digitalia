import { metadata } from "@/base/meta/Metadata";

metadata.manifest = "/manifest.json";

export { metadata };

import "@/base/style/globals.css";

import Providers from "@/base/router/Provider";

import Pathname from "@/base/router/Pathname";

import { openSans } from "@/base/fonts/Fonts";

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M2T56SL8');`,
          }}
          id="gtm-script"
        />
      </head>
      <body
        className={`${openSans.variable} antialiased`}
      >
        <Providers>
          <Pathname>
            {/* GTM NoScript */}
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M2T56SL8"
              height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
            {children}
          </Pathname>
        </Providers>
      </body>
    </html>
  );
}