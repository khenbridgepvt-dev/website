"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import IntakeForm from "@/components/IntakeForm";
import {
  OFFICE_PHONE,
  OFFICE_PHONE_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/contact";

const nextSteps = [
  "We review your enquiry",
  "A visa specialist calls you back",
  "You get a free initial consultation",
];

export default function IntakePage() {
  return (
    <section className="bg-background pt-28 sm:pt-32 pb-16 sm:pb-20 lg:pb-24">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 lg:items-start">
          <div className="mb-10 lg:mb-0 text-center lg:text-left">
            <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-3">
              Khenbridge
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo leading-tight mb-4">
              Book your free consultation
            </h1>
            <p className="text-indigo/70 text-base sm:text-lg leading-relaxed mb-6">
              All our initial consultations are free. Fill in the form and we&apos;ll arrange a
              call back at a time that suits you.
            </p>

            <p className="text-sm sm:text-base text-indigo/80 mb-6">
              <span className="font-medium text-indigo">Languages we speak:</span> Malayalam,
              Hindi, English.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <a
                href={`tel:${OFFICE_PHONE}`}
                className="inline-flex items-center justify-center gap-2 border border-indigo/20 bg-white text-indigo font-medium text-sm px-5 py-2.5 rounded-sm hover:border-primary hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-accent" aria-hidden />
                Call {OFFICE_PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-indigo text-white font-medium text-sm px-5 py-2.5 rounded-sm hover:bg-primary transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" aria-hidden />
                WhatsApp us
              </a>
            </div>

            <div className="text-left rounded-sm bg-indigo/5 border border-lavender/20 p-5 sm:p-6">
              <h2 className="text-sm font-semibold text-indigo mb-3">What happens next?</h2>
              <ol className="space-y-2 text-sm sm:text-base text-indigo/70 list-decimal list-inside">
                {nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <p className="mt-8 text-sm text-indigo/50">
              <Link href="/" className="hover:text-primary transition-colors underline-offset-2 hover:underline">
                Explore Khenbridge
              </Link>
            </p>
          </div>

          <div className="w-full max-w-md mx-auto lg:max-w-none lg:mx-0 relative">
            <IntakeForm source="queries-intake" />
          </div>
        </div>
      </div>
    </section>
  );
}
