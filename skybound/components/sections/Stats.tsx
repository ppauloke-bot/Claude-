"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/lib/data";

function AnimatedNumber({
  value,
  suffix,
  decimal,
  isVisible,
}: {
  value: number;
  suffix: string;
  decimal?: boolean;
  isVisible: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const step = 16;
    const steps = duration / step;
    const increment = (end - start) / steps;
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setDisplay(current);
    }, step);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span aria-label={`${value}${suffix}`}>
      {decimal ? display.toFixed(1) : Math.floor(display)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 bg-[#0a0f1e] relative"
      aria-label="Company statistics"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px gradient-line"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px gradient-line"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="text-center"
            >
              <p
                className="text-4xl md:text-5xl text-white font-light mb-2 counter-animate"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  decimal={stat.decimal}
                  isVisible={isInView}
                />
              </p>
              <p className="text-white/40 text-sm tracking-wide">{stat.label}</p>
              <div
                className="h-px w-12 mx-auto mt-4"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(14,165,233,${0.3 + i * 0.15}), transparent)`,
                }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
