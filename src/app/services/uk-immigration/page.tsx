import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceArticle from "@/components/services/ServiceArticle";
import { ukImmigrationContent } from "@/content/services/uk-immigration";
import {
  UK_IMMIGRATION_DESCRIPTION,
  UK_IMMIGRATION_KEYWORDS,
  UK_IMMIGRATION_PATH,
  UK_IMMIGRATION_TITLE,
  buildOpenGraph,
  buildServicePageJsonLd,
  buildTwitter,
  serializeJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: UK_IMMIGRATION_TITLE,
  description: UK_IMMIGRATION_DESCRIPTION,
  keywords: UK_IMMIGRATION_KEYWORDS,
  alternates: { canonical: UK_IMMIGRATION_PATH },
  openGraph: buildOpenGraph({
    title: UK_IMMIGRATION_TITLE,
    description: UK_IMMIGRATION_DESCRIPTION,
    path: UK_IMMIGRATION_PATH,
  }),
  twitter: buildTwitter({
    title: UK_IMMIGRATION_TITLE,
    description: UK_IMMIGRATION_DESCRIPTION,
  }),
};

const ukImmigrationJsonLd = buildServicePageJsonLd({
  name: UK_IMMIGRATION_TITLE,
  description: UK_IMMIGRATION_DESCRIPTION,
  path: UK_IMMIGRATION_PATH,
});

export default function UkImmigrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(ukImmigrationJsonLd) }}
      />
      <Header />
      <main>
        <ServiceArticle content={ukImmigrationContent} />
      </main>
      <Footer />
    </>
  );
}
