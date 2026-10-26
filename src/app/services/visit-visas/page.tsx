import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceArticle from "@/components/services/ServiceArticle";
import { visitVisasContent } from "@/content/services/visit-visas";
import {
  VISIT_VISAS_DESCRIPTION,
  VISIT_VISAS_KEYWORDS,
  VISIT_VISAS_PATH,
  VISIT_VISAS_TITLE,
  buildOpenGraph,
  buildServicePageJsonLd,
  buildTwitter,
  serializeJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: VISIT_VISAS_TITLE,
  description: VISIT_VISAS_DESCRIPTION,
  keywords: VISIT_VISAS_KEYWORDS,
  alternates: { canonical: VISIT_VISAS_PATH },
  openGraph: buildOpenGraph({
    title: VISIT_VISAS_TITLE,
    description: VISIT_VISAS_DESCRIPTION,
    path: VISIT_VISAS_PATH,
  }),
  twitter: buildTwitter({
    title: VISIT_VISAS_TITLE,
    description: VISIT_VISAS_DESCRIPTION,
  }),
};

const visitVisasJsonLd = buildServicePageJsonLd({
  name: VISIT_VISAS_TITLE,
  description: VISIT_VISAS_DESCRIPTION,
  path: VISIT_VISAS_PATH,
});

export default function VisitVisasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(visitVisasJsonLd) }}
      />
      <Header />
      <main>
        <ServiceArticle content={visitVisasContent} />
      </main>
      <Footer />
    </>
  );
}
