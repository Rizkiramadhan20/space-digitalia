const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://spacedigitalia.my.id";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#f5f5f5",
};

export const metadata = {
  title: "Space Digitalia - Jasa Pembuatan Website Profesional",
  description:
    "Butuh website profesional dengan harga terjangkau? Space Digitalia siap membantu UMKM dan bisnis Anda tampil online dengan desain modern, cepat, dan SEO-friendly!",
  authors: [{ name: "Rizki Ramadhan" }],
  creator: "Rizki Ramadhan",
  publisher: "Space Digitalia",
  category: "Web Development",
  keywords: [
    "Jasa Pembuatan Website",
    "Web Design",
    "Web Development",
    "Jasa Website UMKM",
    "Landing Page",
    "Website Company Profile",
    "Website Toko Online",
    "Bogor Web Agency",
    "Leuwiliang Web Studio",
    "Ciampea Web Developer",
    "Cibatok Website",
  ],
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
      {
        url: "/favicon.ico",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
    appleTouchIcon: "/favicon.ico",
  },
  tags: [
    {
      name: "Space Digitalia",
      content: "Jasa Pembuatan Website Profesional",
    },
  ],
  manifest: "/manifest.json",
  metadataBase: new URL(BASE_URL),
  canonical: BASE_URL,
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "format-detection": "telephone=no",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#f5f5f5",
    "application-name": "Space Digitalia",
    "msapplication-tap-highlight": "no",
    "theme-color": "#f5f5f5",
  },
  openGraph: {
    type: "website",
    title: "Space Digitalia - Jasa Pembuatan Website Profesional",
    description:
      "Butuh website profesional dengan harga terjangkau? Space Digitalia siap membantu UMKM dan bisnis Anda tampil online dengan desain modern, cepat, dan SEO-friendly!",
    url: BASE_URL,
    siteName: "Space Digitalia",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jasa Pembuatan Website Space Digitalia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Digitalia - Jasa Pembuatan Website Profesional",
    description:
      "Butuh website profesional dengan harga terjangkau? Space Digitalia siap membantu UMKM dan bisnis Anda tampil online dengan desain modern, cepat, dan SEO-friendly!",
    creator: "@rizki_ramadhan",
    site: "@rizki_ramadhan",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID,
    googleTagManager: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "id-ID": BASE_URL,
    },
  },
};

export default metadata;
