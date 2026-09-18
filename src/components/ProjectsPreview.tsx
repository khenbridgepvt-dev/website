"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { MAILTO_ENQUIRY_URL } from "@/lib/contact";

const highlights = [
  {
    title: "UK Spouse Visa Solutions",
    description:
      "Reuniting families across borders. Our experienced team specialises in spouse and partner visa applications, including complex refusal cases where previous applications were unsuccessful.",
    img: "/images/london.png",
  },
  {
    title: "Student Visa Pathways",
    description:
      "Guidance for students pursuing international education. From university selection and SOP review to financial documentation and visa filing, we support your academic journey from start to finish.",
    img: "/images/canada.png",
  },
];

export default function ServiceHighlights() {
  return (
    <section className="bg-background pb-12 sm:pb-16 md:pb-20 lg:pb-24">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row border-t border-lavender/20 group"
          >
            {/* CTA Button */}
            <div className="w-full lg:w-2/12 order-3 lg:order-1 py-4 sm:py-6 lg:py-12 lg:pr-8 lg:border-r border-lavender/20 flex items-start">
              <a
                href={MAILTO_ENQUIRY_URL}
                className="w-full bg-indigo hover:bg-primary text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 flex justify-between items-center transition-all duration-300 transform hover:-translate-y-1 rounded-sm text-sm sm:text-base"
              >
                Learn More
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-rotate-45 transition-transform duration-300 flex-shrink-0" />
              </a>
            </div>

            {/* Content */}
            <div className="w-full lg:w-6/12 order-1 lg:order-2 py-6 sm:py-8 lg:py-12 lg:px-8 xl:px-12 lg:border-r border-lavender/20">
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-2xl sm:text-3xl md:text-4xl font-semibold text-indigo mb-3 sm:mb-6"
              >
                {item.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-indigo/50 leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>

            {/* Image */}
            <div className="w-full lg:w-4/12 order-2 lg:order-3 py-4 sm:py-6 lg:py-12 lg:pl-8 xl:pl-12 flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg shadow-indigo/10"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo/20 to-transparent" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
