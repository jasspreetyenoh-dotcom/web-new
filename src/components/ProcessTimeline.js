"use client";
import { VscCompass, VscMap, VscEdit, VscRocket, VscGraphLine } from "react-icons/vsc";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import HighlightText from "./HighlightText";
import ScrollCrayonLine from "./ScrollCrayonLine";

const steps = [
  {
    num: "01",
    name: "Discover",
    icon: <VscCompass />,
    desc: "Uncovering your market positioning and audience intent.",
    detail: "We begin by diving deep into your brand's DNA, conducting thorough competitive research, and identifying exact audience pain points to build a data-driven project roadmap.",
    deliverables: ["Stakeholder Workshops", "Competitor Audit", "Target Persona Mapping"]
  },
  {
    num: "02",
    name: "Strategy",
    icon: <VscMap />,
    desc: "Structuring narrative funnels and positioning layouts.",
    detail: "The Strategy phase maps out user journeys, site maps, and copywriting blueprints, developing high-converting marketing frameworks and corporate brand guidelines.",
    deliverables: ["User Funnel Architecture", "Site Maps & Wireframes", "Brand Messaging Guide"]
  },
  {
    num: "03",
    name: "Create",
    icon: <VscEdit />,
    desc: "Polishing graphics, writing copy, and crafting performance code.",
    detail: "We move into production: designing custom mockups, refining layouts, animating micro-interactions, and coding fast responsive frontends with pixel-perfect fidelity.",
    deliverables: ["UI/UX Design Mockups", "High-Converting Copy", "Next.js Frontend Code"]
  },
  {
    num: "04",
    name: "Launch",
    icon: <VscRocket />,
    desc: "Publishing channels, setting analytics, and verifying systems.",
    detail: "Launch involves publishing web platforms, configuring servers, setting up Google Tag trackers, checking page speeds, and running QA checks on lead funnels.",
    deliverables: ["Production Server Deploy", "Analytics & Tag Manager", "Speed & QA Audits"]
  },
  {
    num: "05",
    name: "Scale",
    icon: <VscGraphLine />,
    desc: "Refining ad metrics, expanding assets, and scaling reach.",
    detail: "Once live, we Scale impact: managing targeted Meta and Google ad budgets, running creative variation tests, and tracking organic search traffic for compounding growth.",
    deliverables: ["Paid Campaign Management", "Creative A/B Testing", "SEO & Growth Tracking"]
  },
];

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(2); // Default to Step 03 "Create"
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "center 0.4"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const trackWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      className="process"
      id="process"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "100px 0",
        background: "var(--paper)",
        overflow: "hidden"
      }}
    >
      {/* Subtle Grid Pattern Overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(var(--ink-10) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        opacity: 0.4,
        pointerEvents: "none"
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "50px" }}
        >
          <span className="section-tag" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--ink)",
            color: "var(--yellow)",
            padding: "6px 16px",
            borderRadius: "100px",
            fontFamily: "var(--font-headings)",
            fontWeight: 900,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            boxShadow: "2px 3px 0 var(--ink)"
          }}>
            How We Move
          </span>
          
          <h2 className="section-title" style={{ marginTop: "16px", fontFamily: "var(--font-headings)", fontWeight: 900, fontSize: "clamp(36px, 6vw, 68px)", textTransform: "uppercase", lineHeight: 1 }}>
            OUR <HighlightText delay={0.3}>PROCESS</HighlightText>
          </h2>
          
          <p style={{ marginTop: "14px", color: "var(--ink-70)", fontSize: "16px", fontFamily: "var(--font-body)", maxWidth: "600px" }}>
            A structured, repeatable roadmap built to guide every project from spark to scale.
          </p>
        </motion.div>

        {/* Crayon Squiggle Separator */}
        <div style={{ margin: "20px 0 44px", opacity: 0.3 }}>
          <ScrollCrayonLine
            path="M0 15 Q 300 0, 600 20 T 1200 10"
            viewBox="0 0 1200 30"
            width="100%"
            height="30px"
            stroke="var(--ink)"
            strokeWidth={3}
            delay={0.2}
          />
        </div>

        {/* ── 5 STEP CARDS GRID ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}>
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={idx}
                onClick={() => setActiveStep(idx)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                style={{
                  position: "relative",
                  background: isActive ? "#FFFFFF" : "var(--paper)",
                  borderRadius: "20px",
                  border: isActive ? "3px solid var(--ink)" : "2.5px solid var(--ink)",
                  boxShadow: isActive ? "6px 8px 0 var(--yellow)" : "4px 6px 0 var(--ink)",
                  padding: "24px 20px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                {/* Step Pill Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div style={{
                    padding: "4px 10px",
                    background: isActive ? "var(--yellow)" : "var(--ink)",
                    color: isActive ? "var(--ink)" : "#FFFFFF",
                    borderRadius: "100px",
                    fontFamily: "var(--font-headings)",
                    fontWeight: 900,
                    fontSize: "12px",
                    letterSpacing: "0.06em",
                    border: "1.5px solid var(--ink)"
                  }}>
                    {step.num}
                  </div>
                  <span style={{ fontSize: "24px" }}>{step.icon}</span>
                </div>

                {/* Step Title */}
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-headings)",
                    fontWeight: 900,
                    fontSize: "22px",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                    marginBottom: "8px",
                    lineHeight: 1.1
                  }}>
                    {step.name}
                  </h3>
                  
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "var(--ink-70)",
                    lineHeight: 1.4,
                    margin: 0
                  }}>
                    {step.desc}
                  </p>
                </div>

                {/* Active Indicator Bar at bottom of card */}
                <div style={{
                  height: "4px",
                  width: "100%",
                  background: isActive ? "var(--yellow)" : "transparent",
                  borderRadius: "100px",
                  marginTop: "18px",
                  transition: "background 0.25s ease"
                }} />
              </motion.div>
            );
          })}
        </div>

        {/* ── ACTIVE STEP DEEP DIVE SHOWCASE ── */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
            borderRadius: "28px",
            border: "3px solid var(--ink)",
            boxShadow: "8px 10px 0 var(--yellow)",
            padding: "36px 32px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px",
            alignItems: "center",
            position: "relative",
            overflow: "hidden"
          }}
          className="process-detail-card"
        >
          {/* Left: Deep-Dive Description */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{
                background: "var(--yellow)",
                color: "var(--ink)",
                padding: "4px 12px",
                borderRadius: "100px",
                fontFamily: "var(--font-headings)",
                fontWeight: 900,
                fontSize: "12px",
                textTransform: "uppercase"
              }}>
                Phase {steps[activeStep].num} Breakdown
              </span>
              <span style={{ fontSize: "20px" }}>{steps[activeStep].icon}</span>
            </div>

            <h3 style={{
              fontFamily: "var(--font-headings)",
              fontWeight: 900,
              fontSize: "clamp(24px, 3.5vw, 36px)",
              textTransform: "uppercase",
              color: "#FFFFFF",
              marginBottom: "12px",
              lineHeight: 1.1
            }}>
              {steps[activeStep].name} Stage
            </h3>

            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "rgba(255, 255, 255, 0.85)",
              lineHeight: 1.6,
              margin: 0
            }}>
              {steps[activeStep].detail}
            </p>
          </div>

          {/* Right: Key Phase Deliverables Pills */}
          <div style={{
            background: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(8px)",
            borderRadius: "20px",
            padding: "24px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            display: "flex",
            flexDirection: "column",
            gap: "14px"
          }}>
            <div style={{
              fontFamily: "var(--font-headings)",
              fontWeight: 900,
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--yellow)"
            }}>
              Key Deliverables & Execution
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {steps[activeStep].deliverables.map((del, dIdx) => (
                <div key={dIdx} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "14px",
                  fontFamily: "var(--font-headings)",
                  fontWeight: 700,
                  color: "#FFFFFF"
                }}>
                  <div style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "var(--yellow)",
                    color: "var(--ink)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 900
                  }}>
                    ✓
                  </div>
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── SCROLL-DRIVEN WAVY ROADMAP LINE ── */}
        <div style={{ marginTop: "48px", position: "relative", height: "50px" }}>
          <svg viewBox="0 0 1200 50" width="100%" height="50px" fill="none" preserveAspectRatio="none">
            {/* Guide track */}
            <path
              d="M 0,25 Q 300 0, 600 25 T 1200 25"
              stroke="var(--ink-10)"
              strokeWidth="3"
              strokeDasharray="6 8"
              strokeLinecap="round"
            />
            {/* Scroll-driven yellow fill */}
            <motion.path
              d="M 0,25 Q 300 0, 600 25 T 1200 25"
              stroke="var(--yellow)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength: smoothProgress }}
            />
          </svg>
        </div>

      </div>
    </section>
  );
}

