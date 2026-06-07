"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section
      className="py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #020617 0%, #0c4a6e 40%, #075985 70%, #0369a1 100%)",
      }}
      aria-label="Call to action"
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,165,233,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse, rgba(56,189,248,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-sky-400/40"
          style={{
            left: `${10 + i * 8}%`,
            top: `${20 + Math.sin(i) * 40}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="badge glass border border-sky-400/30 text-sky-200 text-[10px] mb-8">
            <Sparkles size={10} />
            Limited Availability 2025
          </span>

          <h2
            className="text-5xl md:text-7xl lg:text-8xl text-white font-light leading-none mb-8"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Your Perfect Journey{" "}
            <em className="block not-italic" style={{
              background: "linear-gradient(135deg, #fff 0%, #bae6fd 50%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Awaits
            </em>
          </h2>

          <p className="text-white/60 text-xl font-light max-w-xl mx-auto mb-12 leading-relaxed">
            Join 47,000 discerning travelers who chose experience over everything else.
            Your story begins with a single conversation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#booking"
              className="group flex items-center gap-3 bg-white text-[#0c4a6e] font-medium text-sm tracking-wider uppercase px-10 py-4 rounded-full hover:bg-white/95 transition-all duration-300 shadow-lg shadow-sky-500/20"
            >
              Begin My Journey
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+18005729268"
              className="flex items-center gap-3 glass border border-white/20 text-white font-light text-sm tracking-wider uppercase px-10 py-4 rounded-full hover:border-white/40 transition-all duration-300"
            >
              Speak to a Specialist
            </a>
          </div>

          <p className="text-white/25 text-xs mt-8">
            No commitment required · Free personalized consultation · 24/7 availability
          </p>
        </motion.div>
      </div>
    </section>
  );
}
