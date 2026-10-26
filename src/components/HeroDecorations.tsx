"use client";

import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function HeroDecorations() {
  return (
    <>
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
    </>
  );
}
