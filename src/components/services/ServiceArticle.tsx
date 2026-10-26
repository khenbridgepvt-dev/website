import Link from "next/link";
import type { ServiceArticleContent, ServiceTextSegment } from "@/content/services/types";
import { GHOST_LINK_CLASS, PRIMARY_CTA_BUTTON_CLASS } from "@/lib/contact";

function renderSegments(segments: ServiceTextSegment[]) {
  return segments.map((segment, index) => {
    if (segment.type === "link") {
      if (segment.external) {
        return (
          <a
            key={`${segment.href}-${index}`}
            href={segment.href}
            target="_blank"
            rel="noopener noreferrer"
            className={GHOST_LINK_CLASS}
          >
            {segment.value}
          </a>
        );
      }
      return (
        <Link
          key={`${segment.href}-${index}`}
          href={segment.href}
          className={GHOST_LINK_CLASS}
        >
          {segment.value}
        </Link>
      );
    }
    return <span key={`${index}-${segment.value.slice(0, 24)}`}>{segment.value}</span>;
  });
}

export default function ServiceArticle({ content }: { content: ServiceArticleContent }) {
  const { eyebrow, h1, intro, sections, faqs, cta, contactLine, lastUpdated, disclaimer } =
    content;

  return (
    <article className="bg-background pt-28 sm:pt-32 pb-16 sm:pb-20 lg:pb-24">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto lg:max-w-4xl">
          <div className="text-center lg:text-left">
            <p className="text-primary font-bold text-sm uppercase tracking-eyebrow mb-3">
              {eyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo leading-tight mb-6">{h1}</h1>
            {intro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-indigo/70 text-base sm:text-lg leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {sections.map((section) => (
            <section key={section.id} id={section.id} className="mt-10 scroll-mt-28">
              <h2 className="text-2xl font-bold text-indigo mb-4">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-indigo/70 text-base leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
              {section.linkedParagraphs?.map((segments, index) => (
                <p
                  key={`linked-${section.id}-${index}`}
                  className="text-indigo/70 text-base leading-relaxed mb-4"
                >
                  {renderSegments(segments)}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="list-disc pl-5 space-y-2 text-indigo/70 text-base leading-relaxed mb-4">
                  {section.bullets.map((item) => (
                    <li key={item.slice(0, 48)}>{item}</li>
                  ))}
                </ul>
              )}
              {section.subsections?.map((subsection) => (
                <div key={subsection.title} className="mb-4">
                  <h3 className="text-lg font-bold text-indigo mb-2">{subsection.title}</h3>
                  <p className="text-indigo/70 text-base leading-relaxed">
                    {renderSegments(subsection.segments)}
                  </p>
                </div>
              ))}
              {section.steps && (
                <ol className="list-decimal pl-5 space-y-3 text-indigo/70 text-base leading-relaxed mb-4">
                  {section.steps.map((step) => (
                    <li key={step.title}>
                      <span className="font-bold text-indigo">{step.title}</span>
                      {": "}
                      {step.body}
                    </li>
                  ))}
                </ol>
              )}
              {section.highlights?.map((item) => (
                <p key={item.title} className="text-indigo/70 text-base leading-relaxed mb-3">
                  <span className="font-bold text-indigo">{item.title}</span> {item.body}
                </p>
              ))}
              {section.paragraphsAfter?.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-indigo/70 text-base leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section id="faq" className="mt-10 scroll-mt-28">
            <h2 className="text-2xl font-bold text-indigo mb-6">FAQ</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-lg font-bold text-indigo mb-2">{faq.question}</h3>
                  <p className="text-indigo/70 text-base leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-indigo mb-4">{cta.title}</h2>
            <p className="text-indigo/70 text-base leading-relaxed mb-6">{cta.body}</p>
            <div className="flex justify-center lg:justify-start">
              <Link
                href={cta.href}
                className={`inline-flex items-center justify-center text-sm sm:text-base px-6 py-3 ${PRIMARY_CTA_BUTTON_CLASS}`}
              >
                {cta.buttonLabel}
              </Link>
            </div>
            <p className="text-indigo/70 text-sm sm:text-base mt-6">{contactLine}</p>
          </section>

          {lastUpdated ? (
            <p className="text-sm text-indigo/60 mt-8">{lastUpdated}</p>
          ) : null}
          <p className="text-sm text-indigo/60 border-t border-lavender/30 pt-6 mt-6">{disclaimer}</p>
        </div>
      </div>
    </article>
  );
}
