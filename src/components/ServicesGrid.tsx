"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ShieldCheck,
  GraduationCap,
  Globe,
  Briefcase,
  Building2,
  Users,
  FileCheck,
  Scale,
} from "lucide-react";

const services = [
  { title: "UK Visa &\nImmigration", img: "/images/london.png", icon: ShieldCheck },
  { title: "Visa Refusal\nAppeals", img: "/images/bridge.png", icon: Scale },
  { title: "Student\nVisas", img: "/images/canada.png", icon: GraduationCap },
  { title: "Tourist &\nVisit Visas", img: "/images/paris.png", icon: Globe },
  { title: "Work Permit\nVisas", img: "/images/dubai.png", icon: Briefcase },
  { title: "Business &\nInvestor Visas", img: "/images/newyork.png", icon: Building2 },
  { title: "Family &\nDependent Visas", img: "/images/sydney.png", icon: Users },
  { title: "Document\nAssistance", img: "/images/airport.png", icon: FileCheck },
];

export default function ServicesGrid() {
  return (
    <section id="services">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="relative group overflow-hidden h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[450px] cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={service.img}
                  alt={service.title.replace("\n", " ")}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-indigo/60 group-hover:bg-primary/70 transition-colors duration-500" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-accent mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.06 + 0.1, ease: "easeOut" }}
                >
                  <h3 className="font-semibold text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-tight whitespace-pre-line group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
