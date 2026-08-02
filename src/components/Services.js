"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import StickerPeel from "./StickerPeel";
import HighlightText from "./HighlightText";
import ScrollCrayonLine from "./ScrollCrayonLine";

export default function Services() {
  const stickerServices = [
    { num: "01", name: "Websites", desc: "Fast-loading, custom-coded web architectures designed to engage prospects and convert high-intent actions." },
    { num: "02", name: "Branding", desc: "Premium corporate guidelines, custom logo typography, and distinct voice frameworks built for scaling teams." },
    { num: "03", name: "Social Media", desc: "High-engagement content layout, algorithm strategy, and organic social funnels focused on brand awareness." },
    { num: "04", name: "Performance Ads", desc: "Targeted marketing funnels engineered to capture qualified leads while lowering average client acquisition costs." },
    { num: "05", name: "Video Production", desc: "ROI-focused short-form scripting, dynamic editing, and commercial product videography tailored for digital ads." },
    { num: "06", name: "SEO Optimization", desc: "Technical optimization, backlink expansion, and localized search rank mapping to drive zero-cost monthly traffic." },
  ];

  const gridServices = [
    { num: "07", name: "Google Ads", desc: "Strategic search dominance, conversion tag monitoring, and ad copy execution aimed at capturing high search intent." },
    { num: "08", name: "Meta Ads", desc: "Structured media buying models, lookalike optimization, and creative variations testing frameworks for scale." },
    { num: "09", name: "Public Relations", desc: "Narrative strategy, national news placements, and high-impact media relation models to cement public authority." },
  ];

  const [showMore, setShowMore] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const boardRef = useRef(null);

  // Responsive positions for stickers
  const [positions, setPositions] = useState([
    { x: 50, y: 40 },
    { x: 330, y: 60 },
    { x: 620, y: 30 },
    { x: 120, y: 300 },
    { x: 420, y: 320 },
    { x: 740, y: 280 }
  ]);

  useEffect(() => {
    const updatePositions = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        // 4 stickers staggered inside the 480px vertical mobile board
        setPositions([
          { x: 10, y: 30 },
          { x: 130, y: 185 },
          { x: 165, y: 40 },
          { x: 10, y: 285 }
        ]);
      } else {
        setPositions([
          { x: 50, y: 40 },
          { x: 330, y: 60 },
          { x: 620, y: 30 },
          { x: 120, y: 300 },
          { x: 420, y: 320 },
          { x: 740, y: 280 }
        ]);
      }
    };
    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  return (
    <section className="services" id="services" style={{ position: "relative", overflow: "hidden" }}>
      {/* Decorative top crayon arc */}
      <div style={{ position: "absolute", top: "0", left: 0, right: 0, opacity: 0.07, pointerEvents: "none" }}>
        <ScrollCrayonLine
          path="M0 35 C 300 5, 700 50, 1200 15"
          viewBox="0 0 1200 55"
          width="100%"
          height="55px"
          stroke="var(--yellow)"
          strokeWidth={5}
          delay={0.1}
        />
      </div>

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">
            <svg viewBox="0 0 40 20" style={{ width: "20px", height: "10px", fill: "none", stroke: "var(--ink)", strokeWidth: 3 }}>
              <path d="M2 10 H 38" />
            </svg>
            Our Expertise
          </span>
          <h2 className="section-title">
            What{" "}<HighlightText delay={0.3}>We Do</HighlightText>
          </h2>
          <p style={{ marginTop: "12px", color: "var(--ink-70)", fontSize: "15px" }}>
            Hover to peel the corners of our core stickers. Click and drag them anywhere inside the board!
          </p>
        </motion.div>

        {/* DRAGGABLE STICKERS BOARD */}
        <div
          ref={boardRef}
          className="sticker-board"
          style={{
            position: "relative",
            width: "100%",
            border: "2px dashed var(--ink)",
            borderRadius: "24px",
            backgroundColor: "rgba(30, 30, 30, 0.01)",
            overflow: "hidden",
            marginBottom: "40px",
            boxShadow: "inset 0 4px 20px rgba(30, 30, 30, 0.02)",
          }}
        >
          {/* Dot grid background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(var(--ink-10) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />
          {/* Board corner scribbles */}
          <div style={{ position: "absolute", bottom: "16px", right: "20px", opacity: 0.1, pointerEvents: "none" }}>
            <ScrollCrayonLine
              path="M5 30 C 40 5, 80 40, 120 20"
              viewBox="0 0 125 45"
              width="125px"
              height="45px"
              stroke="var(--ink)"
              strokeWidth={3}
              delay={0.6}
            />
          </div>

          {(isMobile ? stickerServices.slice(0, 4) : stickerServices).map((service, idx) => (
            <StickerPeel
              key={idx}
              num={service.num}
              name={service.name}
              desc={service.desc}
              initialPosition={positions[idx] || { x: 0, y: 0 }}
              constraintsRef={boardRef}
            />
          ))}
        </div>

        {/* VIEW MORE BUTTON */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
          <Link
            href="/services"
            className="btn"
            style={{ transform: "rotate(-1deg)", textDecoration: "none" }}
          >
            View More Services →
          </Link>
        </div>

        {/* ADDITIONAL SERVICES GRID */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              style={{ overflow: "hidden", width: "100%" }}
            >
              <div
                className="services-grid"
                style={{
                  paddingTop: "24px",
                  borderTop: "1px solid var(--line-color)",
                }}
              >
                {gridServices.map((service, idx) => (
                  <motion.div
                    className="service-card"
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <span className="service-card-num">{service.num}</span>
                    <h3>
                      {service.name}
                      <svg className="card-underline" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <motion.path
                          d="M5 8 C 30 2, 70 9, 95 6"
                          initial={{ pathLength: 0 }}
                          animate={hoveredIdx === idx ? { pathLength: 1 } : { pathLength: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                        />
                      </svg>
                    </h3>
                    <p>{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
