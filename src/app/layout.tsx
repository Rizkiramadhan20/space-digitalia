import { metadata } from "@/base/meta/Metadata";

import "@/base/style/globals.css";

import Providers from "@/base/router/Provider";

import Pathname from "@/base/router/Pathname";

import { openSans } from "@/base/fonts/Fonts";

metadata.manifest = "/manifest.json";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${openSans.variable} antialiased`}>
        <Providers>
          <Pathname>
            {children}
          </Pathname>
        </Providers>
      </body>
    </html>
  );
}
