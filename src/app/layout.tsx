import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import {
  HOME_CANONICAL_URL,
  HOME_DESCRIPTION,
  HOME_KEYWORDS,
  HOME_TITLE,
  buildLocalBusinessJsonLd,
  buildOpenGraph,
  buildTwitter,
  serializeJsonLd,
} from "@/lib/seo";
import "./globals.css";

const archivo = localFont({
  src: [
    {
      path: "../../public/fonts/archivo-semi-condensed/Archivo_SemiCondensed-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/archivo-semi-condensed/Archivo_SemiCondensed-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/archivo-semi-condensed/Archivo_SemiCondensed-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(HOME_CANONICAL_URL),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  keywords: HOME_KEYWORDS,
  manifest: "/site.webmanifest",
  alternates: { canonical: HOME_CANONICAL_URL },
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

const GA_MEASUREMENT_ID = "G-7E448FR32M";

const localBusinessJsonLd = buildLocalBusinessJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="YBX58X0ctwKqYhjo2Pad7Q"
          async
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(localBusinessJsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-indigo font-sans">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
