"use client";

import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { PRIMARY_CTA_BUTTON_CLASS } from "@/lib/contact";

const HeroDecorations = dynamic(() => import("@/components/HeroDecorations"), {
  ssr: false,
});

/** Prefer WebP after `npm run optimize-hero`; PNG remains fallback in repo/deploy. */
const HERO_BG_SRC = "/images/custom_hero_bg.webp";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden m-0 p-0 min-h-screen flex items-center"
      style={{
        background: "linear-gradient(135deg, #21173F 0%, #4D1B7A 55%, #9860C6 100%)",
      }}
    >
      <div className="absolute inset-0 z-0 opacity-15 mix-blend-overlay">
        <Image
          src={HERO_BG_SRC}
          alt="Bridge and flight at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <HeroDecorations />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 relative z-10 flex items-center h-full pt-16 sm:pt-20">
        <div className="max-w-lg lg:max-w-xl">
          <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight mb-3 sm:mb-4">
            Your bridge to <br className="hidden sm:block" />
            global opportunities <br className="hidden sm:block" />
            and dreams
          </h1>

          <p className="overflow-hidden font-bold text-white/80 uppercase tracking-widest text-xs sm:text-sm mb-6 sm:mb-8">
            Kerala&apos;s Most Trusted Visa Consultants
          </p>

          <a
            href="#services"
            className={`inline-flex items-center gap-2 text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 group ${PRIMARY_CTA_BUTTON_CLASS}`}
          >
            Learn More
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
