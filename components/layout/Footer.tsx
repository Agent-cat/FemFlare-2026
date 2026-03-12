import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Instagram, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-[60] bg-[#0f172a] text-white pt-8 md:pt-16 pb-8 font-sans">
      {/* Vibrant Gradient Separation Line */}
      <div className="absolute top-0 left-0 w-full h-2 md:h-3 bg-gradient-to-r from-[#e64980] to-[#fd7e14]"></div>
      <div className="container mx-auto px-6 md:px-12">
        {/* Mobile: Compact Layout (Logo + Socials centered) */}
        <div className="md:hidden flex flex-col items-center justify-center text-center space-y-6 mb-8">
          <Link href="/" className="block">
            <Image
              src="/images/femflareloo2.png"
              alt="FemFlare Logo"
              width={180}
              height={60}
              className="h-16 w-auto object-contain mx-auto brightness-0 invert"
            />
          </Link>
          <div className="flex items-center gap-4">
            <SocialLink
              href="https://www.instagram.com/kl_femflare"
              icon={<Instagram size={18} />}
            />
          </div>
        </div>

        {/* Desktop: Grid Layout (Full Content) & Mobile: Links Only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8">
          {/* Column 1: Brand & Description (Desktop Only) */}
          <div className="hidden md:block space-y-6">
            <Link href="/" className="block">
              <Image
                src="/images/femflareloo2.png"
                alt="FemFlare Logo"
                width={250}
                height={80}
                className="h-24 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Celebrating the spirit of women at KL University.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink
                href="https://www.instagram.com/kl_femflare"
                icon={<Instagram size={18} />}
              />
            </div>
          </div>

          {/* Column 2: Quick Links (Condensed on Mobile) */}
          <div className="space-y-4 md:space-y-6 text-center md:text-left">
            <h3 className="text-sm md:text-lg font-oswald font-bold uppercase tracking-widest text-[#FF5722]">
              Menu
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/events" label="Events" />
              <FooterLink href="/gallery" label="Gallery" />
              <FooterLink href="/visionary" label="Our Visionary" />
              <FooterLink href="/about" label="About" />
            </ul>
          </div>

          {/* Column 3: Contact Info (Condensed on Mobile) */}
          <div className="space-y-4 md:space-y-6 text-center md:text-left col-span-1">
            <h3 className="text-sm md:text-lg font-oswald font-bold uppercase tracking-widest text-[#FF5722]">
              Contact
            </h3>
            <div className="space-y-3 md:space-y-4 flex flex-col items-center md:items-start">
              <a
                href="mailto:femflare@kluniversity.in"
                className="flex items-center gap-2 text-gray-300 hover:text-[#FF5722] transition-colors"
              >
                <Mail size={16} className="text-[#FF5722] shrink-0" />
                <span className="text-xs md:text-sm">
                  femflare@kluniversity.in
                </span>
              </a>
              {/* Desktop Address only */}
              <div className="hidden md:flex items-start gap-3 text-gray-300">
                <MapPin size={20} className="text-[#FF5722] shrink-0 mt-1" />
                <span className="text-sm">KL University, AP, India</span>
              </div>
              {/* Phone Numbers */}
              <div className="flex flex-col items-center md:items-start gap-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#FF5722] shrink-0" />
                  <span className="text-xs md:text-sm">
                    9337059008, 9032196103 - (Student)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#FF5722] shrink-0" />
                  <span className="text-xs md:text-sm">
                    9440307606, 9849106886 - (Faculty)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Map (Desktop Only) */}
          <div className="hidden md:block space-y-6">
            <h3 className="text-lg font-oswald font-bold uppercase tracking-widest text-[#FF5722]">
              Find Us
            </h3>
            <div className="w-full h-32 md:h-48 rounded-xl overflow-hidden border border-white/10 shadow-lg relative bg-white/5">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.653457199708!2d80.62035807534444!3d16.441864129202115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0a2a7d8623b%3A0xc354ad150cf716e2!2sK%20L%20University!5e0!3m2!1sen!2sin!4v1710226000000!5m2!1sen!2sin"
                className="transition-all duration-500 opacity-90 hover:opacity-100"
                title="KL University Map"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Highly Simplified for Mobile */}
        <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] md:text-xs text-center md:text-left text-gray-400 uppercase tracking-wider">
            &copy; 2026 FemFlare.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <a
    href={href}
    className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:bg-[#FF5722] hover:text-white hover:border-[#FF5722] transition-all duration-300"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link
      href={href}
      className="text-gray-300 hover:text-[#FF5722] md:hover:pl-2 transition-all duration-300 text-xs md:text-sm font-medium uppercase tracking-wide inline-flex items-center gap-2 group justify-center md:justify-start"
    >
      <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-[#FF5722] opacity-0 group-hover:opacity-100 transition-opacity"></span>
      {label}
    </Link>
  </li>
);

export default Footer;
