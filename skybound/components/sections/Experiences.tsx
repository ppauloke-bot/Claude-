"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { experiences } from "@/lib/data";

export default function Experiences() {
  return (
    <section
      id="experiences"
      className="section-padding relative bg-gradient-to-b from-[#020617] to-[#0a0f1e]"
      aria-label="Travel experiences"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="badge glass border border-sky-500/20 text-sky-300 text-[10px] mb-6">
            Signature Experiences
          </span>
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <h2
              className="text-5xl md:text-7xl text-white font-light flex-1"
              style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
            >
              Curated{" "}
              <em className="text-gradient not-italic">for the Few</em>
            </h2>
            <p className="text-white/40 md:max-w-xs text-base leading-relaxed">
              Six categories of extraordinary. Each one designed around the
              principle that the journey itself is the destination.
            </p>
          </div>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer card-hover shine ${
                i === 0 || i === 4 ? "md:row-span-2" : ""
              }`}
              style={{
                aspectRatio: i === 0 || i === 4 ? undefined : "4/3",
                minHeight: i === 0 || i === 4 ? "500px" : undefined,
              }}
              aria-label={exp.title}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 30%, rgba(2,6,23,0.9) 100%)`,
                  }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, ${exp.color}20 0%, transparent 60%)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-7 flex flex-col justify-end">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${exp.color}20`, border: `1px solid ${exp.color}40` }}
                >
                  <span className="text-xl" aria-hidden="true">{exp.icon}</span>
                </div>

                <p
                  className="text-xs font-medium tracking-[0.15em] uppercase mb-1"
                  style={{ color: exp.color }}
                >
                  {exp.subtitle}
                </p>
                <h3
                  className="text-2xl text-white font-light mb-2"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
                >
                  {exp.title}
                </h3>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  whileHover={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden"
                >
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                </motion.div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/40 text-xs">{exp.duration}</p>
                    <p className="text-white font-light">{exp.price}</p>
                  </div>
                  <motion.a
                    href="#booking"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: `${exp.color}25`,
                      border: `1px solid ${exp.color}50`,
                    }}
                    aria-label={`Book ${exp.title}`}
                  >
                    <ArrowRight size={14} style={{ color: exp.color }} />
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
