"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Search, MapPin, Calendar, Users } from "lucide-react";
import dynamic from "next/dynamic";

const AirplaneScene = dynamic(() => import("../3d/AirplaneScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border border-sky-500/30 rounded-full animate-spin" />
    </div>
  ),
});

const words = ["Extraordinary", "Unforgettable", "Legendary", "Boundless"];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [wordIndex, setWordIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#020617]"
      onMouseMove={onMouseMove}
      aria-label="Hero section"
    >
      {/* Radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 20%, rgba(14,165,233,0.12) 0%, rgba(30,58,138,0.08) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Animated clouds */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute opacity-[0.04] pointer-events-none"
          style={{
            top: `${20 + i * 18}%`,
            animationDelay: `${i * 4}s`,
            animation: `cloudDrift ${25 + i * 8}s linear infinite`,
          }}
        >
          <svg width="300" height="80" viewBox="0 0 300 80" fill="white">
            <ellipse cx="80" cy="50" rx="80" ry="30" />
            <ellipse cx="150" cy="35" rx="70" ry="35" />
            <ellipse cx="220" cy="48" rx="60" ry="25" />
          </svg>
        </div>
      ))}

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* 3D Scene */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 plane-container">
          <AirplaneScene mousePos={mousePos} />
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6"
      >
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mb-8"
        >
          <span className="badge glass border border-sky-500/20 text-sky-300 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            195 Countries · Premium Experiences · Since 2012
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="hero-title text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] text-white mb-6 max-w-6xl"
        >
          Journey to the{" "}
          <span className="relative inline-block">
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-gradient block"
            >
              {words[wordIndex]}
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="text-white/50 text-lg md:text-xl font-light max-w-xl mb-12 leading-relaxed"
        >
          Bespoke luxury travel crafted for those who refuse ordinary.
          Your journey begins where the map ends.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="w-full max-w-3xl"
        >
          <div className="glass-card rounded-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Destination */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] min-w-0">
              <MapPin size={16} className="text-sky-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-white/35 text-[10px] tracking-wide uppercase mb-0.5">
                  Destination
                </p>
                <input
                  type="text"
                  placeholder="Where do you dream?"
                  className="bg-transparent text-white text-sm font-light w-full outline-none placeholder:text-white/30"
                  aria-label="Destination"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-10 bg-white/10" />

            {/* Date */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] min-w-0">
              <Calendar size={16} className="text-sky-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-white/35 text-[10px] tracking-wide uppercase mb-0.5">
                  When
                </p>
                <input
                  type="text"
                  placeholder="Any time"
                  className="bg-transparent text-white text-sm font-light w-full outline-none placeholder:text-white/30"
                  aria-label="Travel date"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-10 bg-white/10" />

            {/* Guests */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <Users size={16} className="text-sky-400 shrink-0" />
              <div>
                <p className="text-white/35 text-[10px] tracking-wide uppercase mb-0.5">
                  Guests
                </p>
                <p className="text-white text-sm font-light">2 Adults</p>
              </div>
            </div>

            {/* Search */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-medium px-8 py-3.5 rounded-xl transition-all duration-300 shrink-0"
              aria-label="Search destinations"
            >
              <Search size={16} />
              <span className="hidden sm:inline">Explore</span>
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="flex items-center gap-8 mt-10"
        >
          {[
            { value: "47K+", label: "Journeys crafted" },
            { value: "4.9★", label: "Average rating" },
            { value: "195", label: "Countries" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-white text-lg font-light">{value}</p>
              <p className="text-white/35 text-xs tracking-wide mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-label="Scroll down"
      >
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={14} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
