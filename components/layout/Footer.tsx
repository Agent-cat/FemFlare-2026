import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-50 bg-[#F1EBE0] text-black pt-8 md:pt-16 pb-8 border-t border-black/10 font-sans">
      <div className="container mx-auto px-6 md:px-12">

        {/* Mobile: Compact Layout (Logo + Socials centered) */}
        <div className="md:hidden flex flex-col items-center justify-center text-center space-y-6 mb-8">
            <Link href="/" className="text-3xl font-oswald font-bold tracking-tighter uppercase text-black block">
              Fem<span className="text-[#FF5722]">Flare</span>
            </Link>
             <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<Instagram size={18} />} />
              <SocialLink href="#" icon={<Linkedin size={18} />} />
              <SocialLink href="#" icon={<Twitter size={18} />} />
            </div>
        </div>

        {/* Desktop: Grid Layout (Full Content) & Mobile: Links Only */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8">
          {/* Column 1: Brand & Description (Desktop Only) */}
          <div className="hidden md:block space-y-6">
            <Link href="/" className="text-4xl font-oswald font-bold tracking-tighter uppercase text-black block">
              Fem<span className="text-[#FF5722]">Flare</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Celebrating the spirit of womanhood at KL University.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<Instagram size={18} />} />
              <SocialLink href="#" icon={<Linkedin size={18} />} />
              <SocialLink href="#" icon={<Twitter size={18} />} />
              <SocialLink href="#" icon={<Facebook size={18} />} />
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
              <FooterLink href="/about" label="About" />
            </ul>
          </div>

          {/* Column 3: Contact Info (Condensed on Mobile) */}
          <div className="space-y-4 md:space-y-6 text-center md:text-left col-span-1">
            <h3 className="text-sm md:text-lg font-oswald font-bold uppercase tracking-widest text-[#FF5722]">
              Contact
            </h3>
            <div className="space-y-2 md:space-y-4 flex flex-col items-center md:items-start">
               <a href="mailto:contact@femflare.klu.in" className="flex items-center gap-2 text-gray-600 hover:text-[#FF5722] transition-colors">
                  <Mail size={16} className="text-[#FF5722] shrink-0" />
                  <span className="text-xs md:text-sm">Email Us</span>
               </a>
               <a href="tel:+911234567890" className="flex items-center gap-2 text-gray-600 hover:text-[#FF5722] transition-colors">
                  <Phone size={16} className="text-[#FF5722] shrink-0" />
                   <span className="text-xs md:text-sm">Call Us</span>
               </a>
                {/* Desktop Address only */}
                <div className="hidden md:flex items-start gap-3 text-gray-600">
                    <MapPin size={20} className="text-[#FF5722] shrink-0 mt-1" />
                    <span className="text-sm">KL University, AP, India</span>
                </div>
            </div>
          </div>

          {/* Column 4: Map (Desktop Only) */}
          <div className="hidden md:block space-y-6">
            <h3 className="text-lg font-oswald font-bold uppercase tracking-widest text-[#FF5722]">
              Find Us
            </h3>
            <div className="w-full h-32 md:h-48 rounded-xl overflow-hidden border border-black/10 shadow-lg relative bg-white/50">
               <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?q=KL+University,+Vaddeswaram&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="filter grayscale hover:grayscale-0 transition-all duration-500 opacity-90 hover:opacity-100"
                title="KL University Map"
                loading="lazy"
               ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Highly Simplified for Mobile */}
        <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] md:text-xs text-center md:text-left text-gray-400 uppercase tracking-wider">
            &copy; 2026 FemFlare.
          </p>
          <div className="hidden md:flex items-center gap-6 text-xs text-gray-500 uppercase tracking-wider">
            <Link href="/privacy" className="hover:text-[#FF5722] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#FF5722] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-black/10 flex items-center justify-center text-gray-600 hover:bg-[#FF5722] hover:text-white hover:border-[#FF5722] transition-all duration-300"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link
      href={href}
      className="text-gray-600 hover:text-[#FF5722] hover:pl-2 transition-all duration-300 text-xs md:text-sm font-medium uppercase tracking-wide inline-flex items-center gap-2 group justify-center md:justify-start"
    >
      <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-[#FF5722] opacity-0 group-hover:opacity-100 transition-opacity"></span>
      {label}
    </Link>
  </li>
);

export default Footer;
