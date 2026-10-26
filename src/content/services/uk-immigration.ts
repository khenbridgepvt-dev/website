import type { ServiceArticleContent } from "@/content/services/types";

export const ukImmigrationContent: ServiceArticleContent = {
  eyebrow: "Khenbridge",
  h1: "UK visa and immigration support from Kerala: routes, rules, and clear guidance",
  intro: [
    "The United Kingdom remains one of the most common destinations for families, students, and professionals we speak with in Kerala. The routes are many, the rules shift when the Home Office updates guidance, and a small mistake on a form can cost months. Khenbridge focuses on UK immigration alongside other visa work. We help you understand which route fits your situation, what evidence you need, and how to present your case clearly, whether you are applying from India or already living in the UK.",
    "We are immigration consultants, not solicitors. For complex legal representation we work with immigration lawyers when your case needs it. We do not promise visa outcomes; only UK authorities decide applications.",
  ],
  sections: [
    {
      id: "pathways",
      title: "UK pathways we support",
      linkedParagraphs: [
        [
          { type: "text", value: "Each route has different eligibility rules and documents. Below is a plain overview. When we assess your case, we check the current rules on " },
          { type: "link", value: "gov.uk", href: "https://www.gov.uk", external: true },
          { type: "text", value: " and explain what applies to you." },
        ],
      ],
      subsections: [
        {
          title: "Student visas",
          segments: [
            {
              type: "text",
              value:
                "If you have an offer from a licensed UK sponsor (usually a university or college), the Student route may be right for you. You will need to show genuine study plans, financial support for fees and living costs, and English language ability where required. We help with document lists, application timing, and making sure your personal statement and supporting papers match your course and career plans.",
            },
          ],
        },
        {
          title: "Skilled Worker visas",
          segments: [
            {
              type: "text",
              value:
                "When a UK employer holds a sponsor licence and offers you a role that meets skilled worker criteria, this route can lead to long-term residence if you stay on compliant visas. Job title, salary, and certificate of sponsorship details must align with Home Office rules at the time of application. We review offer letters and sponsorship paperwork with you before submission.",
            },
          ],
        },
        {
          title: "Spouse and partner visas",
          segments: [
            {
              type: "text",
              value:
                "Family routes are emotionally important and technically demanding. Whether you are married, in a civil partnership, or in a durable relationship recognised by UK rules, you must prove the relationship is genuine and that financial and English requirements are met. We guide couples through evidence gathering (communication history, living arrangements, photos, statements) and help avoid gaps that cause delays or refusals.",
            },
          ],
        },
        {
          title: "Visitor visas",
          segments: [
            {
              type: "text",
              value: "Short trips for tourism, family, or business may suit the Standard Visitor route. That sits alongside our wider visit-visa work for many countries; if your only UK need is a short stay, see our ",
            },
            { type: "link", value: "visit and short-stay visas", href: "/services/visit-visas/" },
            {
              type: "text",
              value: " page for how we handle temporary travel from Kerala.",
            },
          ],
        },
        {
          title: "Longer-term goals: ILR and British citizenship",
          segments: [
            {
              type: "text",
              value:
                "Indefinite Leave to Remain (ILR) and British citizenship are usually built step by step from the correct visa history, residence periods, and good compliance with conditions. Starting on the wrong route can close doors later. We help you think ahead: which visa might lead to settlement, what absences and documentation matter, and when you should seek dedicated legal advice for citizenship applications.",
            },
          ],
        },
      ],
    },
    {
      id: "in-uk-refusal",
      title: "Help if you are already in the UK or faced a refusal",
      paragraphs: [
        "Not every client applies from Kochi. You may already hold a UK visa and need an extension, a switch to another category, or advice after a change in your personal circumstances. Others receive a refusal and wonder whether to reapply, request an administrative review, or explore appeal options where they exist.",
        "We start by reading the refusal letter or your current immigration status carefully. If the Home Office gave a clear reason (missing documents, financial thresholds not met, credibility concerns), we tell you whether reapplication with stronger evidence is realistic. If the issue is legal or procedural, we refer you to immigration lawyers rather than suggesting you try the same application again without change.",
        "We will not sell false hope. Sometimes the honest answer is to wait, gather more evidence, or take a different route. That conversation is still valuable.",
      ],
    },
    {
      id: "current-law",
      title: "Staying current with UK immigration law",
      paragraphs: [
        "UK immigration rules change. Salary lists, sponsor duties, maintenance funds, English language tests, and permitted activities on each visa type are updated on gov.uk and in policy guidance. What was true two years ago may not apply today.",
        "Our team tracks these changes as part of daily casework. When you book an assessment, we verify the requirements that matter for your application date, not outdated blog posts or social media rumours. If a rule is in flux, we say so and plan accordingly.",
      ],
      linkedParagraphs: [
        [
          { type: "text", value: "We cannot list every figure on this page because numbers and fees change. Always treat " },
          { type: "link", value: "gov.uk", href: "https://www.gov.uk", external: true },
          { type: "text", value: " as the official source; we use it when preparing your file." },
        ],
      ],
    },
    {
      id: "how-we-work",
      title: "How we work with you (and when lawyers step in)",
      paragraphs: ["Our process is straightforward:"],
      steps: [
        {
          title: "Free initial consultation",
          body: "You share your goal, timeline, and any past UK immigration history.",
        },
        {
          title: "Eligibility review",
          body: "We map you to a likely route and flag risks early.",
        },
        {
          title: "Document strategy",
          body: "You get a practical checklist tailored to your route.",
        },
        {
          title: "Application preparation",
          body: "Forms, cover letters, and supporting bundles reviewed for consistency.",
        },
        {
          title: "Submission support",
          body: "Guidance on biometrics, priority services where available, and tracking.",
        },
        {
          title: "After the decision",
          body: "Next steps for entry, extensions, or, if needed, reviewing refusal options.",
        },
      ],
      highlights: [
        {
          title: "When lawyers step in:",
          body:
            "Judicial reviews, complex appeals, criminal or immigration history issues, deportation matters, or cases needing formal legal representation are referred to immigration lawyers we work with. We continue to coordinate where appropriate, but we do not pretend to be a law firm.",
        },
      ],
    },
    {
      id: "prepare",
      title: "What to prepare before you apply",
      paragraphs: [
        "Exact amounts and forms change by route. In general, UK applications expect:",
      ],
      bullets: [
        "A valid passport and any previous UK or other visas",
        "Proof of relationship or employment, depending on route",
        "Financial evidence (personal savings, sponsor income, or scholarship letters)",
        "English language results where required",
        "Tuberculosis test certificate if applicable for applicants from India",
        "Translations for documents not in English or Welsh",
      ],
      paragraphsAfter: [
        "Students need CAS and course details. Skilled workers need sponsorship references. Spouse applicants need relationship evidence over time, not a single wedding album.",
        "We build your list after assessment so you are not collecting papers you do not need.",
      ],
    },
    {
      id: "serving-kerala",
      title: "Serving Kochi and all of Kerala",
      paragraphs: [
        "Our consultancy is based in Kochi and we work with clients across Kerala: employed professionals, students, families split between countries, and parents supporting children abroad. Consultations can start by phone, email, or in person when you visit our office. Malayalam, Hindi, and English are all comfortable languages for our team.",
        "Distance is not a barrier. What matters is clear communication and organised documents.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can you guarantee my UK visa will be approved?",
      answer:
        "No. The Home Office and UKVI make all decisions. We improve clarity and completeness; we do not control the outcome.",
    },
    {
      question: "My UK visa was refused. Should I apply again immediately?",
      answer:
        "Not always. We read the refusal grounds first. Reapplying without fixing the underlying issue often leads to another refusal. Sometimes administrative review or legal advice is more appropriate.",
    },
    {
      question: "How long does a UK visa take?",
      answer:
        "Processing times vary by route, country of application, and season. Check current service standards on gov.uk. We help you choose realistic travel or course start dates.",
    },
    {
      question: "Do you handle spouse visas for couples married in Kerala?",
      answer:
        "Yes. We help gather evidence that meets UKVI expectations for genuine relationships and financial requirements, verified at the time of your application.",
    },
    {
      question: "I am already in the UK on a visa. Can you help me extend or switch?",
      answer:
        "Often yes, if immigration rules allow your switch or extension. We confirm eligibility before you pay unnecessary fees.",
    },
    {
      question: "What is the difference between ILR and British citizenship?",
      answer:
        "ILR lets you live in the UK without time limits on a visa, subject to conditions. Citizenship is a separate legal status with its own residence and good character requirements. Citizenship applications often need specialist legal input; we advise when to involve a lawyer.",
    },
    {
      question: "Are you immigration lawyers?",
      answer:
        "No. We are visa and immigration consultants. We prepare and guide applications and partner with lawyers for legal representation when needed.",
    },
  ],
  cta: {
    title: "Book a free consultation",
    body:
      "Whether you are aiming for your first UK visa or you are unsure what to do after a refusal, a structured conversation saves time and stress.",
    buttonLabel: "Book your free consultation",
    href: "/queries/intake/",
  },
  contactLine: "Email info@khenbridge.com or call +91 8848100293.",
  lastUpdated: "Last updated: October 2026",
  disclaimer:
    "The information on this page is general guidance for people considering UK immigration from Kerala and India. It is not legal advice. Immigration rules change; requirements depend on your personal circumstances and the date you apply. Khenbridge provides consultancy and application support. We are not a law firm. Decisions rest with UK Visas and Immigration and the Home Office. We do not guarantee approval of any application.",
};
