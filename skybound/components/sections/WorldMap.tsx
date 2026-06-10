"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Star, ArrowRight } from "lucide-react";
import { destinations } from "@/lib/data";

// Approximate lat/lng to SVG percentage positions for world map
const pinPositions: Record<string, { x: number; y: number }> = {
  "Maldives": { x: 67, y: 58 },
  "Santorini": { x: 54, y: 40 },
  "Serengeti": { x: 56, y: 62 },
  "Kyoto": { x: 80, y: 42 },
  "Patagonia": { x: 28, y: 82 },
  "Amalfi Coast": { x: 52, y: 40 },
};

export default function WorldMap() {
  const [selected, setSelected] = useState<(typeof destinations)[0] | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="map"
      className="section-padding bg-[#0a0f1e] relative overflow-hidden"
      aria-label="Interactive world map"
    >
      {/* Subtle glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px gradient-line"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge glass border border-sky-500/20 text-sky-300 text-[10px] mb-6">
            World Explorer
          </span>
          <h2
            className="text-5xl md:text-7xl text-white font-light mb-5"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Your World,{" "}
            <em className="text-gradient not-italic">Unlocked</em>
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            Click any destination to explore. Every pin represents a story waiting to be written.
          </p>
        </motion.div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass-card rounded-3xl overflow-hidden"
          style={{ aspectRatio: "2/1" }}
        >
          {/* SVG World Map (simplified) */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 1000 500" className="w-full h-full" aria-hidden="true">
              {/* Simplified continent outlines */}
              {/* North America */}
              <path
                d="M 100,80 L 280,80 L 280,220 L 200,260 L 150,240 L 100,220 Z"
                fill="rgba(255,255,255,0.1)"
                stroke="rgba(14,165,233,0.3)"
                strokeWidth="1"
              />
              {/* South America */}
              <path
                d="M 200,270 L 270,270 L 285,420 L 225,460 L 190,420 L 200,320 Z"
                fill="rgba(255,255,255,0.1)"
                stroke="rgba(14,165,233,0.3)"
                strokeWidth="1"
              />
              {/* Europe */}
              <path
                d="M 450,60 L 560,60 L 565,140 L 520,160 L 455,150 L 445,100 Z"
                fill="rgba(255,255,255,0.1)"
                stroke="rgba(14,165,233,0.3)"
                strokeWidth="1"
              />
              {/* Africa */}
              <path
                d="M 470,170 L 580,170 L 590,370 L 530,410 L 475,380 L 460,260 Z"
                fill="rgba(255,255,255,0.1)"
                stroke="rgba(14,165,233,0.3)"
                strokeWidth="1"
              />
              {/* Asia */}
              <path
                d="M 575,50 L 870,50 L 880,220 L 800,260 L 680,240 L 600,200 L 570,140 Z"
                fill="rgba(255,255,255,0.1)"
                stroke="rgba(14,165,233,0.3)"
                strokeWidth="1"
              />
              {/* Australia */}
              <path
                d="M 760,300 L 880,300 L 885,400 L 810,410 L 755,380 Z"
                fill="rgba(255,255,255,0.1)"
                stroke="rgba(14,165,233,0.3)"
                strokeWidth="1"
              />
              {/* Grid lines */}
              {[100, 200, 300, 400].map((y) => (
                <line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(14,165,233,0.08)" strokeWidth="0.5" />
              ))}
              {[200, 400, 600, 800].map((x) => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" stroke="rgba(14,165,233,0.08)" strokeWidth="0.5" />
              ))}
            </svg>
          </div>

          {/* Ocean background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 120% 80% at 50% 50%, rgba(14,165,233,0.04) 0%, transparent 70%)",
            }}
          />

          {/* Destination pins */}
          {destinations.map((dest) => {
            const pos = pinPositions[dest.name];
            if (!pos) return null;

            return (
              <motion.button
                key={dest.id}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
                onClick={() => setSelected(selected?.id === dest.id ? null : dest)}
                onMouseEnter={() => setHovered(dest.id)}
                onMouseLeave={() => setHovered(null)}
                aria-label={`View ${dest.name}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: dest.id * 0.4 }}
                  className="absolute inset-0 rounded-full bg-sky-500/30"
                />
                {/* Pin */}
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    selected?.id === dest.id
                      ? "bg-sky-400 border-sky-300 scale-125"
                      : "bg-sky-500/60 border-sky-400/60 group-hover:bg-sky-400 group-hover:border-sky-300"
                  }`}
                />
                {/* Tooltip */}
                <AnimatePresence>
                  {hovered === dest.id && selected?.id !== dest.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-5 glass-card rounded-xl px-3 py-2 pointer-events-none whitespace-nowrap z-20"
                    >
                      <p className="text-white text-xs font-medium">{dest.name}</p>
                      <p className="text-white/50 text-[10px]">{dest.price}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}

          {/* Selected destination panel */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-4 top-4 bottom-4 w-64 glass-card rounded-2xl p-5 z-20 overflow-y-auto"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{selected.flag}</span>
                      <span className="badge text-[9px]" style={{ background: `${selected.tagColor}20`, border: `1px solid ${selected.tagColor}40`, color: selected.tagColor }}>
                        {selected.tag}
                      </span>
                    </div>
                    <h3 className="text-white text-xl font-light" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
                      {selected.name}
                    </h3>
                    <p className="text-white/40 text-xs">{selected.country}</p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-white/40 hover:text-white p-1"
                    aria-label="Close"
                  >
                    <X size={14} />
                  </button>
                </div>

                <p className="text-white/50 text-xs leading-relaxed mb-4">
                  {selected.description}
                </p>

                <div className="space-y-2 mb-4">
                  {selected.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs text-white/60">
                      <div className="w-1 h-1 rounded-full bg-sky-400" />
                      {h}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1 mb-4" aria-label={`Rating: ${selected.rating}`}>
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={10} className={s <= Math.floor(selected.rating) ? "star-filled fill-current" : "star-empty"} />
                  ))}
                  <span className="text-white/40 text-[10px] ml-1">{selected.rating}</span>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/40 text-xs mb-0.5">{selected.duration}</p>
                  <p className="text-white text-lg font-light mb-3">{selected.price}</p>
                  <a
                    href="#booking"
                    className="flex items-center justify-center gap-2 w-full bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/30 text-sky-300 text-xs font-medium py-2.5 rounded-xl transition-all"
                  >
                    Book Now <ArrowRight size={12} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats below map */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          {[
            { value: "195", label: "Countries" },
            { value: "6", label: "Continents" },
            { value: "47K+", label: "Journeys" },
          ].map(({ value, label }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center glass-card rounded-2xl py-6"
            >
              <p className="text-3xl text-white font-light" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
                {value}
              </p>
              <p className="text-white/40 text-xs tracking-wide mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
