"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar, Users, MapPin, Plane, CreditCard,
  Shield, Check, ChevronDown, ArrowRight, Clock
} from "lucide-react";

const packages = [
  {
    id: "essential",
    name: "Essential",
    price: 2400,
    per: "per person",
    description: "Curated itinerary, premium hotels, private transfers",
    features: [
      "Luxury hotel accommodation",
      "Private airport transfers",
      "Curated daily itinerary",
      "Local expert guide",
      "24/7 support line",
    ],
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 4800,
    per: "per person",
    description: "First-class flights, private villa, dedicated concierge",
    features: [
      "Everything in Essential",
      "First-class flights included",
      "Private villa or suite",
      "Dedicated concierge",
      "Exclusive dining reservations",
      "Spa credit $500",
    ],
    highlighted: true,
  },
  {
    id: "ultra",
    name: "Ultra",
    price: 12000,
    per: "per person",
    description: "Private jet, exclusive island, bespoke everything",
    features: [
      "Everything in Premium",
      "Private jet charter",
      "Entire property buyout",
      "Celebrity chef dining",
      "Helicopter sightseeing",
      "Bespoke any element",
    ],
    highlighted: false,
  },
];

export default function Booking() {
  const [selectedPkg, setSelectedPkg] = useState("premium");
  const [travelers, setTravelers] = useState(2);
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState(1);

  const pkg = packages.find((p) => p.id === selectedPkg) || packages[1];
  const total = pkg.price * travelers;

  return (
    <section
      id="booking"
      className="section-padding bg-gradient-to-b from-[#020617] to-[#0a0f1e] relative"
      aria-label="Book your journey"
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
          className="text-center mb-16"
        >
          <span className="badge glass border border-sky-500/20 text-sky-300 text-[10px] mb-6">
            Transparent Pricing
          </span>
          <h2
            className="text-5xl md:text-7xl text-white font-light mb-5"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Begin Your{" "}
            <em className="text-gradient not-italic">Journey</em>
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            No hidden fees. No surprises. Complete transparency from first click to final memory.
          </p>
        </motion.div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedPkg(pkg.id)}
              className={`relative glass-card rounded-3xl p-8 cursor-pointer transition-all duration-300 ${
                selectedPkg === pkg.id
                  ? "border-sky-500/40 bg-sky-500/5"
                  : "hover:border-white/15"
              } ${pkg.highlighted ? "md:scale-105" : ""}`}
              role="radio"
              aria-checked={selectedPkg === pkg.id}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedPkg(pkg.id)}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge bg-sky-500 text-white text-[9px] border-0">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Selected indicator */}
              {selectedPkg === pkg.id && (
                <div className="absolute top-5 right-5">
                  <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center">
                    <Check size={10} className="text-white" aria-hidden="true" />
                  </div>
                </div>
              )}

              <h3
                className="text-white text-xl font-light mb-1"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                {pkg.name}
              </h3>
              <p className="text-white/40 text-xs mb-6">{pkg.description}</p>

              <div className="mb-6">
                <span className="text-4xl text-white font-light">
                  ${pkg.price.toLocaleString()}
                </span>
                <span className="text-white/40 text-sm ml-2">{pkg.per}</span>
              </div>

              <div className="space-y-2.5">
                {pkg.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 text-white/60 text-sm">
                    <Check size={12} className="text-sky-400 shrink-0" aria-hidden="true" />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 md:p-10">
            <h3 className="text-white text-2xl font-light mb-8" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
              Reserve Your Experience
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (step === 1) setStep(2);
              }}
              className="space-y-5"
            >
              {step === 1 && (
                <>
                  {/* Destination */}
                  <div>
                    <label className="block text-white/50 text-xs tracking-wide uppercase mb-2" htmlFor="destination">
                      Destination
                    </label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" aria-hidden="true" />
                      <input
                        id="destination"
                        type="text"
                        placeholder="Where would you like to go?"
                        className="w-full bg-white/[0.04] border border-white/10 text-white text-sm pl-10 pr-4 py-3.5 rounded-xl outline-none focus:border-sky-500/40 transition-colors placeholder:text-white/25"
                        required
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/50 text-xs tracking-wide uppercase mb-2" htmlFor="depart">
                        Departure
                      </label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" aria-hidden="true" />
                        <input
                          id="depart"
                          type="date"
                          className="w-full bg-white/[0.04] border border-white/10 text-white text-sm pl-10 pr-4 py-3.5 rounded-xl outline-none focus:border-sky-500/40 transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs tracking-wide uppercase mb-2" htmlFor="return">
                        Return
                      </label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" aria-hidden="true" />
                        <input
                          id="return"
                          type="date"
                          className="w-full bg-white/[0.04] border border-white/10 text-white text-sm pl-10 pr-4 py-3.5 rounded-xl outline-none focus:border-sky-500/40 transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Travelers */}
                  <div>
                    <label className="block text-white/50 text-xs tracking-wide uppercase mb-2">
                      Travelers
                    </label>
                    <div className="flex items-center gap-4 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5">
                      <Users size={14} className="text-sky-400" aria-hidden="true" />
                      <span className="text-white/50 text-sm flex-1">Adults</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setTravelers((t) => Math.max(1, t - 1))}
                          className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                          aria-label="Remove traveler"
                        >
                          −
                        </button>
                        <span className="text-white w-4 text-center text-sm">{travelers}</span>
                        <button
                          type="button"
                          onClick={() => setTravelers((t) => Math.min(10, t + 1))}
                          className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                          aria-label="Add traveler"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Package summary */}
                  <div className="bg-sky-500/5 border border-sky-500/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sky-300 text-xs font-medium">{pkg.name} Package</p>
                        <p className="text-white/50 text-xs mt-0.5">
                          ${pkg.price.toLocaleString()} × {travelers} traveler{travelers > 1 ? "s" : ""}
                        </p>
                      </div>
                      <p className="text-white text-xl font-light">
                        ${total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    Continue to Details
                    <ArrowRight size={16} />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/50 text-xs tracking-wide uppercase mb-2" htmlFor="fname">
                        First Name
                      </label>
                      <input
                        id="fname"
                        type="text"
                        placeholder="Alexandra"
                        className="w-full bg-white/[0.04] border border-white/10 text-white text-sm px-4 py-3.5 rounded-xl outline-none focus:border-sky-500/40 transition-colors placeholder:text-white/25"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs tracking-wide uppercase mb-2" htmlFor="lname">
                        Last Name
                      </label>
                      <input
                        id="lname"
                        type="text"
                        placeholder="Chen"
                        className="w-full bg-white/[0.04] border border-white/10 text-white text-sm px-4 py-3.5 rounded-xl outline-none focus:border-sky-500/40 transition-colors placeholder:text-white/25"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs tracking-wide uppercase mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-white/[0.04] border border-white/10 text-white text-sm px-4 py-3.5 rounded-xl outline-none focus:border-sky-500/40 transition-colors placeholder:text-white/25"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs tracking-wide uppercase mb-2" htmlFor="phone">
                      Phone (for concierge contact)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/[0.04] border border-white/10 text-white text-sm px-4 py-3.5 rounded-xl outline-none focus:border-sky-500/40 transition-colors placeholder:text-white/25"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs tracking-wide uppercase mb-2" htmlFor="requests">
                      Special Requests
                    </label>
                    <textarea
                      id="requests"
                      rows={3}
                      placeholder="Dietary requirements, accessibility needs, special occasions..."
                      className="w-full bg-white/[0.04] border border-white/10 text-white text-sm px-4 py-3.5 rounded-xl outline-none focus:border-sky-500/40 transition-colors placeholder:text-white/25 resize-none"
                    />
                  </div>

                  {/* T&C */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div
                      className={`w-4 h-4 mt-0.5 rounded border shrink-0 flex items-center justify-center transition-all ${
                        agreed ? "bg-sky-500 border-sky-500" : "border-white/20"
                      }`}
                      onClick={() => setAgreed((v) => !v)}
                    >
                      {agreed && <Check size={10} className="text-white" aria-hidden="true" />}
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required
                    />
                    <span className="text-white/40 text-xs leading-relaxed">
                      I agree to the{" "}
                      <a href="#" className="text-sky-400 hover:text-sky-300">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-sky-400 hover:text-sky-300">
                        Privacy Policy
                      </a>
                      . Full refund available up to 30 days before departure.
                    </span>
                  </label>

                  {/* Total + submit */}
                  <div className="bg-sky-500/5 border border-sky-500/20 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-white/40 text-xs">Total for {travelers} traveler{travelers > 1 ? "s" : ""}</p>
                      <p className="text-white text-2xl font-light">${total.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/30 text-[10px]">Secure checkout</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Shield size={10} className="text-emerald-400" />
                        <span className="text-emerald-400 text-[10px]">Encrypted</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 glass border border-white/15 text-white/60 py-4 rounded-xl text-sm hover:text-white transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!agreed}
                      className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:opacity-40 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <CreditCard size={16} />
                      Confirm & Pay
                    </button>
                  </div>

                  {/* Payment methods */}
                  <div className="flex items-center justify-center gap-4 pt-2">
                    {["Visa", "Mastercard", "Amex", "PayPal"].map((pm) => (
                      <span key={pm} className="text-white/20 text-xs">{pm}</span>
                    ))}
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Urgency */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-6 mt-8 text-white/30 text-xs"
          >
            <div className="flex items-center gap-2">
              <Clock size={12} />
              <span>Instant confirmation</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-2">
              <Shield size={12} />
              <span>Free cancellation 30 days</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-2">
              <Plane size={12} />
              <span>IATA accredited</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
