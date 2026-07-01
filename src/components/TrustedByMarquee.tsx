"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const destinations = [
  { name: "United Kingdom", img: "/images/london.png" },
  { name: "Canada", img: "/images/canada.png" },
  { name: "Australia", img: "/images/sydney.png" },
  { name: "United States", img: "/images/newyork.png" },
  { name: "Europe / Schengen", img: "/images/paris.png" },
  { name: "Dubai / UAE", img: "/images/dubai.png" },
];

export default function DestinationsSection() {
  return (
    <section id="destinations" className="bg-background py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-indigo mb-3 sm:mb-4"
          >
            Your destination awaits
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-indigo/50 max-w-xl mx-auto"
          >
            We process visas to all major countries. Choose your dream
            destination and let us handle the rest.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative h-[200px] sm:h-[220px] md:h-[260px] lg:h-[280px] rounded-lg overflow-hidden cursor-pointer"
            >
              <Image
                src={dest.img}
                alt={dest.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo/80 via-indigo/30 to-transparent group-hover:from-primary/80 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h4 className="text-white font-semibold text-lg sm:text-xl md:text-2xl group-hover:text-accent transition-colors duration-300">
                  {dest.name}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
