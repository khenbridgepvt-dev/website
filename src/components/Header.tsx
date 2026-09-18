"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { MAILTO_URL, PRIMARY_CTA_BUTTON_CLASS } from "@/lib/contact";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About Us", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "UK Immigration", href: "/#uk-immigration" },
  { name: "Destinations", href: "/#destinations" },
  { name: "Contact", href: "/queries/intake" },
];

export default function Header() {
  const pathname = usePathname();
  const isIntakePage = pathname?.startsWith("/queries/intake");
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navOpacity, setNavOpacity] = useState(1);
  const [headerHeight, setHeaderHeight] = useState(72);

  useEffect(() => {
    const updateHeader = () => {
      setIsScrolled(window.scrollY > 50);

      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }

      const footer = document.getElementById("site-footer");
      const currentHeaderHeight = headerRef.current?.offsetHeight ?? 72;

      if (!footer) {
        setNavOpacity(1);
        return;
      }

      const footerTop = footer.getBoundingClientRect().top;
      const fadeStart = currentHeaderHeight + 120;
      const fadeEnd = currentHeaderHeight * 0.4;
      const opacity = Math.max(
        0,
        Math.min(1, (footerTop - fadeEnd) / (fadeStart - fadeEnd)),
      );

      setNavOpacity(opacity);

      if (opacity < 0.15) {
        setIsMobileMenuOpen(false);
      }
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
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
    <>
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-40 bg-indigo pointer-events-none transition-opacity duration-500"
        style={{
          height: headerHeight,
          opacity: 1 - navOpacity,
        }}
      />
      <header
        ref={headerRef}
        style={{ opacity: navOpacity }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navOpacity < 0.1 ? "pointer-events-none" : ""
        } ${
          isScrolled || isIntakePage
            ? "bg-indigo/95 backdrop-blur-md shadow-lg shadow-indigo/20 py-2 sm:py-3"
            : "bg-transparent py-3 sm:py-5"
        }`}
      >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/#home"
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
              style={{ width: "auto" }}
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
              href={MAILTO_URL}
              className={`${PRIMARY_CTA_BUTTON_CLASS} text-sm px-5 xl:px-6 py-2.5 whitespace-nowrap`}
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
              href={MAILTO_URL}
              className={`${PRIMARY_CTA_BUTTON_CLASS} px-6 py-3 text-center w-full mt-4 block`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Free Consultation
            </a>
          </div>
        )}
      </div>
    </header>
    </>
  );
}
