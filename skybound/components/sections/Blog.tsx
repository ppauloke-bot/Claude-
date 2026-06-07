"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Image from "next/image";
import { blogPosts } from "@/lib/data";

export default function Blog() {
  return (
    <section
      id="blog"
      className="section-padding bg-[#020617] relative"
      aria-label="Travel journal"
    >
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
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="badge glass border border-sky-500/20 text-sky-300 text-[10px] mb-4">
              Travel Journal
            </span>
            <h2
              className="text-5xl md:text-6xl text-white font-light"
              style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
            >
              Stories of{" "}
              <em className="text-gradient not-italic">Wonder</em>
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors group shrink-0"
          >
            View all articles
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`group cursor-pointer ${i === 0 ? "md:col-span-2" : ""}`}
              aria-label={post.title}
            >
              {/* Image */}
              <div
                className="relative rounded-2xl overflow-hidden mb-5"
                style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 to-transparent" />

                {/* Category tag */}
                <div className="absolute top-4 left-4">
                  <span className="badge glass border border-white/20 text-white text-[10px]">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-white/30 text-xs mb-3">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  {post.readTime} read
                </span>
              </div>

              {/* Title */}
              <h3
                className={`text-white font-light group-hover:text-sky-200 transition-colors mb-3 ${
                  i === 0 ? "text-2xl md:text-3xl" : "text-xl"
                }`}
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-white/40 text-sm leading-relaxed line-clamp-2 mb-4">
                {post.excerpt}
              </p>

              {/* Read more */}
              <a
                href={`#blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm transition-colors group/link"
                aria-label={`Read ${post.title}`}
              >
                Read article
                <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
