"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronUp } from "lucide-react";
import Image from "next/image";

const HERO_BG_SRC = "/images/custom_hero_bg.png";

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

      <div className="absolute inset-0 z-0 mix-blend-overlay opacity-60">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <defs>
            <radialGradient id="G1" cx="50%" cy="50%" fx="50%" fy="50%" r=".5">
              <animate attributeName="fx" dur="25s" values="0%;100%;0%" repeatCount="indefinite" />
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#G1)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="20s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>

      <div className="absolute left-4 sm:left-8 bottom-1/4 z-10 hidden md:flex flex-col opacity-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", staggerChildren: 0.2 }}
          className="flex flex-col -space-y-4 sm:-space-y-6"
        >
          <ChevronUp className="w-8 h-8 sm:w-12 sm:h-12 text-white" strokeWidth={3} />
          <ChevronUp className="w-8 h-8 sm:w-12 sm:h-12 text-white" strokeWidth={3} />
          <ChevronUp className="w-8 h-8 sm:w-12 sm:h-12 text-white" strokeWidth={3} />
        </motion.div>
      </div>

      <div className="absolute bottom-0 right-0 z-[1] pointer-events-none select-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <span className="block text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem] font-extrabold text-white/[0.04] leading-none tracking-tighter whitespace-nowrap translate-y-[25%] translate-x-[5%]">
            DREAMS
          </span>
        </motion.div>
      </div>

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
            className="inline-flex items-center gap-2 bg-accent text-indigo font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/30 group"
          >
            Learn More
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
