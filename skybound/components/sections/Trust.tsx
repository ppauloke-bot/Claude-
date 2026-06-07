"use client";

import { motion } from "framer-motion";
import {
  Shield, Award, Clock, Globe, CreditCard, Headphones,
  CheckCircle, Star, Users, Plane
} from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "100% Secure Payments",
    description: "Bank-level encryption. Your financial data never stored.",
    color: "#34d399",
  },
  {
    icon: CreditCard,
    title: "Flexible Refund Policy",
    description: "Full refund up to 30 days before departure. No questions asked.",
    color: "#38bdf8",
  },
  {
    icon: Headphones,
    title: "24/7 Concierge",
    description: "A dedicated travel expert reachable anywhere in the world.",
    color: "#a78bfa",
  },
  {
    icon: Award,
    title: "Award-Winning Agency",
    description: "Condé Nast Traveller Best Agency 2023, 2024.",
    color: "#fbbf24",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Partners in 195 countries. Local expertise everywhere.",
    color: "#f472b6",
  },
  {
    icon: CheckCircle,
    title: "Best Price Guarantee",
    description: "Find it cheaper elsewhere, we'll match and beat it by 10%.",
    color: "#fb923c",
  },
];

const partners = [
  "Emirates", "Qatar Airways", "Singapore Airlines",
  "Four Seasons", "Aman Resorts", "Ritz-Carlton",
  "Amex Centurion", "Visa Infinite",
];

const awards = [
  { name: "Condé Nast\nBest Agency", year: "2024" },
  { name: "World Travel\nAwards Winner", year: "2023" },
  { name: "Forbes\nTravel Guide", year: "5-Star" },
  { name: "ATTA\nAdventure Certified", year: "Since 2018" },
];

export default function Trust() {
  return (
    <section
      id="about"
      className="section-padding bg-[#0a0f1e] relative"
      aria-label="Trust and credentials"
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
          className="text-center mb-20"
        >
          <span className="badge glass border border-sky-500/20 text-sky-300 text-[10px] mb-6">
            Why Skybound
          </span>
          <h2
            className="text-5xl md:text-7xl text-white font-light mb-5"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Built on{" "}
            <em className="text-gradient not-italic">Trust</em>
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            Twelve years. Forty-seven thousand journeys. One promise: your perfect experience.
          </p>
        </motion.div>

        {/* Trust grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-7 group hover:border-white/15 transition-all duration-300"
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
              >
                <item.icon size={20} style={{ color: item.color }} aria-hidden="true" />
              </div>
              <h3 className="text-white font-medium text-sm mb-2">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-white/30 text-xs tracking-[0.2em] uppercase text-center mb-8">
            Awards & Recognition
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {awards.map((award, i) => (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5 text-center border border-white/[0.06]"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-3">
                  <Award size={14} className="text-amber-400" aria-hidden="true" />
                </div>
                <p className="text-white text-xs font-medium leading-tight whitespace-pre-line mb-1">
                  {award.name}
                </p>
                <p className="text-white/30 text-[10px]">{award.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partner logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-white/30 text-xs tracking-[0.2em] uppercase text-center mb-8">
            Airline & Hospitality Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partners.map((partner, i) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl px-5 py-3 border border-white/[0.06]"
              >
                <p className="text-white/40 text-xs font-medium tracking-wide">
                  {partner}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12 pt-12 border-t border-white/[0.06]">
          {[
            { icon: Shield, label: "SSL Secured" },
            { icon: CreditCard, label: "PCI DSS Compliant" },
            { icon: CheckCircle, label: "IATA Accredited" },
            { icon: Users, label: "ABTA Member" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/30">
              <Icon size={14} />
              <span className="text-xs tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
