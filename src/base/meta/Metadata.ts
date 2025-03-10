const BASE_URL = "https://spacedigitalia.my.id";

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: "no",
};

export const metadata = {
  title: "Space Digitalia",
  url: BASE_URL,
  description:
    "Space Digitalia menyediakan layanan digital terbaik untuk kebutuhan bisnis Anda. Spesialis dalam SEO, Desain UI/UX, serta Pengembangan Aplikasi Mobile dan Web.",
  favicon: "/favicon.ico",
  authors: [{ name: "Rizki Ramadhan" }],
  sitemap: "/sitemap.xml",
  keywords: [
    "Space Digitalia",
    "Jasa Pembuatan Website Bogor",
    "Jasa Pembuatan Website Leuwiliang",
    "Jasa Pembuatan Website Ciampea",
    "Jasa Pembuatan Website Company Profile",
    "Jasa Pembuatan Website Toko Online",
    "Jasa Pembuatan Website Portfolio",
    "Jasa Membuat Website",
    "Jasa Web Development",
    "Leuwiliang Web Agency",
    "Cibatok Web Studio",
    "Ciampea Web Company",
    "Bogor Digital Agency",
  ],

  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
    other: {
      rel: "icon",
      url: "/favicon.ico",
    },
  },

  manifest: "/manifest.json",
  metadataBase: new URL(BASE_URL),
  canonical: BASE_URL,

  other: {
    "theme-color": "#f5f5f5",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "google-tag-manager": process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    "google-site-verification":
      process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID,
  },

  openGraph: {
    type: "website",
    title: "Space Digitalia",
    description:
      "Spesialis dalam SEO, Desain UI/UX, serta Pengembangan Aplikasi Mobile dan Web. Kami menggabungkan kreativitas dengan teknologi terbaru untuk hasil terbaik.",
    url: BASE_URL,
    siteName: "Space Digitalia",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Space Digitalia - Digital Agency",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Space Digitalia",
    description:
      "Spesialis dalam SEO, Desain UI/UX, serta Pengembangan Aplikasi Mobile dan Web. Kami menggabungkan kreativitas dengan teknologi terbaru untuk hasil terbaik.",
    creator: "@rizki_ramadhan",
    site: "@rizki_ramadhan",
    images: ["/og-image.jpg"],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID,
  },

  robots: {
    index: true,
    follow: true,
    noarchive: false,
    noimageindex: false,
    nosnippet: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};
