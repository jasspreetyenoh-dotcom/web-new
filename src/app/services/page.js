"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BlurText from "@/components/BlurText";
import HighlightText from "@/components/HighlightText";
import ServiceExplorer from "@/components/ServiceExplorer";
import IntroLoader from "@/components/IntroLoader";
import CreativeEngineShowcase from "@/components/CreativeEngineShowcase";

export default function ServicesPage() {
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  return (
    <>
      <IntroLoader
        onComplete={() => setIsIntroFinished(true)}
        pageName="YENOH"
        quote="We build brands that grow."
        iconType="logo"
        accentColor="var(--yellow)"
      />
      <div
        style={{
          opacity: isIntroFinished ? 1 : 0,
          transition: "opacity 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
          pointerEvents: isIntroFinished ? "auto" : "none"
        }}
      >
        <main style={{ minHeight: "100vh", background: "transparent", color: "var(--ink)", paddingBottom: "100px" }}>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          .services-hero { padding: 120px 20px 60px !important; min-height: auto !important; }
          .services-why-section { padding: 80px 20px !important; }
          .services-why-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .services-why-card { padding: 32px !important; }
          .services-why-h2 { font-size: 32px !important; margin-bottom: 48px !important; }
          .services-cta-section { padding: 80px 20px !important; margin: 0 12px 32px !important; border-radius: 20px !important; }
          .services-cta-buttons { flex-direction: column !important; align-items: stretch !important; gap: 16px !important; }
          .services-cta-buttons a { text-align: center !important; font-size: 17px !important; padding: 16px 24px !important; }
          .services-industries { padding: 60px 0 !important; }
        }
        @media (max-width: 480px) {
          .services-hero { padding: 96px 16px 48px !important; }
          .services-why-card { padding: 24px !important; }
          .services-why-card h3 { font-size: 22px !important; }
          .services-why-card p { font-size: 16px !important; }
        }
      `}</style>

      {/* 1. HERO */}
      <section className="services-hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "160px 40px 80px", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <h1 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(40px, 8vw, 100px)", lineHeight: 1, textTransform: "uppercase", marginBottom: "60px", maxWidth: "1000px" }}>
          <BlurText text="Everything your brand needs." delay={100} animateBy="words" direction="bottom" />
          <br />
          <HighlightText delay={0.8}>All in one place.</HighlightText>
        </h1>
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
          <div style={{ width: "6px", height: "80px", background: "var(--yellow)", flexShrink: 0, marginTop: "4px", borderRadius: "3px" }} />
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}
            style={{ fontSize: "clamp(18px, 2.5vw, 28px)", color: "var(--ink-70)", maxWidth: "600px", lineHeight: 1.4 }}
          >
            We create complete digital experiences that deliver real business impact.
          </motion.p>
        </div>
      </section>

      {/* 2. INTERACTIVE SERVICE EXPLORER */}
      <ServiceExplorer />

      {/* 3. INDUSTRIES WE WORK WITH (Marquee) */}
      <section className="services-industries" style={{ padding: "120px 0", borderTop: "2px solid rgba(0,0,0,0.1)", overflow: "hidden" }}>
        <h2 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(18px, 2vw, 24px)", textTransform: "uppercase", marginBottom: "60px", textAlign: "center", color: "var(--ink-45)" }}>
          Industries We Work With
        </h2>
        <div style={{ width: "100%", overflow: "hidden", position: "relative", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>
          {/* Gradient Masks */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100px", background: "linear-gradient(to right, var(--paper), transparent)", zIndex: 10 }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "100px", background: "linear-gradient(to left, var(--paper), transparent)", zIndex: 10 }} />
          
          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            style={{ display: "inline-block" }}
          >
            <div style={{ display: "inline-flex", gap: "80px", alignItems: "center", paddingRight: "80px", fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(40px, 8vw, 120px)", textTransform: "uppercase", color: "var(--ink)", WebkitTextStroke: "2px var(--ink)", WebkitTextFillColor: "transparent", opacity: 0.8 }}>
              {[
                "Education", "Restaurants", "Immigration", "Politics", "Software", "Media", "Professional Services", "Retail", "Hospitality",
                "Education", "Restaurants", "Immigration", "Politics", "Software", "Media", "Professional Services", "Retail", "Hospitality"
              ].map((ind, i) => (
                <span key={i} style={{ position: "relative" }}>
                  {ind}
                  <span style={{ color: "var(--yellow)", WebkitTextFillColor: "var(--yellow)", WebkitTextStroke: "none", fontSize: "40px", verticalAlign: "middle", marginLeft: "80px" }}>✦</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. WHY CLIENTS CHOOSE YENOH - CREATIVE ENGINE WORKSTATION */}
      <CreativeEngineShowcase />

      {/* 6. LET'S BUILD SOMETHING */}
      <section className="services-cta-section" style={{ padding: "160px 40px", background: "var(--yellow)", color: "var(--ink)", textAlign: "center", borderRadius: "32px", margin: "0 20px 40px" }}>
        <h2 style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(36px, 8vw, 100px)", textTransform: "uppercase", lineHeight: 1, marginBottom: "60px", maxWidth: "1000px", margin: "0 auto 60px" }}>
          Ready to build something people remember?
        </h2>
        <div className="services-cta-buttons" style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          <Link href="/portfolio" className="btn btn-white">
            View Portfolio
          </Link>
          <Link href="/contact" className="btn">
            Let's Talk
            <svg viewBox="0 0 40 20" style={{ width: 32, height: 16, marginLeft: 4 }}>
              <path d="M2 10 C 14 10, 26 10, 34 10" stroke="#1D1D1D" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M28 5 L36 10 L28 15" stroke="#1D1D1D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </Link>
        </div>
      </section>

    </main>
      </div>
    </>
  );
}

