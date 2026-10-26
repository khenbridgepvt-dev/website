import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntakePage from "@/components/IntakePage";
import { INTAKE_KEYWORDS, buildOpenGraph, buildTwitter } from "@/lib/seo";

const INTAKE_TITLE = "Free visa consultation | Khenbridge";
const INTAKE_DESCRIPTION =
  "Book a free initial consultation with Khenbridge. Share your details or email us and we will get back to you. Malayalam, Hindi, and English.";

export const metadata: Metadata = {
  title: INTAKE_TITLE,
  description: INTAKE_DESCRIPTION,
  keywords: INTAKE_KEYWORDS,
  alternates: { canonical: "/queries/intake" },
  openGraph: buildOpenGraph({
    title: INTAKE_TITLE,
    description: INTAKE_DESCRIPTION,
    path: "/queries/intake",
  }),
  twitter: buildTwitter({
    title: INTAKE_TITLE,
    description: INTAKE_DESCRIPTION,
  }),
};

export default function IntakeRoutePage() {
  return (
    <>
      <Header />
      <main>
        <IntakePage />
      </main>
      <Footer />
    </>
  );
}
