"use client";

import { motion } from "framer-motion";
import { Globe, ExternalLink, Link2, PlayCircle, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Destinations: [
    "Maldives", "Santorini", "Serengeti",
    "Kyoto", "Patagonia", "Amalfi Coast",
  ],
  Experiences: [
    "Luxury Safari", "Private Islands", "City Escapes",
    "Adventure Tours", "Honeymoons", "Group Travel",
  ],
  Company: [
    "About Us", "Our Story", "Sustainability",
    "Press", "Careers", "Partners",
  ],
  Support: [
    "How It Works", "FAQ", "Refund Policy",
    "Travel Insurance", "Visa Info", "24/7 Support",
  ],
};

const socials = [
  { Icon: Globe, label: "Instagram", href: "#" },
  { Icon: ExternalLink, label: "Twitter / X", href: "#" },
  { Icon: Link2, label: "LinkedIn", href: "#" },
  { Icon: PlayCircle, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 border-t border-white/[0.06]" role="contentinfo">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px gradient-line" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Main footer */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-ocean-600 opacity-90" />
              <span
                className="text-white font-light text-xl tracking-[0.15em] uppercase"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                Skybound
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs">
              Curated luxury travel for the discerning explorer. We transform extraordinary destinations into unforgettable stories.
            </p>
            {/* Contact */}
            <div className="space-y-3">
              {[
                { Icon: Mail, text: "hello@skybound.travel" },
                { Icon: Phone, text: "+1 800 SKY-BOUND" },
                { Icon: MapPin, text: "350 Fifth Avenue, New York" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/40 text-xs">
                  <Icon size={14} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            {/* Social */}
            <div className="flex items-center gap-4 mt-8">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white/60 text-xs font-medium tracking-[0.12em] uppercase mb-5">
                {category}
              </h3>
              <ul className="space-y-3" role="list">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/35 hover:text-white/70 text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © 2025 Skybound Travel Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
