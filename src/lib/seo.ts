import {
  OFFICE_ADDRESS_COUNTRY,
  OFFICE_ADDRESS_LOCALITY,
  OFFICE_ADDRESS_REGION,
  OFFICE_EMAIL,
  OFFICE_PHONE,
  OFFICE_POSTAL_CODE,
  OFFICE_STREET_ADDRESS,
} from "@/lib/contact";
import type { Metadata } from "next";

export const SITE_ORIGIN = "https://www.khenbridge.com";
export const SITE_NAME = "Khenbridge";

export const OG_IMAGE_PATH = "/og/og-image.png";
export const OG_IMAGE_ALT =
  "Khenbridge — leading visa consultants in Kerala, immigration experts in Kochi";

export const HOME_TITLE =
  "Khenbridge | Leading Visa Consultants in Kerala | Immigration Experts in Kochi";
export const HOME_DESCRIPTION =
  "Khenbridge is Kerala's most trusted visa consultancy. Expert immigration guidance, visa refusal appeals, student visas, and work permits. Office in Kochi, serving clients across Kerala.";

export const HOME_KEYWORDS =
  "visa consultants Kerala, UK immigration Kerala, visa consultants Kochi, visa consultants Trivandrum, UK visa refusal appeal, student visa Kerala, work permit visa India, best visa agency Kerala, Khenbridge";

export const INTAKE_KEYWORDS =
  "free visa consultation Kerala, book visa consultation Kochi, Khenbridge consultation, visa enquiry Kerala, immigration advice Malayalam Hindi English, initial consultation visa";

const ogImage = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: OG_IMAGE_ALT,
};

export function buildOpenGraph(opts: {
  title: string;
  description: string;
  path: "/" | "/queries/intake";
}): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: opts.title,
    description: opts.description,
    url: opts.path,
    images: [ogImage],
  };
}

export function buildTwitter(opts: {
  title: string;
  description: string;
}): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title: opts.title,
    description: opts.description,
    images: [OG_IMAGE_PATH],
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_ORIGIN).href;
}

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    name: SITE_NAME,
    url: SITE_ORIGIN,
    email: OFFICE_EMAIL,
    telephone: OFFICE_PHONE,
    image: absoluteUrl(OG_IMAGE_PATH),
    logo: absoluteUrl("/logo/Logo.png"),
    description: HOME_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      streetAddress: OFFICE_STREET_ADDRESS,
      addressLocality: OFFICE_ADDRESS_LOCALITY,
      addressRegion: OFFICE_ADDRESS_REGION,
      postalCode: OFFICE_POSTAL_CODE,
      addressCountry: OFFICE_ADDRESS_COUNTRY,
    },
    areaServed: [
      {
        "@type": "State",
        name: "Kerala",
        containedInPlace: { "@type": "Country", name: "India" },
      },
      { "@type": "Country", name: "India" },
    ],
  };
}

export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
