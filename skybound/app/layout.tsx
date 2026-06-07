import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skybound.travel"),
  title: {
    default: "Skybound | Luxury Travel Experiences",
    template: "%s | Skybound",
  },
  description:
    "Curated luxury travel experiences for the discerning explorer. Private jets, exclusive resorts, and bespoke itineraries across 195 countries.",
  keywords: [
    "luxury travel",
    "private jet",
    "exclusive destinations",
    "bespoke travel",
    "premium travel agency",
    "safari",
    "private island",
    "luxury resort",
  ],
  authors: [{ name: "Skybound" }],
  creator: "Skybound",
  publisher: "Skybound",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skybound.travel",
    siteName: "Skybound",
    title: "Skybound | Luxury Travel Experiences",
    description:
      "Curated luxury travel experiences for the discerning explorer.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Skybound — Luxury Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skybound | Luxury Travel Experiences",
    description:
      "Curated luxury travel experiences for the discerning explorer.",
    images: ["/og-image.jpg"],
    creator: "@skybound",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://skybound.travel",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Skybound",
              description: "Curated luxury travel experiences for the discerning explorer.",
              url: "https://skybound.travel",
              telephone: "+1-800-SKY-BOUND",
              address: {
                "@type": "PostalAddress",
                streetAddress: "350 Fifth Avenue",
                addressLocality: "New York",
                addressRegion: "NY",
                postalCode: "10118",
                addressCountry: "US",
              },
              priceRange: "$$$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "12847",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased bg-[#020617] text-white">
        {children}
      </body>
    </html>
  );
}
