"use client";

import dynamic from "next/dynamic";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Destinations from "@/components/sections/Destinations";
import Experiences from "@/components/sections/Experiences";
import WorldMap from "@/components/sections/WorldMap";
import Reviews from "@/components/sections/Reviews";
import Trust from "@/components/sections/Trust";
import Booking from "@/components/sections/Booking";
import Blog from "@/components/sections/Blog";
import CTA from "@/components/sections/CTA";

const ScrollReveal = dynamic(() => import("@/components/sections/ScrollReveal"), {
  ssr: false,
});

const CustomCursor = dynamic(() => import("@/components/layout/CustomCursor"), {
  ssr: false,
});

const SmoothScroll = dynamic(() => import("@/components/layout/SmoothScroll"), {
  ssr: false,
});

export default function ClientPage() {
  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <div className="noise-overlay" aria-hidden="true" />
      <SmoothScroll>
        <Navbar />
        <main id="main-content">
          <Hero />
          <Stats />
          <ScrollReveal />
          <Destinations />
          <Experiences />
          <WorldMap />
          <Reviews />
          <Trust />
          <Booking />
          <Blog />
          <CTA />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
