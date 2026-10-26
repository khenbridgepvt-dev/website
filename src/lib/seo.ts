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

export const VISIT_VISAS_PATH = "/services/visit-visas/";

export const VISIT_VISAS_TITLE =
  "Visit & Tourist Visa Consultants Kochi | Khenbridge Kerala";

export const VISIT_VISAS_DESCRIPTION =
  "Planning a trip abroad? Khenbridge in Kochi helps Kerala families with tourist, visit, and religious travel visas — assessment, documents, and clear next steps. Book a free consultation.";

export const VISIT_VISAS_KEYWORDS =
  "visit visa consultants Kochi, tourist visa Kerala, religious visit visa, family visit visa India, Schengen tourist visa Kerala, UAE visit visa Kochi, visa assessment Kerala, Khenbridge";

export const UK_IMMIGRATION_PATH = "/services/uk-immigration/";

export const UK_IMMIGRATION_TITLE =
  "UK Visa & Immigration Consultants Kochi | Student, Work, Spouse | Khenbridge";

export const UK_IMMIGRATION_DESCRIPTION =
  "From student and Skilled Worker visas to spouse applications, extensions, and ILR pathways — Khenbridge in Kochi stays current on UK Home Office rules. Free consultation.";

export const UK_IMMIGRATION_KEYWORDS =
  "UK immigration consultants Kerala, UK visa consultants Kochi, UK spouse visa Kerala, Skilled Worker visa India, UK student visa Kochi, UK visa refusal Kerala, ILR guidance India, Khenbridge";

/** Paths used in metadata and Open Graph (trailing slash where site uses trailingSlash). */
export type SitePath =
  | "/"
  | "/queries/intake"
  | "/queries/intake/"
  | "/services/visit-visas/"
  | "/services/uk-immigration/";

const ogImage = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: OG_IMAGE_ALT,
};

export function buildOpenGraph(opts: {
  title: string;
  description: string;
  path: SitePath;
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

const organizationId = `${SITE_ORIGIN}/#organization`;

function sharedOrganizationFields() {
  return {
    "@id": organizationId,
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

export function buildLocalBusinessJsonLd() {
  const shared = sharedOrganizationFields();
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...shared, "@type": "LocalBusiness" },
      { ...shared, "@type": "ProfessionalService" },
    ],
  };
}

/** Home document canonical with trailing slash (audit 2 is_canonical). */
export const HOME_CANONICAL_URL = `${SITE_ORIGIN}/`;

export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildServicePageJsonLd(opts: {
  name: string;
  description: string;
  path: string;
}) {
  const pageUrl = absoluteUrl(opts.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: opts.name,
        description: opts.description,
        about: { "@id": organizationId },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: opts.name,
        description: opts.description,
        url: pageUrl,
        provider: { "@id": organizationId },
        areaServed: [
          {
            "@type": "State",
            name: "Kerala",
            containedInPlace: { "@type": "Country", name: "India" },
          },
          { "@type": "Country", name: "India" },
        ],
      },
    ],
  };
}
