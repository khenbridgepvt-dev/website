"use client";

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const linkClass =
  "w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-white/10 flex items-center justify-center text-white/80 hover:bg-accent hover:text-indigo transition-all duration-300";

export default function SocialIconLinks() {
  return (
    <div className="flex gap-3 sm:gap-4">
      <a href="#" className={linkClass} aria-label="Facebook">
        <FaFacebook size={16} />
      </a>
      <a href="#" className={linkClass} aria-label="Instagram">
        <FaInstagram size={16} />
      </a>
      <a href="#" className={linkClass} aria-label="LinkedIn">
        <FaLinkedin size={16} />
      </a>
    </div>
  );
}
