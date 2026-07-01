"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="uk-immigration" className="relative z-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo via-primary to-lavender" />
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, #E3A72E 0%, transparent 50%), radial-gradient(circle at 75% 50%, #9860C6 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] text-white font-bold mb-6 leading-tight max-w-lg"
            >
              Do not let a visa stand between you and your future.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-white/60 mb-8 leading-relaxed max-w-md"
            >
              Expert visa and immigration solutions tailored for your unique journey. We provide comprehensive legal support and trusted guidance every step of the way.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 max-w-lg"
            >
              {[
                "UK Immigration Experts",
                "Legal Team Partnership",
                "Refusal Specialists",
                "25+ Countries",
                "Kochi & Trivandrum",
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-indigo/40 text-white/90 px-4 py-2.5 rounded-sm text-sm font-medium hover:bg-indigo/60 transition-colors duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right CTA Button */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <a
                href="#contact"
                className="group relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full bg-accent text-indigo font-bold text-lg sm:text-xl lg:text-2xl transition-all duration-300 shadow-xl hover:shadow-accent/40 hover:scale-105"
              >
                Let&apos;s Talk
                <ArrowRight className="absolute top-[35%] right-[28%] w-5 h-5 sm:w-6 sm:h-6 group-hover:-rotate-45 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
