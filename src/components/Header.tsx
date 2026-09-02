"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "UK Immigration", href: "#uk-immigration" },
  { name: "Destinations", href: "#destinations" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-indigo/95 backdrop-blur-md shadow-lg shadow-indigo/20 py-2 sm:py-3"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            aria-label="Khenbridge home"
            className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 min-h-[44px] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <Image
              src="/logo/Logo.png"
              alt=""
              aria-hidden
              width={36}
              height={36}
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
              priority
            />
            <Image
              src="/logo/Title.png"
              alt=""
              aria-hidden
              width={162}
              height={36}
              className="h-8 sm:h-9 w-auto object-contain translate-y-px"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            <nav className="flex items-center gap-3 xl:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/70 hover:text-accent font-medium text-sm tracking-wide transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <a
              href="https://wa.me/918848100293?text=Hi%2C%20I%27m%20reaching%20out%20from%20the%20Khenbridge%20website.%20Can%20you%20help%20me%20with%20my%20visa%20enquiry%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-indigo font-bold text-sm px-5 xl:px-6 py-2.5 rounded-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 whitespace-nowrap"
            >
              Book Free Consultation
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-indigo border-t border-lavender/20 px-4 sm:px-6 py-6 flex flex-col gap-1 shadow-xl max-h-[calc(100vh-60px)] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-accent hover:bg-white/5 font-medium text-base py-3 px-4 rounded-sm transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/918848100293?text=Hi%2C%20I%27m%20reaching%20out%20from%20the%20Khenbridge%20website.%20Can%20you%20help%20me%20with%20my%20visa%20enquiry%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-indigo font-bold px-6 py-3 rounded-sm text-center w-full mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Free Consultation
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
