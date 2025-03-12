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
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script
            id="google-tag-manager"
            strategy="worker"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `
            }}
          />
        )}

        {/* JSON-LD Schema.org - Organization */}
        <Script id="json-ld-organization" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Space Digitalia",
            "description": "Spesialis dalam SEO, Desain UI/UX, serta Pengembangan Aplikasi Mobile dan Web. Kami menggabungkan kreativitas dengan teknologi terbaru untuk hasil terbaik.",
            "url": "https://spacedigitalia.my.id",
            "logo": "https://spacedigitalia.my.id/favicon.ico",
            "sameAs": [
              "https://instagram.com/spacedigitalia",
              "https://facebook.com/spacedigitalia"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "ID",
              "addressRegion": "Bogor",
              "addressLocality": "Leuwiliang"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "name": "Rizki Ramadhan",
              "telephone": "+62-812-9863-2939",
              "email": "spacedigitalia@gmail.com"
            }
          })}
        </Script>

        {/* JSON-LD Schema.org - WebSite */}
        <Script id="json-ld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Space Digitalia",
            "url": "https://spacedigitalia.my.id",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://spacedigitalia.my.id/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </Script>
      </head>
      <body className={`${openSans.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
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
