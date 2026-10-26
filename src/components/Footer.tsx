import Link from "next/link";
import Image from "next/image";
import SocialIconLinks from "@/components/SocialIconLinks";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  OFFICE_ADDRESS_DISPLAY,
  OFFICE_EMAIL,
  OFFICE_PHONE,
  OFFICE_PHONE_DISPLAY,
} from "@/lib/contact";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative z-10 bg-indigo pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 min-h-[100dvh]"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-8 xl:gap-12 mb-12 sm:mb-16">
          {/* Logo and Contact */}
          <div className="min-w-0">
            <Link
              href="/#home"
              aria-label="Khenbridge home"
              className="flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-6 group min-h-[44px] max-w-full rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-indigo"
            >
              <Image
                src="/logo/Logo.png"
                alt="Khenbridge logo"
                width={36}
                height={36}
                className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 flex-shrink-0 object-contain"
              />
              <span className="relative h-7 sm:h-8 md:h-9 flex-1 min-w-0 max-w-[10.125rem]">
                <Image
                  src="/logo/Title.png"
                  alt="Khenbridge"
                  fill
                  sizes="(max-width: 640px) 120px, 162px"
                  className="object-contain object-left translate-y-px"
                />
              </span>
            </Link>
            <p className="text-white/70 text-sm sm:text-base mb-6 leading-relaxed max-w-xs">
              Your bridge to your dreams. Kerala&apos;s most trusted visa consultancy
              with expert immigration guidance across Kerala.
            </p>
            <div className="flex flex-col gap-3 mb-6">
              <a
                href={`mailto:${OFFICE_EMAIL}`}
                className="flex items-center gap-3 text-white/80 hover:text-accent transition-colors duration-300 text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                {OFFICE_EMAIL}
              </a>
              <a
                href={`tel:${OFFICE_PHONE}`}
                className="flex items-center gap-3 text-white/80 hover:text-accent transition-colors duration-300 text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                {OFFICE_PHONE_DISPLAY}
              </a>
              <div className="flex items-start gap-3 text-white/70 text-sm sm:text-base">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                <span>{OFFICE_ADDRESS_DISPLAY} · Serving clients across Kerala</span>
              </div>
            </div>
            <SocialIconLinks />
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 sm:mb-6">Company</h3>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              <li>
                <Link
                  href="/#home"
                  className="text-white/75 hover:text-accent transition-colors duration-300 text-sm sm:text-base inline-block py-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-white/75 hover:text-accent transition-colors duration-300 text-sm sm:text-base inline-block py-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-white/75 hover:text-accent transition-colors duration-300 text-sm sm:text-base inline-block py-1"
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 sm:mb-6">Services</h3>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              <li>
                <Link
                  href="/services/visit-visas/"
                  className="text-white/75 hover:text-accent transition-colors duration-300 text-sm sm:text-base inline-block py-1"
                >
                  Visit &amp; tourist visas
                </Link>
              </li>
              <li>
                <Link
                  href="/services/uk-immigration/"
                  className="text-white/75 hover:text-accent transition-colors duration-300 text-sm sm:text-base inline-block py-1"
                >
                  UK Immigration
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-white/75 hover:text-accent transition-colors duration-300 text-sm sm:text-base inline-block py-1"
                >
                  Visa Refusal Appeals
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-white/75 hover:text-accent transition-colors duration-300 text-sm sm:text-base inline-block py-1"
                >
                  Student Visas
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-white/75 hover:text-accent transition-colors duration-300 text-sm sm:text-base inline-block py-1"
                >
                  Work Permits
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-white/60 text-xs sm:text-sm">
            © 2026 Khenbridge. All Rights Reserved.
          </p>
          <p className="text-white/60 text-xs sm:text-sm">
            Your bridge to your dreams.
          </p>
        </div>
      </div>
    </footer>
  );
}
