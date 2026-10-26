import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import {
  HOME_DESCRIPTION,
  HOME_KEYWORDS,
  HOME_TITLE,
  SITE_ORIGIN,
  buildLocalBusinessJsonLd,
  buildOpenGraph,
  buildTwitter,
  serializeJsonLd,
} from "@/lib/seo";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  keywords: HOME_KEYWORDS,
  manifest: "/site.webmanifest",
  alternates: { canonical: "/" },
  openGraph: buildOpenGraph({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: "/",
  }),
  twitter: buildTwitter({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  }),
};

export const viewport: Viewport = {
  themeColor: "#21173F",
};

const localBusinessJsonLd = buildLocalBusinessJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-indigo font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(localBusinessJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
