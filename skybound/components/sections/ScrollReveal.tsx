"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cabinSections = [
  {
    id: "cockpit",
    title: "The Cockpit",
    subtitle: "Where Every Journey Begins",
    description:
      "Step into the realm of the captain. 270-degree panoramic view, dual sidestick control, next-generation avionics — technology serving human ambition.",
    icon: "✈",
    color: "#38bdf8",
    accent: "from-sky-500/20 to-transparent",
    stat: "4,200+ nm range",
  },
  {
    id: "firstclass",
    title: "First Class Suite",
    subtitle: "The Sky, Reimagined",
    description:
      "A private sanctuary at 40,000 feet. Lie-flat beds upholstered in cashmere. Personal attendant. Sommelier-curated wine list. A spa in the clouds.",
    icon: "👑",
    color: "#fbbf24",
    accent: "from-amber-500/20 to-transparent",
    stat: "8 suites · 6'8\" flat bed",
  },
  {
    id: "business",
    title: "Business Class",
    subtitle: "Where Productivity Meets Luxury",
    description:
      "Aisle access from every seat. 4K personal screen. Chef-prepared cuisine reflecting the destination. Arrive refreshed, inspired, and ready.",
    icon: "💼",
    color: "#a78bfa",
    accent: "from-violet-500/20 to-transparent",
    stat: "42 seats · Direct aisle access",
  },
  {
    id: "economy",
    title: "Premium Economy",
    subtitle: "Elevated Comfort for All",
    description:
      "Because luxury shouldn't be an exception. Extra legroom, enhanced service, and the same culinary attention given to every class.",
    icon: "🌟",
    color: "#34d399",
    accent: "from-emerald-500/20 to-transparent",
    stat: "186 seats · 4\" extra recline",
  },
];

export default function ScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !planeRef.current) return;

    const ctx = gsap.context(() => {
      // Animate each section
      cabinSections.forEach((section, i) => {
        const el = containerRef.current!.querySelector(`#cabin-${section.id}`);
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 40%",
              scrub: false,
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Plane SVG animation
      const planePath = planeRef.current!.querySelector(".plane-body");
      if (planePath) {
        gsap.to(planePath, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-[#020617] overflow-hidden"
      id="experience"
      aria-label="Aircraft experience journey"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(14,165,233,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-24"
        >
          <span className="badge glass border border-sky-500/20 text-sky-300 text-[10px] mb-6">
            The Aircraft Experience
          </span>
          <h2
            className="text-5xl md:text-7xl text-white font-light mb-6"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Step{" "}
            <em className="text-gradient not-italic">Inside</em>
          </h2>
          <p className="text-white/40 text-lg max-w-lg mx-auto">
            From cockpit to cargo hold — discover the world of modern aviation
            reimagined for luxury travel.
          </p>
        </motion.div>

        {/* Cabin sections */}
        <div className="space-y-32">
          {cabinSections.map((section, i) => (
            <div
              key={section.id}
              id={`cabin-${section.id}`}
              className={`flex flex-col ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-16`}
            >
              {/* Visual */}
              <div className="flex-1 relative">
                <div
                  className="relative rounded-3xl overflow-hidden glass-card"
                  style={{ aspectRatio: "4/3" }}
                >
                  {/* Abstract airplane section illustration */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${section.accent}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <span className="text-8xl" aria-hidden="true">
                        {section.icon}
                      </span>
                      <div
                        className="h-px w-24 mx-auto opacity-40"
                        style={{ background: section.color }}
                      />
                      <p
                        className="text-2xl font-light"
                        style={{ color: section.color }}
                      >
                        {section.stat}
                      </p>
                    </div>
                  </div>
                  {/* Decorative rings */}
                  {[1, 2, 3].map((ring) => (
                    <div
                      key={ring}
                      className="absolute inset-0 rounded-full border border-white/[0.04]"
                      style={{
                        margin: `${ring * 20}px`,
                        transform: `scale(${1 - ring * 0.1})`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 space-y-6">
                <div>
                  <p
                    className="text-xs tracking-[0.2em] uppercase mb-3 font-medium"
                    style={{ color: section.color }}
                  >
                    {section.subtitle}
                  </p>
                  <h3
                    className="text-4xl md:text-5xl text-white font-light"
                    style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
                  >
                    {section.title}
                  </h3>
                </div>
                <div className="h-px gradient-line" />
                <p className="text-white/50 text-lg leading-relaxed font-light">
                  {section.description}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-px"
                    style={{ background: section.color }}
                  />
                  <span className="text-sm font-medium" style={{ color: section.color }}>
                    {section.stat}
                  </span>
                </div>
                <a
                  href="#booking"
                  className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors group"
                >
                  <span>Reserve this experience</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
