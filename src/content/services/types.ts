export type ServiceTextSegment =
  | { type: "text"; value: string }
  | { type: "link"; value: string; href: string; external?: boolean };

export type ServiceSubsection = {
  title: string;
  segments: ServiceTextSegment[];
};

export type ServiceSectionHighlight = {
  title: string;
  body: string;
};

export type ServiceSectionStep = {
  title: string;
  body: string;
};

export type ServiceSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  linkedParagraphs?: ServiceTextSegment[][];
  paragraphsAfter?: string[];
  bullets?: string[];
  steps?: ServiceSectionStep[];
  highlights?: ServiceSectionHighlight[];
  subsections?: ServiceSubsection[];
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceArticleContent = {
  eyebrow: string;
  h1: string;
  intro: string[];
  sections: ServiceSection[];
  faqs: ServiceFaq[];
  cta: {
    title: string;
    body: string;
    buttonLabel: string;
    href: string;
  };
  contactLine: string;
  lastUpdated?: string;
  disclaimer: string;
};
