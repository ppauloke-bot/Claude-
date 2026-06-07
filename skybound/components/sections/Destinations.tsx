"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, MapPin, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { destinations } from "@/lib/data";

const categories = ["All", "Island", "Cultural", "Safari", "Adventure"];

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? destinations
      : destinations.filter((d) => d.category === activeCategory);

  return (
    <section
      id="destinations"
      className="section-padding bg-[#020617] relative overflow-hidden"
      aria-label="Destinations"
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(14,165,233,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="badge glass border border-sky-500/20 text-sky-300 text-[10px] mb-6">
            Curated Destinations
          </span>
          <h2
            className="text-5xl md:text-7xl text-white font-light mb-5"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Where Will You{" "}
            <em className="text-gradient not-italic">Dream?</em>
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            Each destination handpicked. Each experience architected. Nothing left to chance.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-14 flex-wrap"
          role="tablist"
          aria-label="Filter destinations by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-light tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-sky-500/20 border border-sky-500/40 text-sky-300"
                  : "glass border border-white/10 text-white/50 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((dest, i) => (
              <motion.article
                key={dest.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onHoverStart={() => setHovered(dest.id)}
                onHoverEnd={() => setHovered(null)}
                className="group relative rounded-3xl overflow-hidden card-hover shine cursor-pointer"
                style={{ aspectRatio: "4/5" }}
                aria-label={`${dest.name}, ${dest.country}`}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={dest.image}
                    alt={`${dest.name}, ${dest.country}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/30 to-transparent" />
                </div>

                {/* Tag */}
                <div className="absolute top-5 left-5">
                  <span
                    className="badge text-[10px] text-white"
                    style={{
                      background: `${dest.tagColor}25`,
                      border: `1px solid ${dest.tagColor}50`,
                      color: dest.tagColor,
                    }}
                  >
                    {dest.tag}
                  </span>
                </div>

                {/* Flag + availability */}
                <div className="absolute top-5 right-5 flex items-center gap-2">
                  <span
                    className="text-xl"
                    aria-label={`${dest.country} flag`}
                  >
                    {dest.flag}
                  </span>
                  {dest.availability === "Limited" && (
                    <span className="badge text-[9px] bg-red-500/20 border border-red-500/30 text-red-400">
                      Limited
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5" aria-label={`Rating: ${dest.rating} out of 5`}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={10}
                          className={
                            star <= Math.floor(dest.rating)
                              ? "star-filled fill-current"
                              : "star-empty"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-white/50 text-xs">
                      {dest.rating} ({dest.reviews})
                    </span>
                  </div>

                  {/* Name */}
                  <div>
                    <h3 className="text-white text-2xl font-light" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
                      {dest.name}
                    </h3>
                    <div className="flex items-center gap-1 text-white/40 text-xs mt-1">
                      <MapPin size={10} />
                      <span>{dest.country}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <AnimatePresence>
                    {hovered === dest.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-white/50 text-sm leading-relaxed overflow-hidden"
                      >
                        {dest.description}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div>
                      <p className="text-white/40 text-xs">
                        <Clock size={9} className="inline mr-1" />
                        {dest.duration}
                      </p>
                      <p className="text-white font-light text-base mt-0.5">
                        {dest.price}
                      </p>
                    </div>
                    <motion.a
                      href="#booking"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-light px-4 py-2 rounded-full transition-all"
                      aria-label={`Book ${dest.name}`}
                    >
                      Book Now
                      <ArrowRight size={12} />
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#booking"
            className="inline-flex items-center gap-3 glass border border-white/15 hover:border-white/25 text-white font-light tracking-widest uppercase text-sm px-10 py-4 rounded-full transition-all duration-300 group"
          >
            <Sparkles size={14} className="text-sky-400" />
            View All 195 Destinations
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
