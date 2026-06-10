"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, BadgeCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { reviews } from "@/lib/data";

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % reviews.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const review = reviews[current];

  return (
    <section
      id="reviews"
      className="section-padding bg-[#020617] relative overflow-hidden"
      aria-label="Customer reviews"
    >
      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(14,165,233,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="badge glass border border-sky-500/20 text-sky-300 text-[10px] mb-6">
            Verified Travelers
          </span>
          <h2
            className="text-5xl md:text-7xl text-white font-light mb-5"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Stories from{" "}
            <em className="text-gradient not-italic">the Road</em>
          </h2>
          {/* Rating summary */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={14} className="star-filled fill-current" />
              ))}
            </div>
            <span className="text-white text-base font-light">4.9 / 5</span>
            <span className="text-white/40 text-sm">· 12,847 verified reviews</span>
          </div>
        </motion.div>

        {/* Main review */}
        <div className="relative" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-10 md:p-14 relative"
            >
              {/* Quote mark */}
              <Quote
                size={48}
                className="absolute top-8 right-10 text-sky-500/10"
                aria-hidden="true"
              />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-8">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={16} className="star-filled fill-current" />
                ))}
              </div>

              {/* Review text */}
              <blockquote>
                <p
                  className="text-white/80 text-xl md:text-2xl font-light leading-relaxed mb-10"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
                >
                  "{review.review}"
                </p>
              </blockquote>

              {/* Reviewer */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium text-sm">{review.name}</p>
                      {review.verified && (
                        <BadgeCheck
                          size={14}
                          className="text-sky-400"
                          aria-label="Verified traveler"
                        />
                      )}
                    </div>
                    <p className="text-white/40 text-xs">{review.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sky-400 text-xs font-medium">{review.trip}</p>
                  <p className="text-white/30 text-xs mt-0.5">{review.date}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2" aria-label="Review navigation">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-6 h-1.5 bg-sky-400"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all"
                aria-label="Previous review"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all"
                aria-label="Next review"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mini reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {reviews.slice(0, 3).map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`glass rounded-2xl p-4 cursor-pointer transition-all duration-300 border ${
                current === i
                  ? "border-sky-500/30 bg-sky-500/5"
                  : "border-white/[0.06] hover:border-white/15"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full overflow-hidden relative">
                  <Image src={r.avatar} alt={r.name} fill className="object-cover" />
                </div>
                <p className="text-white text-xs font-medium truncate">{r.name}</p>
              </div>
              <div className="flex items-center gap-0.5 mb-2">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={8} className="star-filled fill-current" />
                ))}
              </div>
              <p className="text-white/40 text-[11px] line-clamp-2 leading-relaxed">
                {r.review}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
