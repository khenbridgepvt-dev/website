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
  paragraphsAfter?: string[];
  bullets?: string[];
  steps?: ServiceSectionStep[];
  highlights?: ServiceSectionHighlight[];
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
  disclaimer: string;
};
