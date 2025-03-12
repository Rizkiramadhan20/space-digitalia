const BASE_URL = "https://spacedigitalia.my.id/";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#f5f5f5",
};

export const metadata = {
  title: "Space Digitalia",
  description:
    "Kami menyediakan layanan pembuatan website berkualitas tinggi dengan harga terjangkau untuk UMKM",
  authors: [{ name: "Rizki Ramadhan" }],
  keywords: [
    "Space Digitalia",
    "Space",
    "Digitalia",
    "Rizki Ramadhan",
    "Web Design",
    "Web Development",
    "Web Agency",
    "Web Studio",
    "Web Company",
    "Web Agency",
    "Web Studio",
    "Company Profile",
    "Jasa Membuat Website",
    "Jasa Membuat Landing Page",
    "Jasa Membuat Website Company Profile",
    "Jasa Membuat Website Toko Online",
    "Jasa Membuat Website Blog",
    "Jasa Membuat Website Portfolio",
    "Jasa Membuat Website Landing Page",
    "Jasa Membuat Website Landing Page Company Profile",
    "Jasa Membuat Website Landing Page Toko Online",
    "Jasa Membuat Website Landing Page Blog",
    "Jasa Membuat Website Landing Page Portfolio",
    "Jasa Membuat Website Landing Page Landing Page Company Profile",
    "Jasa Membuat Website Landing Page Landing Page Toko Online",
    "Jasa Membuat Website Landing Page Landing Page Blog",
    "Jasa Membuat Website Landing Page Landing Page Portfolio",
    "Jasa Membuat Website Landing Page Landing Page Landing Page Company Profile",
    "Jasa Membuat Website Landing Page Landing Page Landing Page Toko Online",
    "Jasa Membuat Website Landing Page Landing Page Landing Page Blog",
    "Leuwiliang",
    "Leuwiliang Digitalia",
    "Leuwiliang Web Design",
    "Leuwiliang Web Development",
    "Leuwiliang Web Agency",
    "Leuwiliang Web Studio",
    "Leuwiliang Web Company",
    "Cibatok",
    "Cibatok Digitalia",
    "Cibatok Web Design",
    "Cibatok Web Development",
    "Cibatok Web Agency",
    "Cibatok Web Studio",
    "Cibatok Web Company",
    "Ciampea",
    "Ciampea Digitalia",
    "Ciampea Web Design",
    "Ciampea Web Development",
    "Ciampea Web Agency",
    "Ciampea Web Studio",
    "Ciampea Web Company",
    "Bogor",
    "Bogor Digitalia",
    "Bogor Web Design",
    "Bogor Web Development",
    "Bogor Web Agency",
    "Bogor Web Studio",
    "Bogor Web Company",
  ],

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
    appleTouchIcon: "/favicon.ico",
  },

  manifest: "/manifest.json",

  metadataBase: new URL(BASE_URL),
  canonical: BASE_URL,

  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "format-detection": "telephone=no",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#f5f5f5",
  },

  openGraph: {
    type: "website",
    title: "Space Digitalia - Jasa Pembuatan Website Profesional",
    description:
      "Kami menyediakan layanan pembuatan website berkualitas tinggi dengan harga terjangkau untuk UMKM",
    url: BASE_URL,
    siteName: "Space Digitalia",
    locale: "id_ID",
    images: [
      {
        url: "/favicon.ico",
        width: 1920,
        height: 1080,
        alt: "Space Digitalia - Jasa Pembuatan Website Profesional",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Space Digitalia",
    description: "Space Digitalia",
    creator: "@rizki_ramadhan",
    site: "@rizki_ramadhan",
    images: ["/favicon.ico"],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID,
  },

  robots: {
    index: true,
    follow: true,
    noarchive: true,
    nocache: true,
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "id-ID": BASE_URL,
    },
  },
};

export default metadata;
