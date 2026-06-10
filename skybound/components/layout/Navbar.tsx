"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Phone } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#destinations", label: "Destinations" },
  { href: "#experiences", label: "Experiences" },
  { href: "#map", label: "World Map" },
  { href: "#about", label: "About" },
  { href: "#blog", label: "Journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastScrollY.current && y > 200);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 glass-dark border-b border-white/[0.06]"
            : "py-6"
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Skybound home"
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 to-ocean-600 opacity-80 group-hover:opacity-100 transition-opacity" />
              <svg
                viewBox="0 0 32 32"
                className="relative w-full h-full"
                aria-hidden="true"
              >
                <path
                  d="M16 4L28 20H4L16 4Z"
                  fill="white"
                  opacity="0.9"
                />
                <path
                  d="M8 20L16 28L24 20"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.6"
                />
              </svg>
            </div>
            <span
              className="text-white font-light text-xl tracking-[0.15em] uppercase"
              style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
            >
              Skybound
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link text-white/70 hover:text-white text-sm font-light tracking-wide transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+18005729268"
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
              aria-label="Call us"
            >
              <Phone size={14} />
              <span className="font-light text-xs tracking-wide">
                +1 800 SKY-BOUND
              </span>
            </a>
            <a
              href="#booking"
              className="group relative overflow-hidden bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-light tracking-widest uppercase px-6 py-2.5 rounded-full transition-all duration-300"
            >
              <span className="relative z-10">Book Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-ocean-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 text-white/80 hover:text-white"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass-dark pt-24 px-6"
          >
            <ul className="flex flex-col gap-6" role="list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl font-light text-white/80 hover:text-white"
                    style={{
                      fontFamily: "Cormorant Garamond, Georgia, serif",
                    }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-12 pt-8 border-t border-white/10">
              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-white/10 border border-white/20 text-white font-light tracking-widest uppercase py-4 rounded-full text-sm"
              >
                Book Your Journey
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
