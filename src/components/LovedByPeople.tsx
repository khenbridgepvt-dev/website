"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Plane, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Expert Legal Support",
    description:
      "Our experienced immigration specialists handle complex refusal and appeal cases with precision.",
  },
  {
    icon: Clock,
    title: "Fast Process",
    description:
      "No hidden fees, no surprises. Clear timelines and updates from consultation to visa approval.",
  },
  {
    icon: Plane,
    title: "End-to-End",
    description:
      "From assessment and documentation to interview prep and post-decision support.",
  },
  {
    icon: HeartHandshake,
    title: "Tailored Strategy",
    description:
      "Every application is unique. We craft personalized strategies to maximise approval chances.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-indigo leading-tight mb-10 max-w-3xl"
        >
          Why families, students, and professionals across Kerala trust Khenbridge.
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-indigo text-white p-8 sm:p-10 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 rounded-sm"
              >
                <div>
                  <Icon className="w-12 h-12 text-accent mb-6" strokeWidth={1.5} />
                  <h4 className="text-2xl font-bold mb-4 leading-tight">
                    {feature.title}
                  </h4>
                  <p className="text-white/60 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
