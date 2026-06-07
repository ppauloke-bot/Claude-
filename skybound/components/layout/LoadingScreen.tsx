"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setVisible(false), 500);
      }
      setProgress(Math.min(p, 100));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[100000] bg-[#020617] flex flex-col items-center justify-center"
          role="progressbar"
          aria-label="Loading Skybound"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Animated logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="relative w-16 h-16 mx-auto mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-sky-500/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-sky-400/30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-8 h-8" aria-hidden="true">
                  <path d="M16 4L28 20H4L16 4Z" fill="white" opacity="0.9" />
                  <path
                    d="M8 20L16 28L24 20"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>
            <h1
              className="text-white/90 text-3xl font-light tracking-[0.3em] uppercase"
              style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
            >
              Skybound
            </h1>
            <p className="text-white/30 text-xs tracking-[0.2em] uppercase mt-2">
              Luxury Travel
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-48 space-y-3"
          >
            <div className="h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-500 to-blue-400"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <p className="text-white/25 text-xs text-center tracking-widest">
              {Math.round(progress)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
