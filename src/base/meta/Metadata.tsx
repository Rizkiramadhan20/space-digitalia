import { Fragment } from "react";

import Script from "next/script";

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  userScalable: "yes",
  viewportFit: "cover",
};

export const metadata = {
  title: "Space Digitalia",
  description:
    "Kami menyediakan layanan pembuatan website berkualitas tinggi dengan harga terjangkau untuk UMKM",
  author: "Space Digitalia",
  keywords: "Website, Pembuatan Website, Pengembangan Website, Desain Website, SEO, Digital Marketing",
  icons: {
    icon: "/src/app/favicon.ico",
  },
  openGraph: {
    title: "Space Digitalia",
    description:
      "Kami menyediakan layanan pembuatan website berkualitas tinggi dengan harga terjangkau untuk UMKM",
    url: "https://spacedigitalia.my.id/",
    siteName: "Space Digitalia",
    images: [
      {
        url: "https://spacedigitalia.my.id/favicon.ico",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Digitalia",
    description:
      "Kami menyediakan layanan pembuatan website berkualitas tinggi dengan harga terjangkau untuk UMKM",
    creator: "@space-digitalia",
    images: "https://spacedigitalia.my.id/favicon.ico",
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID,
};

const siteUrl = "https://spacedigitalia.my.id";
const faviconUrl = `${siteUrl}/favicon.ico`;
const canonicalUrl = `${siteUrl}/`;

export const openGraph = {
  type: "website",
  title: "Space Digitalia",
  description:
    "Spesialis dalam SEO, Desain UI/UX, serta Pengembangan Aplikasi Mobile dan Web. Kami menggabungkan kreativitas dengan teknologi terbaru untuk hasil terbaik.",
  url: siteUrl,
  siteName: "Space Digitalia",
  locale: "id_ID",
  alternateLocale: "en_US",
  images: [
    {
      url: `${siteUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: "Space Digitalia - Digital Agency",
      type: "image/jpeg",
    },
  ],
};

const Head = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Space Digitalia",
    image: "https://spacedigitalia.my.id/favicon.ico",
    "@id": "https://spacedigitalia.my.id",
    url: "https://spacedigitalia.my.id",
    telephone: "081284258290",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Jl. Babakan, Leuwiliang, Kec. Leuwiliang, Kabupaten Bogor, Jawa Barat",
      addressLocality: "Leuwiliang Kab. Bogor",
      addressRegion: "Jawa Barat",
      postalCode: "16640",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.595038,
      longitude: 106.670528,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
    sameAs: ["https://www.facebook.com/profile.php?id=61573748215102&mibextid=ZbWKwL", "https://www.instagram.com/spacedigitalia?igsh=MWhucmN5bXl1YnViZQ=="],

    description:
      "Menyediakan layanan pembuatan website berkualitas tinggi dengan harga terjangkau untuk UMKM",
    logo: "https://spacedigitalia.my.id/favicon.ico",
    title: "Space Digitalia",
  };

  const jsonLdString = JSON.stringify(jsonLd);

  const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string;

  return (
    <Fragment>
      <title>{metadata.title}</title>
      <meta charSet="UTF-8" />
      <meta name="version" content="1.0" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={metadata.description} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
      <meta name="google-site-verification" content={metadata.verification} />
      <meta property="og:title" content={metadata.title} />
      <meta name="viewport" content={viewport.width} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="author" content={metadata.author} />
      <meta name="google-tagmanager-id" content={GTM_ID} />
      <meta property="og:image" content={faviconUrl} />
      <meta name="keywords" content={metadata.keywords} />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="robots" content="index, follow" />
      <meta name="generator" content="Space Digitalia" />
      <meta name="application-name" content="Space Digitalia" />
      <meta name="apple-mobile-web-app-title" content="Space Digitalia" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-touch-fullscreen" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Space Digitalia" />

      <link rel="icon" href={faviconUrl} type="image/x-icon" sizes="any" />
      <link rel="icon" href={faviconUrl} type="image/svg+xml" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href={faviconUrl} />
      <link rel="shortcut icon" href={faviconUrl} type="image/x-icon" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="canonical" href={canonicalUrl} />

      {GTM_ID && (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          title="Google Tag Manager"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
    </Fragment>
  );
};

export default Head;