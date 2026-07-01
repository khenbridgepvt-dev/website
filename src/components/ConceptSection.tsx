"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

const accordionData = [
  {
    title: "Why Khenbridge?",
    content:
      "We combine local expertise in Kerala with international legal partnerships. Our UK based immigration solicitors work alongside our Kochi and Trivandrum teams to give you the strongest possible application. Whether it is your first visa or a refusal appeal, we treat every case with the same dedication and thoroughness.",
  },
  {
    title: "Our Process",
    content:
      "Step 1: Free initial consultation to assess your case. Step 2: Document collection and case strategy. Step 3: Application preparation with legal review. Step 4: Submission, tracking, and interview coaching. Step 5: Post decision support, including appeal if needed.",
  },
  {
    title: "UK Legal Partnership",
    content:
      "Unlike typical visa agents, Khenbridge has a formal partnership with a UK based immigration legal team. This means complex cases, refusals, administrative reviews, appeals, and judicial reviews are handled by qualified immigration solicitors who understand UK immigration law inside and out.",
  },
];

export default function ConceptSection() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  return (
    <section id="about" className="bg-background py-12 sm:py-16 md:py-20 lg:py-24 relative z-20">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
          {/* Left Side: Staggered Images */}
          <div className="w-full lg:w-1/2">
            <div className="flex mb-3 sm:mb-4 gap-2 sm:gap-4">
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-lavender/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg p-1 sm:p-2 aspect-[4/5] relative"
                >
                  <Image
                    src="/images/london.png"
                    alt="London skyline"
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover rounded-xl sm:rounded-2xl"
                  />
                </motion.div>
              </div>
              <div className="flex-1 mt-6 sm:mt-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-primary rounded-tr-[2rem] sm:rounded-tr-[4rem] rounded-bl-[2rem] sm:rounded-bl-[4rem] shadow-lg h-full min-h-[100px] sm:min-h-[150px]"
                />
              </div>
              <div className="flex-1 mt-12 sm:mt-24">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-indigo rounded-tl-[1.5rem] sm:rounded-tl-[3rem] rounded-br-[1.5rem] sm:rounded-br-[3rem] overflow-hidden shadow-lg p-1 sm:p-2 aspect-square relative"
                >
                  <Image
                    src="/images/airport.png"
                    alt="Modern airport terminal"
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover rounded-tl-[1.25rem] sm:rounded-tl-[2.5rem] rounded-br-[1.25rem] sm:rounded-br-[2.5rem]"
                  />
                </motion.div>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-4 w-2/3 ml-auto">
              <div className="flex-1 flex justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-accent rounded-full shadow-lg h-20 w-20 sm:h-32 sm:w-32"
                />
              </div>
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-lavender/10 rounded-bl-[2rem] sm:rounded-bl-[4rem] rounded-tr-lg sm:rounded-tr-xl overflow-hidden shadow-lg p-1 sm:p-2 aspect-square relative"
                >
                  <Image
                    src="/images/bridge.png"
                    alt="Bridge at sunset"
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover rounded-bl-[1.75rem] sm:rounded-bl-[3.5rem] rounded-tr-md sm:rounded-tr-lg"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Side: Text and Accordion */}
          <div className="w-full lg:w-1/2">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-indigo mb-4 sm:mb-6 leading-tight"
            >
              Expert guidance to turn your visa dreams into reality.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-indigo/60 mb-6 sm:mb-8 leading-relaxed"
            >
              At Khenbridge, we do not just file applications. We build
              airtight cases. With deep expertise in immigration law and a
              dedicated UK legal team, we handle everything from
              straightforward tourist visas to the most complex refusal
              appeals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 sm:mb-8 border-t border-lavender/30"
            >
              {accordionData.map((item, index) => (
                <div key={index} className="border-b border-lavender/30">
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === index ? null : index)
                    }
                    className="w-full py-3 sm:py-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  >
                    <span
                      className={`text-lg sm:text-xl font-medium transition-colors duration-300 ${
                        openAccordion === index ? "text-primary" : "text-indigo"
                      }`}
                    >
                      {item.title}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform duration-300 ${
                        openAccordion === index ? "rotate-180 text-primary" : "text-indigo/40"
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openAccordion === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-indigo/60 pb-4 sm:pb-5 leading-relaxed text-sm sm:text-base">
                          {item.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="#services"
                className="inline-flex items-center gap-2 bg-primary hover:bg-violet text-white font-medium text-base sm:text-lg px-6 sm:px-8 py-3 rounded-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 group"
              >
                Explore Our Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
