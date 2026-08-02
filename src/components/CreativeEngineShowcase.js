"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HighlightText from "@/components/HighlightText";

export default function CreativeEngineShowcase() {
  const primaryUsp = {
    num: "01",
    badge: "PRIMARY USP",
    title: "Creative Content Creation",
    desc: "We engineer scroll-stopping reels, viral brand aesthetics, high-converting ad visuals, and storytelling that command attention in crowded feeds.",
    tag: "Reels • Brand Aesthetics • Campaign Visuals",
  };

  const pillars = [
    {
      num: "02",
      badge: "QUALITY",
      title: "Uncompromising Quality",
      desc: "Pixel-perfect graphics, cinematic video color grading, and broadcast-grade production that elevate your brand far above generic templates.",
      tag: "4K Master & Cinematic Polish",
    },
    {
      num: "03",
      badge: "STRATEGY & ROI",
      title: "Strategy-First Growth",
      desc: "Every script, visual hook, and ad design is grounded in commercial positioning and structured funnels built to convert attention into pipeline revenue.",
      tag: "Data + Creative Fusion",
    },
    {
      num: "04",
      badge: "FULL-STACK",
      title: "All-In-One Agile Studio",
      desc: "Strategy, copy, video production, graphic design, and web development seamlessly executed under one roof with fast weekly sprints.",
      tag: "Zero Agency Friction",
    },
  ];

  return (
    <section className="services-why-section" style={{ padding: "100px 40px", maxWidth: "1140px", margin: "0 auto" }}>
      <style>{`
        @media (max-width: 768px) {
          .services-why-section { padding: 48px 16px !important; }
          .services-why-section h2 { font-size: 26px !important; line-height: 1.2 !important; margin-bottom: 10px !important; }
          .services-why-section p { font-size: 14.5px !important; line-height: 1.5 !important; }
          .primary-usp-card { padding: 24px 18px !important; border-radius: 18px !important; margin-bottom: 16px !important; }
          .primary-usp-card h3 { font-size: 20px !important; line-height: 1.2 !important; margin-bottom: 10px !important; }
          .primary-usp-card p { font-size: 14px !important; line-height: 1.55 !important; margin-bottom: 16px !important; }
          .pillars-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .pillar-card { padding: 22px 18px !important; border-radius: 18px !important; }
          .pillar-card h3 { font-size: 18px !important; line-height: 1.2 !important; margin-bottom: 8px !important; }
          .pillar-card p { font-size: 13.5px !important; line-height: 1.5 !important; margin-bottom: 16px !important; }
          .engine-cta-bar { margin-top: 36px !important; flex-direction: column !important; gap: 12px !important; text-align: center !important; }
          .engine-cta-bar span { font-size: 14px !important; }
          .engine-cta-bar a { width: 100% !important; text-align: center !important; padding: 12px 20px !important; font-size: 14px !important; box-sizing: border-box !important; }
        }
      `}</style>

      {/* Clean Minimal Header */}
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
        <div
          style={{
            display: "inline-block",
            color: "var(--ink-45)",
            fontFamily: "var(--font-headings)",
            fontWeight: 800,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "2.5px",
            marginBottom: "14px",
          }}
        >
          ✦ THE YENOH STANDARD
        </div>
        <h2
          style={{
            fontFamily: "var(--font-headings)",
            fontWeight: 900,
            fontSize: "clamp(32px, 4vw, 50px)",
            textTransform: "uppercase",
            lineHeight: 1.15,
            marginBottom: "14px",
            color: "var(--ink)",
          }}
        >
          Why Brands Choose <HighlightText delay={0.2}>YENOH</HighlightText>
        </h2>
        <p
          style={{
            fontSize: "clamp(16px, 1.4vw, 18px)",
            color: "var(--ink-70)",
            maxWidth: "580px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          High-impact creative content creation backed by cinematic quality and commercial strategy.
        </p>
      </div>

      {/* 1. Featured Primary USP Card (Full Width Spotlight) */}
      <motion.div
        className="primary-usp-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          background: "#FFFBEB",
          padding: "44px 40px",
          borderRadius: "24px",
          border: "2px solid var(--yellow)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
          marginBottom: "24px",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 16px 36px rgba(0, 0, 0, 0.08)";
          e.currentTarget.style.borderColor = "var(--ink)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.03)";
          e.currentTarget.style.borderColor = "var(--yellow)";
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <span style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "14px", color: "var(--ink)", letterSpacing: "1px" }}>
            {primaryUsp.num}
          </span>
          <span
            style={{
              background: "var(--yellow)",
              color: "var(--ink)",
              padding: "4px 14px",
              borderRadius: "100px",
              fontFamily: "var(--font-headings)",
              fontWeight: 800,
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {primaryUsp.badge}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-headings)",
            fontWeight: 900,
            fontSize: "clamp(26px, 3.5vw, 36px)",
            textTransform: "uppercase",
            marginBottom: "12px",
            color: "var(--ink)",
            lineHeight: 1.15,
          }}
        >
          {primaryUsp.title}
        </h3>

        <p style={{ fontSize: "17px", color: "var(--ink-70)", lineHeight: 1.65, marginBottom: "24px", maxWidth: "780px" }}>
          {primaryUsp.desc}
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12.5px",
            fontFamily: "var(--font-headings)",
            fontWeight: 800,
            color: "var(--ink)",
            background: "var(--yellow)",
            padding: "6px 16px",
            borderRadius: "8px",
            border: "1px solid var(--ink-10)",
          }}
        >
          <span style={{ color: "#D97706" }}>✦</span>
          <span>{primaryUsp.tag}</span>
        </div>
      </motion.div>

      {/* 2. Three Column Clean Minimal Cards Grid */}
      <div
        className="pillars-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {pillars.map((item, idx) => (
          <motion.div
            className="pillar-card"
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            style={{
              background: "#FFFFFF",
              padding: "36px 32px",
              borderRadius: "24px",
              border: "1.5px solid var(--line-color)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "flex",
              flexDirection: "column",
              justify: "space-between",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 16px 36px rgba(0, 0, 0, 0.08)";
              e.currentTarget.style.borderColor = "var(--ink)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.03)";
              e.currentTarget.style.borderColor = "var(--line-color)";
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "14px", color: "var(--ink-45)", letterSpacing: "1px" }}>
                  {item.num}
                </span>
                <span
                  style={{
                    background: "var(--ink-10)",
                    color: "var(--ink)",
                    padding: "4px 12px",
                    borderRadius: "100px",
                    fontFamily: "var(--font-headings)",
                    fontWeight: 800,
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {item.badge}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-headings)",
                  fontWeight: 900,
                  fontSize: "21px",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  color: "var(--ink)",
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </h3>

              <p style={{ fontSize: "15px", color: "var(--ink-70)", lineHeight: 1.6, marginBottom: "24px" }}>
                {item.desc}
              </p>
            </div>

            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontFamily: "var(--font-headings)",
                  fontWeight: 800,
                  color: "var(--ink)",
                  background: "var(--paper)",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1px solid var(--ink-10)",
                }}
              >
                <span style={{ color: "#D97706" }}>✦</span>
                <span>{item.tag}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Clean Minimal CTA Bar */}
      <div
        className="engine-cta-bar"
        style={{
          marginTop: "52px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "15px", color: "var(--ink-70)", fontWeight: 600 }}>
          Ready to elevate your brand content & market positioning?
        </span>
        <Link href="/contact" className="btn-sm" style={{ padding: "10px 24px", fontSize: "13.5px" }}>
          Start a Project →
        </Link>
      </div>
    </section>
  );
}
