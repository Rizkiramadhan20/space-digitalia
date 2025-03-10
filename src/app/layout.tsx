import { metadata } from "@/base/meta/Metadata";
import "@/base/style/globals.css";
import Providers from "@/base/router/Provider";
import Pathname from "@/base/router/Pathname";
import { openSans } from "@/base/fonts/Fonts";
import Script from "next/script";

metadata.manifest = "/manifest.json";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
          />
        )}

        {/* JSON-LD Schema.org */}
        <Script id="json-ld-product" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Space Digitalia",
            "description": "Spesialis dalam SEO, Desain UI/UX, serta Pengembangan Aplikasi Mobile dan Web. Kami menggabungkan kreativitas dengan teknologi terbaru untuk hasil terbaik.",
            "brand": {
              "@type": "Brand",
              "name": "Space Digitalia"
            },
            "offers": {
              "@type": "Offer",
              "price": "2000000",
              "priceCurrency": "IDR"
            },
            "url": "https://spacedigitalia.my.id/project",
            "image": "https://spacedigitalia.my.id/favicon.ico",
            "category": "Digital Agency",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingCount": "100",
              "ratingValue": "4.5"
            }
          })}
        </Script>
      </head>
      <body className={`${openSans.variable} antialiased`}>
        <Providers>
          <Pathname>
            {/* GTM NoScript */}
            {GTM_ID && (
              <noscript>
                <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                  height="0"
                  width="0"
                  style={{ display: "none", visibility: "hidden" }}
                ></iframe>
              </noscript>
            )}
            {children}
          </Pathname>
        </Providers>
      </body>
    </html>
  );
}
